"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { brandApi, type BrandProduct } from "@/lib/backend-api";
import { Icons } from "@/lib/icons";

type Step = 1 | 2 | 3;

interface ProductConfig {
  productId: string;
  ratingsRequired: string;
  reviewsRequired: string;
  cashback: string;
  currency: string;
}

export function CreateCampaignWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [products, setProducts] = useState<BrandProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [campaignName, setCampaignName] = useState("");
  const [productConfigs, setProductConfigs] = useState<ProductConfig[]>([
    { productId: "", ratingsRequired: "", reviewsRequired: "", cashback: "", currency: "INR" },
  ]);
  const [budgetByCurrency, setBudgetByCurrency] = useState<Record<string, number>>({});
  const [primaryCurrency, setPrimaryCurrency] = useState("INR");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<{ balance: number; locked: number; available: number; currency: string } | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const response = await brandApi.getProducts();
        setProducts(response.products);
      } catch (err: any) {
        setError(err.message || "Failed to load products. Add a product first.");
      } finally {
        setIsLoadingProducts(false);
      }
    };

    const loadWallet = async () => {
      try {
        const stats = await brandApi.getStats();
        setWalletBalance({
          balance: parseFloat(stats.stats.wallet_balance || "0"),
          locked: parseFloat(stats.stats.locked_balance || "0"),
          available: parseFloat(stats.stats.available_balance || "0"),
          currency: stats.stats.currency || "INR",
        });
      } catch (err: any) {
        // Error is already handled by setError, only log in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Failed to load wallet balance:", err);
        }
      }
    };

    loadProducts();
    loadWallet();
  }, []);

  useEffect(() => {
    // Calculate budget by currency
    const budget: Record<string, number> = {};
    let firstCurrency = "INR";
    
    productConfigs.forEach((config) => {
      if (config.reviewsRequired && config.cashback && config.currency) {
        const currency = config.currency;
        if (!budget[currency]) {
          budget[currency] = 0;
        }
        budget[currency] += parseInt(config.reviewsRequired, 10) * parseFloat(config.cashback);
        
        if (!firstCurrency || firstCurrency === "INR") {
          firstCurrency = currency;
        }
      }
    });
    
    setBudgetByCurrency(budget);
    setPrimaryCurrency(firstCurrency);
  }, [productConfigs]);

  const handleAddProduct = () => {
    setProductConfigs([
      ...productConfigs,
      { productId: "", ratingsRequired: "", reviewsRequired: "", cashback: "", currency: primaryCurrency },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    if (productConfigs.length > 1) {
      setProductConfigs(productConfigs.filter((_, i) => i !== index));
    }
  };

  const handleProductConfigChange = (index: number, field: keyof ProductConfig, value: string) => {
    const updated = [...productConfigs];
    
    // Update currency based on selected product
    if (field === 'productId' && value) {
      const product = products.find((p) => String(p.id) === value);
      if (product) {
        updated[index] = { ...updated[index], [field]: value, currency: product.currency || "INR" };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    
    setProductConfigs(updated);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!campaignName.trim()) {
        setError("Please enter a campaign name");
        return;
      }
      setError(null);
      setStep(2);
    } else if (step === 2) {
      // Validate product configs
      const hasInvalid = productConfigs.some(
        (config) =>
          !config.productId ||
          !config.ratingsRequired ||
          !config.reviewsRequired ||
          !config.cashback ||
          parseInt(config.ratingsRequired, 10) <= 0 ||
          parseInt(config.reviewsRequired, 10) <= 0 ||
          parseFloat(config.cashback) <= 0
      );
      if (hasInvalid) {
        setError("Please fill all fields for all products");
        return;
      }
      setError(null);
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    // Validate all product configs
    const hasInvalid = productConfigs.some(
      (config) =>
        !config.productId ||
        !config.ratingsRequired ||
        !config.reviewsRequired ||
        !config.cashback ||
        parseInt(config.ratingsRequired, 10) <= 0 ||
        parseInt(config.reviewsRequired, 10) <= 0 ||
        parseFloat(config.cashback) <= 0
    );

    if (hasInvalid) {
      setError("Please fill all fields for all products");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    // Validate all products use the same currency
    const currencies = productConfigs
      .filter(config => config.productId)
      .map(config => {
        const product = products.find((p) => String(p.id) === config.productId);
        return product?.currency || config.currency || "INR";
      });
    
    const uniqueCurrencies = [...new Set(currencies)];
    if (uniqueCurrencies.length > 1) {
      setError(`All products must use the same currency. Found: ${uniqueCurrencies.join(", ")}`);
      setIsSubmitting(false);
      return;
    }

    const campaignCurrency = uniqueCurrencies[0] || primaryCurrency;
    const totalBudget = Object.values(budgetByCurrency).reduce((sum, val) => sum + val, 0);
    const totalBudgetStr = totalBudget.toFixed(2);

    // Validate wallet balance
    if (walletBalance) {
      if (campaignCurrency !== walletBalance.currency) {
        setError(`Campaign currency (${campaignCurrency}) does not match wallet currency (${walletBalance.currency})`);
        setIsSubmitting(false);
        return;
      }
      
      if (totalBudget > walletBalance.available) {
        setError(`Insufficient wallet balance. Required: ${campaignCurrency} ${totalBudgetStr}, Available: ${campaignCurrency} ${walletBalance.available.toFixed(2)}`);
        setIsSubmitting(false);
        return;
      }
    }

    try {
      // Create campaign
      const campaignResponse = await brandApi.createCampaign({
        name: campaignName,
        total_budget: totalBudgetStr,
        currency: campaignCurrency,
      });

      const campaignId = campaignResponse.campaign.id;

      // Create review slots for each product and link them to the campaign
      const createdSlots: number[] = [];
      try {
        for (const config of productConfigs) {
          const product = products.find((p) => String(p.id) === config.productId);
          if (product) {
            const slotResponse = await brandApi.createReviewSlot({
              product: parseInt(config.productId, 10),
              campaign: campaignId,
              cashback_amount: config.cashback,
              currency: product.currency || config.currency || campaignCurrency,
              total_slots: parseInt(config.reviewsRequired, 10),
              min_review_rating: parseInt(config.ratingsRequired, 10),
              review_deadline_days: 7,
            });
            // Track created slots for rollback if needed
            if (slotResponse && typeof slotResponse === 'object' && 'campaign' in slotResponse && slotResponse.campaign && typeof slotResponse.campaign === 'object' && 'id' in slotResponse.campaign) {
              createdSlots.push((slotResponse.campaign as { id: number }).id);
            }
          }
        }
      } catch (slotError: any) {
        // If slot creation fails, delete the campaign to maintain consistency
        try {
          await brandApi.deleteCampaign(campaignId);
          setError(`Failed to create review slots: ${slotError.message}. Campaign creation was rolled back. Please try again.`);
        } catch (deleteError: any) {
          // If deletion also fails, inform user to manually delete
          setError(`Campaign created but failed to create review slots: ${slotError.message}. Please delete the campaign manually and try again.`);
        }
        setIsSubmitting(false);
        return;
      }

      setSuccess("Campaign created successfully!");
      setTimeout(() => {
        router.push(`/brand/campaigns/${campaignId}`);
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to create campaign.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold transition ${
                    step >= stepNum
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-400"
                  }`}
                >
                  {stepNum}
                </div>
                <p
                  className={`mt-2 text-xs font-semibold ${
                    step >= stepNum ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {stepNum === 1 ? "Campaign Name" : stepNum === 2 ? "Add Products" : "Budget"}
                </p>
              </div>
              {stepNum < 3 && (
                <div
                  className={`mx-2 h-1 flex-1 rounded ${
                    step > stepNum ? "bg-blue-600" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        {error && (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Step 1: Campaign Name</h2>
              <p className="mt-2 text-slate-600">
                Give your campaign a name to easily identify it later.
              </p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Campaign Name
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Summer Product Launch Campaign"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={!campaignName.trim()}
                className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Step 2: Add Products</h2>
              <p className="mt-2 text-slate-600">
                Add products to your campaign. For each product, specify the number of ratings and reviews required.
                Remember, one campaign can have multiple products and each product will have slots.
              </p>
            </div>

            {isLoadingProducts ? (
              <div className="flex items-center justify-center py-8">
                <Icons.Spinner className="h-6 w-6 text-blue-600" />
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
                No products found.{" "}
                <a href="/brand/products" className="text-indigo-600 underline">
                  Add a product first
                </a>
                .
              </div>
            ) : (
              <div className="space-y-4">
                {productConfigs.map((config, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">Product {index + 1}</h3>
                      {productConfigs.length > 1 && (
                        <button
                          onClick={() => handleRemoveProduct(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Icons.Trash className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Product Link
                        </label>
                        <select
                          value={config.productId}
                          onChange={(e) =>
                            handleProductConfigChange(index, "productId", e.target.value)
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="">Select product</option>
                          {products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name} • {product.review_platform}
                            </option>
                          ))}
                        </select>
                        {config.productId && (
                          <a
                            href={products.find((p) => String(p.id) === config.productId)?.product_url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-flex text-sm text-indigo-600 underline"
                          >
                            View product link
                          </a>
                        )}
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Number of Ratings Required
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={config.ratingsRequired}
                            onChange={(e) =>
                              handleProductConfigChange(index, "ratingsRequired", e.target.value)
                            }
                            placeholder="5"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Number of Reviews Required
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={config.reviewsRequired}
                            onChange={(e) =>
                              handleProductConfigChange(index, "reviewsRequired", e.target.value)
                            }
                            placeholder="10"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Cashback per Review ({config.currency || primaryCurrency})
                          </label>
                          <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={config.cashback}
                            onChange={(e) =>
                              handleProductConfigChange(index, "cashback", e.target.value)
                            }
                            placeholder="100"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleAddProduct}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white px-4 py-3 text-slate-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                >
              <Icons.Plus className="h-4 w-4" />
                  Add Another Product
                </button>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Step 3: Budget Summary</h2>
              <p className="mt-2 text-slate-600">
                Review your campaign budget before creating it.
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-6">
              <h3 className="mb-4 font-semibold text-slate-900">Campaign Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Campaign Name</span>
                  <span className="font-semibold text-slate-900">{campaignName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Products</span>
                  <span className="font-semibold text-slate-900">{productConfigs.length}</span>
                </div>
                <div className="border-t border-blue-200 pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">Total Budget</span>
                    <span className="text-xl font-bold text-blue-700">
                      {primaryCurrency} {Object.values(budgetByCurrency).reduce((sum, val) => sum + val, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || Object.values(budgetByCurrency).reduce((sum, val) => sum + val, 0) <= 0}
                className="rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-200 transition hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Icons.Spinner className="h-4 w-4" />
                    Creating...
                  </span>
                ) : (
                  "Create Campaign"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
