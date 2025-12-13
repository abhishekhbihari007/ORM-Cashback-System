"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { brandApi, type Campaign, type CampaignProduct } from "@/lib/backend-api";
import { Icons } from "@/lib/icons";

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = parseInt(params.id as string, 10);
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [products, setProducts] = useState<CampaignProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [campaignResponse, productsResponse] = await Promise.all([
        brandApi.getCampaign(campaignId),
        brandApi.getCampaignProducts(campaignId),
      ]);
      setCampaign(campaignResponse.campaign);
      setProducts(productsResponse.products);
    } catch (err: any) {
      setError(err.message || "Failed to load campaign");
    } finally {
      setIsLoading(false);
    }
  }, [campaignId]);

  useEffect(() => {
    if (campaignId) {
      loadData();
    }
  }, [campaignId, loadData]);

  const handleStatusUpdate = async (newStatus: Campaign['status']) => {
    if (!campaign) return;
    
    setIsUpdating(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await brandApi.updateCampaign(campaignId, { status: newStatus });
      setCampaign(response.campaign);
      setSuccess(`Campaign ${newStatus.toLowerCase()} successfully`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update campaign status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEdit = () => {
    if (campaign) {
      setEditName(campaign.name);
      setIsEditing(true);
    }
  };

  const handleSaveEdit = async () => {
    if (!campaign || !editName.trim()) return;
    
    setIsUpdating(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await brandApi.updateCampaign(campaignId, { name: editName.trim() });
      setCampaign(response.campaign);
      setIsEditing(false);
      setSuccess("Campaign name updated successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update campaign name");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatCurrency = (amount: string, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
    }).format(parseFloat(amount));
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-10">
          <div className="flex items-center justify-center py-20">
            <Icons.Spinner className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-10">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icons.AlertTriangle className="h-5 w-5" />
                <span>{error || "Campaign not found"}</span>
              </div>
              <button
                onClick={loadData}
                className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const availableBudget = parseFloat(campaign.available_budget);
  const isLowBudget = availableBudget < parseFloat(campaign.total_budget) * 0.1;

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <button
          onClick={() => router.push('/brand/campaigns')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
        >
        <Icons.ArrowLeft className="h-4 w-4" />
          Back to Campaigns
        </button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            {isEditing ? (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-2xl font-bold text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  autoFocus
                />
                <button
                  onClick={handleSaveEdit}
                  disabled={isUpdating || !editName.trim()}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUpdating ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditName("");
                  }}
                  disabled={isUpdating}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold text-slate-900">{campaign.name}</h1>
                <button
                  onClick={handleEdit}
                  className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                  title="Edit campaign name"
                >
                  <Icons.PenSquare className="h-4 w-4" />
                </button>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>
            )}
            <p className="mt-2 text-slate-600">
              Created on {new Date(campaign.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {campaign.status === 'ACTIVE' && (
              <button
                onClick={() => handleStatusUpdate('PAUSED')}
                disabled={isUpdating || isEditing}
                className="flex items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-800 transition hover:bg-yellow-100 disabled:opacity-50"
              >
                <Icons.Pause className="h-4 w-4" />
                {isUpdating ? 'Pausing...' : 'Pause Campaign'}
              </button>
            )}
            {campaign.status === 'PAUSED' && (
              <button
                onClick={() => handleStatusUpdate('ACTIVE')}
                disabled={isUpdating || isEditing}
                className="flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm font-semibold text-green-800 transition hover:bg-green-100 disabled:opacity-50"
              >
                <Icons.Play className="h-4 w-4" />
                {isUpdating ? 'Resuming...' : 'Resume Campaign'}
              </button>
            )}
          </div>
        </div>

        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
            {success}
          </div>
        )}

        {isLowBudget && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
            <div className="flex items-center gap-2">
              <Icons.AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">Low Budget Alert:</span>
              <span>You have a low budget to run this campaign. Consider adding more funds.</span>
            </div>
          </div>
        )}

        {/* Budget Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Budget Overview</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-slate-600">Total Budget</p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(campaign.total_budget, campaign.currency)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Spent</p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(campaign.spent_budget, campaign.currency)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Available</p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(campaign.available_budget, campaign.currency)}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-600">Progress</span>
              <span className="font-semibold text-slate-900">
                {campaign.progress_percentage.toFixed(1)}%
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-200">
              <div
                className="h-3 rounded-full bg-blue-600"
                style={{ width: `${Math.min(100, campaign.progress_percentage)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">Products</p>
            <p className="text-2xl font-bold text-slate-900">{campaign.total_products}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">Total Orders</p>
            <p className="text-2xl font-bold text-slate-900">{campaign.total_orders}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">Approved Orders</p>
            <p className="text-2xl font-bold text-green-600">{campaign.approved_orders}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">Reviews</p>
            <p className="text-2xl font-bold text-blue-600">{campaign.total_reviews}</p>
          </div>
        </div>

        {/* Products List */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Products</h2>
          {products.length === 0 ? (
            <p className="py-8 text-center text-slate-600">No products in this campaign yet</p>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => router.push(`/brand/campaigns/${campaignId}/products/${product.id}`)}
                  className="cursor-pointer rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{product.name}</h3>
                      <p className="mt-1 text-sm text-slate-600">{product.description}</p>
                    </div>
                    <div className="ml-4 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-slate-600">Orders</p>
                        <p className="text-lg font-semibold text-slate-900">{product.orders_count}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Approved</p>
                        <p className="text-lg font-semibold text-green-600">{product.approved_orders}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Reviews</p>
                        <p className="text-lg font-semibold text-blue-600">{product.reviews_count}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

