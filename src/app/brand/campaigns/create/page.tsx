import { CreateCampaignWizard } from "@/components/sections/brand/create-campaign-wizard";

export const metadata = {
  title: "Brand • Create Campaign",
};

export default function CreateCampaignPage() {
  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Campaigns</p>
          <h1 className="text-4xl font-bold text-slate-900">Create New Campaign</h1>
          <p className="text-slate-600">
            Set up a new review campaign in simple steps. Paste product link, set quantity and budget.
          </p>
        </div>
        <CreateCampaignWizard />
      </div>
    </div>
  );
}

