"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Icons } from "@/lib/icons";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl border border-red-200 bg-white p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Icons.AlertTriangle className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-slate-900">Something went wrong</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {this.state.error && process.env.NODE_ENV === "development" && (
              <details className="mt-4 p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-700">
                <summary className="cursor-pointer font-semibold mb-2">Error Details</summary>
                <pre className="whitespace-pre-wrap overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

