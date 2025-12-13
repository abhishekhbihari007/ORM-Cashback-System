"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { MobileLayout } from "@/components/layouts/MobileLayout";
import { FaUser, FaEnvelope, FaPhone, FaFloppyDisk, FaRightFromBracket } from "react-icons/fa6";

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState(() => ({
    name: user?.name || "",
    email: user?.email || "",
    phone: "", // Phone not in AuthUser, so empty by default
  }));

  // Sync form data when user changes - necessary for profile updates
  useEffect(() => {
    if (user) {
      const newName = user.name || "";
      const newEmail = user.email || "";
      setFormData((prev) => {
        // Only update if values actually changed
        if (prev.name === newName && prev.email === newEmail) {
          return prev;
        }
        return {
          name: newName,
          email: newEmail,
          phone: prev.phone, // Preserve phone if user doesn't have it
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, user?.name, user?.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSaving) return;

    try {
      setIsSaving(true);
      setError(null);

      // Split name into first_name and last_name
      const nameParts = formData.name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Call API to update profile
      const { authApi } = await import("@/lib/backend-api");
      const response = await authApi.updateProfile({
        first_name: firstName,
        last_name: lastName,
        phone_number: formData.phone || undefined,
      });

      // Update user in context
      updateUser({
        name: formData.name,
        email: formData.email,
      });

      setIsSaving(false);
      setSuccess("Profile updated successfully!");
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setIsSaving(false);
      setError(err.message || "Failed to save profile. Please try again.");
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 relative overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="px-6 py-6 max-w-2xl mx-auto relative z-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">Edit Profile</h1>
            <p className="mt-1 text-sm text-slate-700 font-medium">
              Update your profile information
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              {success}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* Profile Picture Section */}
            <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-xl border border-slate-200/50 p-6 shadow-md backdrop-blur-sm">
              <label className="block text-sm font-semibold text-slate-900 mb-4">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <FaUser size={32} />
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    Profile picture will be updated here
                  </p>
                  <button
                    type="button"
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Change Photo
                  </button>
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-xl border border-slate-200/50 p-6 shadow-md backdrop-blur-sm">
              <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-xl border border-slate-200/50 p-6 shadow-md backdrop-blur-sm">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-xl border border-slate-200/50 p-6 shadow-md backdrop-blur-sm">
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 hover:opacity-90 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaFloppyDisk className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <FaRightFromBracket className="h-4 w-4" />
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </MobileLayout>
  );
}

