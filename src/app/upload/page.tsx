import { UploadProofForm } from "@/components/sections/user/upload-proof-form";
import { MobileLayout } from "@/components/layouts/MobileLayout";

export const metadata = {
  title: "Upload Proof • Get Cashback",
};

export default function UploadPage() {
  return (
    <MobileLayout>
      <div className="bg-slate-50">
        <div className="container-responsive space-y-6 py-6">
          <div className="px-4">
            <h1 className="text-2xl font-bold text-slate-900">Upload Proof</h1>
            <p className="mt-1 text-sm text-slate-600">
              Upload your order and review screenshots
            </p>
          </div>
          <UploadProofForm />
        </div>
      </div>
    </MobileLayout>
  );
}

