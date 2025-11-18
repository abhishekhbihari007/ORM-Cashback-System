import { api } from "@/lib/api";
import { UserManager } from "@/components/sections/admin/user-manager";

export const metadata = {
  title: "Admin • User Manager",
};

export default async function AdminUsersPage() {
  const users = await api.fetchUsers();

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Admin</p>
          <h1 className="text-4xl font-bold text-slate-900">User Manager</h1>
          <p className="text-slate-600">
            Manage all registered users. Ban scammers or edit balances as needed.
          </p>
        </div>
        <UserManager users={users} />
      </div>
    </div>
  );
}

