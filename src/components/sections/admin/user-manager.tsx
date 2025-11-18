"use client";

import { useState } from "react";
import { User } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";

type Props = {
  users: User[];
};

export function UserManager({ users }: Props) {
  const [userList, setUserList] = useState(users);
  const [editingBalance, setEditingBalance] = useState<string | null>(null);
  const [balanceValue, setBalanceValue] = useState("");

  const handleBanUser = (userId: string) => {
    setUserList((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, status: "banned" as const } : user))
    );
  };

  const handleUnbanUser = (userId: string) => {
    setUserList((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, status: "active" as const } : user))
    );
  };

  const handleEditBalance = (user: User) => {
    setEditingBalance(user.id);
    setBalanceValue(user.balance.toString());
  };

  const handleSaveBalance = (userId: string) => {
    const newBalance = parseFloat(balanceValue);
    if (!isNaN(newBalance)) {
      setUserList((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, balance: newBalance } : user))
      );
    }
    setEditingBalance(null);
    setBalanceValue("");
  };

  const handleCancelEdit = () => {
    setEditingBalance(null);
    setBalanceValue("");
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Contact</th>
            <th className="px-6 py-4">Balance</th>
            <th className="px-6 py-4">Pending</th>
            <th className="px-6 py-4">Total Earned</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-6 py-4">
                <p className="font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">
                  Joined {new Date(user.joinedAt).toLocaleDateString()}
                </p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-slate-600">{user.email}</p>
                <p className="text-xs text-slate-500">{user.phone}</p>
              </td>
              <td className="px-6 py-4">
                {editingBalance === user.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={balanceValue}
                      onChange={(e) => setBalanceValue(e.target.value)}
                      className="w-24 rounded-lg border border-slate-200 px-2 py-1 text-sm"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveBalance(user.id)}
                      className="rounded-lg bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="rounded-lg bg-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900">₹{user.balance.toFixed(2)}</p>
                    <button
                      onClick={() => handleEditBalance(user)}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-slate-600">₹{user.pendingCashback.toFixed(2)}</td>
              <td className="px-6 py-4 text-slate-600">₹{user.totalEarned.toFixed(2)}</td>
              <td className="px-6 py-4">
                <StatusBadge
                  label={user.status}
                  variant={user.status === "active" ? "success" : "danger"}
                />
              </td>
              <td className="px-6 py-4">
                {user.status === "active" ? (
                  <button
                    onClick={() => handleBanUser(user.id)}
                    className="rounded-lg bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-100"
                  >
                    Ban User
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnbanUser(user.id)}
                    className="rounded-lg bg-green-50 px-3 py-1 text-xs font-semibold text-green-600 hover:bg-green-100"
                  >
                    Unban
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

