/**
 * Backend API Client
 * Handles all communication with the Django backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

// Types matching backend responses
export interface LoginResponse {
  status: string;
  message: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: 'USER' | 'BRAND' | 'ADMIN';
    is_staff?: boolean;
    is_superuser?: boolean;
  };
  tokens: {
    refresh: string;
    access: string;
  };
}

export interface RegisterResponse {
  status: string;
  message: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: 'USER' | 'BRAND' | 'ADMIN';
    is_staff?: boolean;
    is_superuser?: boolean;
  };
  tokens: {
    refresh: string;
    access: string;
  };
}

export interface UserMeResponse {
  status: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    role: 'USER' | 'BRAND' | 'ADMIN';
    is_active: boolean;
     is_staff?: boolean;
     is_superuser?: boolean;
    date_joined: string;
    last_login?: string;
  };
}

export interface ApiError {
  status?: string;
  message?: string;
  errors?: Record<string, string[]>;
  detail?: string;
  error?: string;
}

export interface AdminOrder {
  id: number;
  order_id: string;
  product_name: string;
  brand_name: string;
  order_amount: string;
  currency: string;
  status: string;
  user_email?: string;
  user_name?: string;
  user_role?: string;
  rejection_reason?: string | null;
  created_at: string;
}

export interface AdminReview {
  id: number;
  order_id: string;
  product_name: string;
  rating: number;
  status: string;
  user_email?: string;
  user_name?: string;
  user_role?: string;
  review_url?: string;
  created_at: string;
}

export interface AdminOverviewResponse {
  status: string;
  summary: {
    total_users: number;
    shoppers: number;
    brands: number;
    admins: number;
  };
  orders: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  reviews: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  brands: {
    total: number;
    wallet_balance: string;
    locked_balance: string;
  };
  wallets: {
    total_balance: string;
    total_earned: string;
    total_withdrawn: string;
  };
  recent_orders: AdminOrder[];
  recent_reviews: AdminReview[];
}

export interface AdminSubmissionsResponse {
  status: string;
  pending_orders: {
    count: number;
    data: AdminOrder[];
  };
  pending_reviews: {
    count: number;
    data: AdminReview[];
  };
}

export interface AdminUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string | null;
  role: 'USER' | 'BRAND' | 'ADMIN';
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
  last_login?: string | null;
  balance: string;
  total_earned: string;
  total_withdrawn: string;
  total_orders: number;
  total_reviews: number;
  approved_reviews: number;
}

export interface AdminUsersResponse {
  status: string;
  count: number;
  users: AdminUser[];
}

export interface AdminPayout {
  id: number;
  amount: string;
  currency: string;
  transaction_type: string;
  status: string;
  description?: string | null;
  reference_id?: string | null;
  created_at: string;
  completed_at?: string | null;
  user_email: string;
  user_name: string;
}

export interface AdminPayoutsResponse {
  status: string;
  count: number;
  summary: {
    total: number;
    pending: number;
    completed: number;
  };
  payouts: AdminPayout[];
}

export interface AdminActivity {
  id: string;
  type: 'order' | 'review';
  actor: string;
  activity: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  status?: string;
  order_id?: string;
  rating?: number;
}

export interface AdminActivitiesResponse {
  status: string;
  count: number;
  activities: AdminActivity[];
}

export interface AdminComplianceAlert {
  id: string;
  title: string;
  description: string;
  risk: 'low' | 'medium' | 'high';
  marketplace: string;
  updated_at: string;
}

export interface AdminComplianceResponse {
  status: string;
  count: number;
  alerts: AdminComplianceAlert[];
}

export type ReviewPlatform = 'AMAZON' | 'FLIPKART' | 'SHOPIFY' | 'OTHER';

export type StorefrontPlatform = ReviewPlatform | 'NYKAA' | 'MEESHO';

export interface StorefrontLink {
  id: number;
  marketplace: StorefrontPlatform;
  country?: string | null;
  url: string;
  notes?: string | null;
  created_at: string;
}

export interface BrandProfile {
  brand_name: string;
  description?: string | null;
  website?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  gst_number?: string | null;
  storefronts: StorefrontLink[];
}

export interface BrandProfileResponse {
  status: string;
  profile: BrandProfile;
}

export interface StorefrontListResponse {
  status: string;
  storefronts: StorefrontLink[];
}

export interface BrandProduct {
  id: number;
  name: string;
  description: string;
  sku?: string | null;
  asin?: string | null;
  price: string;
  currency: string;
  product_url: string;
  review_platform: ReviewPlatform;
  main_image?: string | null;
  available_slots?: number;
  created_at: string;
}

export interface BrandProductsResponse {
  status: string;
  count: number;
  products: BrandProduct[];
}

export interface CreateBrandProductRequest {
  name: string;
  description: string;
  sku?: string;
  asin?: string;
  price: string;
  currency: string;
  product_url: string;
  review_platform: ReviewPlatform;
  is_active?: boolean;
  is_featured?: boolean;
}

export interface BrandStatsResponse {
  status: string;
  stats: {
    wallet_balance: string;
    locked_balance: string;
    available_balance: string;
    currency: string;
    total_products: number;
    active_products: number;
    total_slots: number;
    reserved_slots: number;
    available_slots: number;
    total_orders: number;
    approved_orders: number;
    pending_orders: number;
    total_reviews: number;
    approved_reviews: number;
    reviews_acquired: number;
    total_spent: string;
  };
}

export interface ReviewSlot {
  id: number;
  product: number;
  product_name: string;
  cashback_amount: string;
  currency: string;
  status: 'OPEN' | 'RESERVED' | 'COMPLETED' | 'CANCELLED';
  available_slots: number;
  total_slots: number;
  min_review_rating: number;
  review_deadline_days: number;
  created_at: string;
}

export interface BrandReviewSlotsResponse {
  status: string;
  count: number;
  summary: {
    open: number;
    reserved: number;
    completed: number;
    cancelled: number;
    total_slots: number;
    reserved_slots: number;
    available_slots: number;
  };
  slots: ReviewSlot[];
}

export interface CreateReviewSlotRequest {
  product: number;
  campaign?: number;
  cashback_amount: string;
  currency: string;
  total_slots: number;
  min_review_rating?: number;
  review_deadline_days?: number;
}

export interface BrandOrder {
  id: number;
  product: number;
  product_name: string;
  brand_name: string;
  product_url?: string | null;
  review_slot: number | null;
  order_id: string;
  order_date: string;
  order_amount: string;
  currency: string;
  purchase_proof?: string | null;
  additional_proof?: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  rejection_reason?: string | null;
  is_draft: boolean;
  clicked_at?: string | null;
  created_at: string;
  updated_at: string;
  approved_at?: string | null;
  user_email?: string | null;
  user_role?: string | null;
  user_name?: string | null;
}

export interface BrandOrdersResponse {
  status: string;
  count: number;
  summary: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    cancelled: number;
  };
  orders: BrandOrder[];
}

export interface BrandReview {
  id: number;
  order: number;
  order_id: string;
  product: number;
  product_name: string;
  rating: number;
  title?: string | null;
  review_text?: string | null;
  review_url?: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejection_reason?: string | null;
  cashback_amount?: string | null;
  cashback_status?: string | null;
  created_at: string;
  updated_at: string;
  submitted_at?: string | null;
  approved_at?: string | null;
  user_email?: string | null;
  user_role?: string | null;
  user_name?: string | null;
}

export interface BrandReviewsResponse {
  status: string;
  count: number;
  summary: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  reviews: BrandReview[];
}

export interface SentimentByMarketplace {
  marketplace: string;
  positive: number;
  neutral: number;
  negative: number;
  total_reviews: number;
  avg_rating: number;
}

export interface BrandAnalyticsResponse {
  status: string;
  sentiment_by_marketplace: SentimentByMarketplace[];
  sentiment_totals: {
    positive: number;
    neutral: number;
    negative: number;
  };
  velocity_index: number;
  campaign_analytics: {
    reviews_received_today: number;
    average_rating: number;
    total_slots_remaining: number;
    active_campaigns: number;
    total_reviews: number;
    recent_orders_7d: number;
    recent_reviews_7d: number;
  };
}

export interface Campaign {
  id: number;
  name: string;
  brand: number;
  brand_name: string;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  total_budget: string;
  spent_budget: string;
  available_budget: string;
  currency: string;
  total_products: number;
  total_orders: number;
  approved_orders: number;
  total_reviews: number;
  progress_percentage: number;
  created_at: string;
  updated_at: string;
  started_at?: string | null;
  completed_at?: string | null;
}

export interface CampaignListResponse {
  status: string;
  campaigns: Campaign[];
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Campaign[];
}

export interface CampaignDetailResponse {
  status: string;
  campaign: Campaign;
}

export interface CreateCampaignRequest {
  name: string;
  total_budget: string;
  currency?: string;
}

export interface CampaignProduct extends BrandProduct {
  campaign?: number | null;
  campaign_name?: string | null;
  orders_count: number;
  approved_orders: number;
  reviews_count: number;
}

export interface CampaignProductsResponse {
  status: string;
  products: CampaignProduct[];
}

export interface CampaignProductOrder extends BrandOrder {
  review?: BrandReview | null;
}

export interface CampaignProductOrdersResponse {
  status: string;
  orders: CampaignProductOrder[];
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: CampaignProductOrder[];
}

export interface RejectOrderRequest {
  rejection_reason: string;
}

export interface ShopProduct {
  id: number;
  name: string;
  description: string;
  sku?: string | null;
  asin?: string | null;
  price: string;
  currency: string;
  main_image?: string | null;
  product_url: string;
  review_platform: ReviewPlatform;
  brand_name: string;
  available_slots: number;
  is_featured: boolean;
  created_at: string;
}

export interface ShopProductsResponse {
  status: string;
  count: number;
  products: ShopProduct[];
}

export interface TrackClickResponse {
  status: string;
  message: string;
  draft_order: BrandOrder;
}

export interface OrderSubmissionResponse {
  status: string;
  message: string;
  order: BrandOrder;
}

export interface ReviewSubmissionResponse {
  status: string;
  message: string;
  review: BrandReview;
}

export interface UserWalletResponse {
  status: string;
  wallet: {
    id: number;
    balance: string;
    currency: string;
    total_earned: string;
    total_withdrawn: string;
    transactions: Array<{
      id: number;
      amount: string;
      currency: string;
      transaction_type: 'CREDIT' | 'DEBIT';
      status: string;
      description?: string | null;
      reference_id?: string | null;
      created_at: string;
      completed_at?: string | null;
    }>;
  };
}

/**
 * Get stored access token
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

/**
 * Get stored refresh token
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refresh_token');
}

/**
 * Store tokens
 */
export function setTokens(access: string, refresh: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
}

/**
 * Clear tokens
 */
export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

/**
 * Make authenticated API request
 */
function isFormData(body: RequestInit["body"]): body is FormData {
  return typeof FormData !== 'undefined' && body instanceof FormData;
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    ...((options.headers as Record<string, string>) || {}),
  };

  // Set Content-Type only if there's a body and it's not FormData
  if (options.body && !isFormData(options.body) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  // Add authentication token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else if (endpoint.startsWith('/brand/') || endpoint.startsWith('/admin/') || endpoint.startsWith('/user/')) {
    // Protected endpoints require authentication
    if (typeof window !== 'undefined') {
      // Only redirect in browser
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
        // Clear any stale tokens
        clearTokens();
        // Don't redirect here, let the 401 handler do it
      }
    }
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch (error: any) {
    // Handle network errors (backend not running, CORS, etc.)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        `Cannot connect to backend server. Please ensure the Django server is running at ${API_BASE_URL}. ` +
        `If the server is running, check CORS settings and network connectivity.`
      );
    }
    throw new Error(`Network error: ${error.message || 'Failed to connect to server'}`);
  }

  // Handle 401 Unauthorized - token might be expired
  let shouldProcessError = true;
  if (response.status === 401) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        let refreshResponse: Response;
        try {
          refreshResponse = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
          });
        } catch (error: any) {
          clearTokens();
          throw new Error(
            `Cannot connect to backend server. Please ensure the Django server is running at ${API_BASE_URL}.`
          );
        }

        if (refreshResponse.ok) {
          const { access } = await refreshResponse.json();
          localStorage.setItem('access_token', access);
          // Retry original request with new token
          headers['Authorization'] = `Bearer ${access}`;
          let retryResponse: Response;
          try {
            retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
              ...options,
              headers,
            });
          } catch (error: any) {
            clearTokens();
            throw new Error(
              `Cannot connect to backend server. Please ensure the Django server is running at ${API_BASE_URL}.`
            );
          }
          
          if (!retryResponse.ok) {
            // If retry still fails, replace response to process error below
            response = retryResponse;
            shouldProcessError = true;
          } else {
            // Success after refresh, return the data
            shouldProcessError = false;
            return retryResponse.json();
          }
        } else {
          // Refresh failed, clear tokens and get error message
          clearTokens();
          let refreshError = 'Session expired. Please login again.';
          try {
            const refreshErrorData = await refreshResponse.json();
            refreshError = refreshErrorData.message || refreshErrorData.detail || refreshError;
          } catch {
            // Use default message
          }
          throw new Error(refreshError);
        }
      } catch (error: any) {
        clearTokens();
        // Re-throw the error if it's already an Error, otherwise wrap it
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(error?.message || 'Authentication failed. Please login again.');
      }
    } else {
      // No refresh token available
      clearTokens();
      throw new Error('Authentication required. Please login to continue.');
    }
  }

  // Process error response if request failed
  if (shouldProcessError && !response.ok) {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;
    let errorDetails: any = {
      status: response.status,
      statusText: response.statusText,
      url: `${API_BASE_URL}${endpoint}`,
    };
    
    // Handle specific status codes
    if (response.status === 401) {
      errorMessage = 'Authentication required. Please login again.';
    } else if (response.status === 403) {
      errorMessage = 'You do not have permission to access this resource.';
    } else if (response.status === 404) {
      errorMessage = 'Resource not found.';
    } else if (response.status === 500) {
      errorMessage = 'Internal server error. Please check if you have a brand profile set up.';
    }
    
    // Try to parse error response - read response body once
    try {
      // Clone response to read it safely
      const responseClone = response.clone();
      const contentType = response.headers.get('content-type') || '';
      errorDetails.contentType = contentType;
      
      // Try to get text first (works for both JSON and HTML/text)
      const responseText = await responseClone.text();
      errorDetails.hasBody = !!responseText;
      errorDetails.bodyLength = responseText?.length || 0;
      
      if (responseText && responseText.trim()) {
        // Try to parse as JSON
        if (contentType.includes('application/json') || responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          try {
            const errorData: ApiError = JSON.parse(responseText);
            errorDetails.parsed = errorData;
            errorDetails.message = errorData.message;
            errorDetails.detail = errorData.detail;
            errorDetails.error = errorData.error;
            errorDetails.errors = errorData.errors;
            
            const backendMessage = errorData.message || errorData.detail || errorData.error;
            
            // Use backend message if available
            if (backendMessage) {
              errorMessage = backendMessage;
            }
            
            // Include detail field if available (Django REST Framework format)
            if (errorData.detail && errorData.detail !== errorMessage && !errorData.detail.includes('Traceback')) {
              errorMessage = `${errorMessage} - ${errorData.detail}`;
            }
          } catch (jsonError: any) {
            // Not valid JSON, store raw text
            errorDetails.parseError = jsonError.message;
            errorDetails.rawText = responseText.substring(0, 500);
            if (responseText.length < 300) {
              errorMessage = responseText;
            }
          }
        } else {
          // Not JSON, store text preview
          const textPreview = responseText.length > 300 ? responseText.substring(0, 300) + '...' : responseText;
          errorDetails.rawText = textPreview;
          if (responseText.length < 500) {
            errorMessage = textPreview;
          }
        }
      } else {
        errorDetails.emptyBody = true;
      }
    } catch (parseError: any) {
      // If all parsing fails, store the parse error
      errorDetails.parseError = parseError.message || String(parseError);
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to parse error response:', parseError);
      }
    }
    
    // Add authentication info
    errorDetails.hasToken = !!getAccessToken();
    errorDetails.tokenPreview = getAccessToken() ? `${getAccessToken()?.substring(0, 20)}...` : 'No token';
    
    // Log full error details for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error Details:', errorDetails);
    }
    
    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Authentication API
 */
export const authApi = {
  /**
   * Login user
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error(
          `Cannot connect to backend server. Please ensure the Django server is running at ${API_BASE_URL}.`
        );
      }
      throw error;
    }

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.detail || 'Login failed');
    }

    const data: LoginResponse = await response.json();
    
    // Store tokens
    if (data.tokens) {
      setTokens(data.tokens.access, data.tokens.refresh);
    }

    return data;
  },

  /**
   * Register new user
   */
  async register(
    email: string,
    password: string,
    password2: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    role: 'USER' | 'BRAND'
  ): Promise<RegisterResponse> {
    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          password2,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          role,
        }),
      });
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error(
          `Cannot connect to backend server. Please ensure the Django server is running at ${API_BASE_URL}.`
        );
      }
      throw error;
    }

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.detail || 'Registration failed');
    }

    const data: RegisterResponse = await response.json();
    
    // Store tokens
    if (data.tokens) {
      setTokens(data.tokens.access, data.tokens.refresh);
    }

    return data;
  },

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<UserMeResponse> {
    return apiRequest<UserMeResponse>('/auth/me/');
  },

  /**
   * Update user profile
   */
  async updateProfile(payload: { first_name?: string; last_name?: string; phone_number?: string }): Promise<{ status: string; message: string; user: any }> {
    return apiRequest<{ status: string; message: string; user: any }>('/auth/me/', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Logout (clear tokens)
   */
  logout(): void {
    clearTokens();
  },
};

/**
 * Admin API
 */
export const adminApi = {
  async getOverview(): Promise<AdminOverviewResponse> {
    return apiRequest<AdminOverviewResponse>('/admin/overview/');
  },
  async getSubmissions(): Promise<AdminSubmissionsResponse> {
    return apiRequest<AdminSubmissionsResponse>('/admin/submissions/');
  },
  async approveOrder(orderId: number) {
    return apiRequest('/admin/approve/order/', {
      method: 'POST',
      body: JSON.stringify({ order_id: orderId }),
    });
  },
  async rejectOrder(orderId: number, reason?: string) {
    return apiRequest('/admin/reject/order/', {
      method: 'POST',
      body: JSON.stringify({ order_id: orderId, rejection_reason: reason || '' }),
    });
  },
  async approveReview(reviewId: number) {
    return apiRequest('/admin/approve/review/', {
      method: 'POST',
      body: JSON.stringify({ review_id: reviewId }),
    });
  },
  async rejectReview(reviewId: number, reason?: string) {
    return apiRequest('/admin/reject/review/', {
      method: 'POST',
      body: JSON.stringify({ review_id: reviewId, rejection_reason: reason || '' }),
    });
  },
  async processPayout(transactionId: number, referenceId?: string) {
    return apiRequest('/admin/process-payout/', {
      method: 'POST',
      body: JSON.stringify({ transaction_id: transactionId, reference_id: referenceId || '' }),
    });
  },
  async getUsers(): Promise<AdminUsersResponse> {
    return apiRequest<AdminUsersResponse>('/admin/users/');
  },
  async getPayouts(): Promise<AdminPayoutsResponse> {
    return apiRequest<AdminPayoutsResponse>('/admin/payouts/');
  },
  async getActivities(): Promise<AdminActivitiesResponse> {
    return apiRequest<AdminActivitiesResponse>('/admin/activities/');
  },
  async getComplianceAlerts(): Promise<AdminComplianceResponse> {
    return apiRequest<AdminComplianceResponse>('/admin/compliance/');
  },
};

/**
 * Brand API
 */
export const brandApi = {
  async getProducts(): Promise<BrandProductsResponse> {
    return apiRequest<BrandProductsResponse>('/brand/products/');
  },
  async createProduct(payload: CreateBrandProductRequest) {
    return apiRequest('/brand/products/create/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async getStats(): Promise<BrandStatsResponse> {
    return apiRequest<BrandStatsResponse>('/brand/stats/');
  },
  async getProfile(): Promise<BrandProfileResponse> {
    return apiRequest<BrandProfileResponse>('/brand/profile/');
  },
  async updateProfile(payload: Partial<Omit<BrandProfile, 'storefronts'>>) {
    return apiRequest('/brand/profile/', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  async getStorefronts(): Promise<StorefrontListResponse> {
    return apiRequest<StorefrontListResponse>('/brand/storefronts/');
  },
  async createStorefront(payload: {
    marketplace: StorefrontPlatform;
    url: string;
    country?: string;
    notes?: string;
  }) {
    return apiRequest('/brand/storefronts/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async deleteStorefront(id: number) {
    return apiRequest('/brand/storefronts/', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
  },
  async getReviewSlots(): Promise<BrandReviewSlotsResponse> {
    return apiRequest<BrandReviewSlotsResponse>('/brand/review-slots/');
  },
  async createReviewSlot(payload: CreateReviewSlotRequest) {
    return apiRequest('/brand/review-slots/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async getOrders(): Promise<BrandOrdersResponse> {
    return apiRequest<BrandOrdersResponse>('/brand/orders/');
  },
  async getReviews(): Promise<BrandReviewsResponse> {
    return apiRequest<BrandReviewsResponse>('/brand/reviews/');
  },
  async getAnalytics(): Promise<BrandAnalyticsResponse> {
    return apiRequest<BrandAnalyticsResponse>('/brand/analytics/');
  },
  async getCampaigns(page?: number, pageSize?: number, search?: string, status?: string): Promise<CampaignListResponse> {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (pageSize) params.append('page_size', pageSize.toString());
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    const query = params.toString();
    return apiRequest<CampaignListResponse>(`/brand/campaigns${query ? `?${query}` : ''}`);
  },
  async createCampaign(payload: CreateCampaignRequest): Promise<CampaignDetailResponse> {
    return apiRequest<CampaignDetailResponse>('/brand/campaigns/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async getCampaign(campaignId: number): Promise<CampaignDetailResponse> {
    return apiRequest<CampaignDetailResponse>(`/brand/campaigns/${campaignId}/`);
  },
  async updateCampaign(campaignId: number, payload: Partial<CreateCampaignRequest & { status?: string }>): Promise<CampaignDetailResponse> {
    return apiRequest<CampaignDetailResponse>(`/brand/campaigns/${campaignId}/`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  async deleteCampaign(campaignId: number): Promise<{ status: string; message: string }> {
    return apiRequest<{ status: string; message: string }>(`/brand/campaigns/${campaignId}/`, {
      method: 'DELETE',
    });
  },
  async getCampaignProducts(campaignId: number): Promise<CampaignProductsResponse> {
    return apiRequest<CampaignProductsResponse>(`/brand/campaigns/${campaignId}/products/`);
  },
  async getCampaignProductOrders(campaignId: number, productId: number, page?: number, pageSize?: number): Promise<CampaignProductOrdersResponse> {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (pageSize) params.append('page_size', pageSize.toString());
    const query = params.toString();
    return apiRequest<CampaignProductOrdersResponse>(`/brand/campaigns/${campaignId}/products/${productId}/orders${query ? `?${query}` : ''}`);
  },
  async approveOrder(orderId: number): Promise<{ status: string; message: string; order: BrandOrder }> {
    return apiRequest<{ status: string; message: string; order: BrandOrder }>(`/brand/orders/${orderId}/approve/`, {
      method: 'POST',
    });
  },
  async rejectOrder(orderId: number, payload: RejectOrderRequest): Promise<{ status: string; message: string; order: BrandOrder }> {
    return apiRequest<{ status: string; message: string; order: BrandOrder }>(`/brand/orders/${orderId}/reject/`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

/**
 * User API
 */
export const userApi = {
  async getShopProducts(): Promise<ShopProductsResponse> {
    return apiRequest<ShopProductsResponse>('/shop/products/');
  },
  async trackClick(productId: number, reviewSlotId?: number): Promise<TrackClickResponse> {
    return apiRequest<TrackClickResponse>('/user/track/', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        review_slot_id: reviewSlotId,
      }),
    });
  },
  async submitOrder(form: FormData): Promise<OrderSubmissionResponse> {
    return apiRequest<OrderSubmissionResponse>('/user/orders/', {
      method: 'POST',
      body: form,
    });
  },
  async getOrders(): Promise<BrandOrdersResponse> {
    return apiRequest<BrandOrdersResponse>('/user/orders/list/');
  },
  async submitReview(payload: {
    order: number;
    rating: number;
    title?: string;
    review_text?: string;
    review_url?: string;
  }): Promise<ReviewSubmissionResponse> {
    return apiRequest<ReviewSubmissionResponse>('/user/reviews/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async getReviews(): Promise<BrandReviewsResponse> {
    return apiRequest<BrandReviewsResponse>('/user/reviews/list/');
  },
  async getWallet(): Promise<UserWalletResponse> {
    return apiRequest<UserWalletResponse>('/user/wallet/');
  },

  async requestWithdrawal(amount: string, paymentMethod: 'upi' | 'bank', accountDetails: string): Promise<{ status: string; message: string; transaction: any }> {
    return apiRequest('/user/withdraw/', {
      method: 'POST',
      body: JSON.stringify({
        amount,
        payment_method: paymentMethod,
        account_details: accountDetails,
      }),
    });
  },
};

/**
 * Health check
 */
export async function healthCheck(): Promise<{ status: string; message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/health/`);
    if (!response.ok) {
      throw new Error('Health check failed');
    }
    return response.json();
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        `Backend server is not reachable at ${API_BASE_URL}. ` +
        `Please ensure the Django server is running. Start it with: ` +
        `cd orm-cashback-backend && python manage.py runserver`
      );
    }
    throw error;
  }
}

