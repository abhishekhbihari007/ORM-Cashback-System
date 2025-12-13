"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { brandApi, type Campaign } from "@/lib/backend-api";
import { FaPlus, FaSpinner, FaTriangleExclamation, FaMagnifyingGlass, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function MyCampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  const loadCampaigns = useCallback(async (page: number = 1, search: string = "", status: string = "") => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await brandApi.getCampaigns(page, pageSize, search, status);
      const campaignsList = response.results || response.campaigns || [];
      setCampaigns(campaignsList);
      setTotalCount(response.count || campaignsList.length);
      // Calculate total pages from count
      if (response.count) {
        setTotalPages(Math.ceil(response.count / pageSize));
      } else {
        setTotalPages(1);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load campaigns");
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    loadCampaigns(currentPage, searchQuery, statusFilter);
  }, [currentPage, loadCampaigns]);

  const handleSearch = () => {
    setCurrentPage(1);
    loadCampaigns(1, searchQuery, statusFilter);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
    loadCampaigns(1, searchQuery, status);
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

  const formatCurrency = (amount: string, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
    }).format(parseFloat(amount));
  };

  if (isLoading) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-10">
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-title">Campaigns</p>
            <h1 className="text-4xl font-bold text-slate-900">My Campaigns</h1>
            <p className="text-slate-600">
              Manage all your review campaigns in one place
            </p>
          </div>
          <button
            onClick={() => router.push('/brand/campaigns/create')}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <FaPlus className="h-4 w-4" />
            Create Campaign
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <FaMagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search campaigns..."
                className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button
              onClick={handleSearch}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Search
            </button>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
            className="rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaTriangleExclamation className="h-5 w-5" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => {
                  setError(null);
                  loadCampaigns(currentPage, searchQuery, statusFilter);
                }}
                className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {campaigns.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-lg font-semibold text-slate-900">No campaigns found</p>
            <p className="mt-2 text-slate-600">
              {searchQuery || statusFilter ? "Try adjusting your search or filters" : "Create your first campaign to start getting reviews"}
            </p>
            {!searchQuery && !statusFilter && (
              <button
                onClick={() => router.push('/brand/campaigns/create')}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
              >
                Create Campaign
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  onClick={() => router.push(`/brand/campaigns/${campaign.id}`)}
                  className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">{campaign.name}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">Budget</p>
                      <p className="text-lg font-semibold text-slate-900">
                        {formatCurrency(campaign.spent_budget, campaign.currency)} / {formatCurrency(campaign.total_budget, campaign.currency)}
                      </p>
                      <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-blue-600"
                          style={{ width: `${Math.min(100, campaign.progress_percentage)}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div>
                        <p className="text-xs text-slate-600">Products</p>
                        <p className="text-lg font-semibold text-slate-900">{campaign.total_products}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Orders</p>
                        <p className="text-lg font-semibold text-slate-900">{campaign.total_orders}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Reviews</p>
                        <p className="text-lg font-semibold text-slate-900">{campaign.total_reviews}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
                <div className="text-sm text-slate-600">
                  Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} campaigns
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50 hover:bg-slate-50"
                  >
                    <FaChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-slate-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50 hover:bg-slate-50"
                  >
                    <FaChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

