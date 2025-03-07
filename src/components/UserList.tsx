"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SquarePen, Trash2 } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/users?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove user from state without reloading
      setUsers(users.filter((user) => user._id !== id));
      console.log("User deleted successfully");
    } catch (err) {
      console.error("Failed to delete user");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">User List</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user._id} className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="flex gap-4">
              <Trash2
                className="text-red-500 cursor-pointer hover:text-red-700 transition duration-300"
                onClick={() => deleteUser(user._id)}
              />
              <Link href={`/UserList/${user._id}`}>
                <SquarePen className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-300" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserList;

