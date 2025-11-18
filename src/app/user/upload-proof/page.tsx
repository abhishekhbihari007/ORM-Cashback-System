import { UploadProofForm } from "@/components/sections/user/upload-proof-form";

export const metadata = {
  title: "Upload Proof • Get Cashback",
};

export default function UploadProofPage() {
  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-6 md:py-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Upload Proof</h1>
          <p className="mt-2 text-slate-600">
            Upload your order screenshot and review to get cashback approved.
          </p>
        </div>
        <UploadProofForm />
      </div>
    </div>
  );
}

