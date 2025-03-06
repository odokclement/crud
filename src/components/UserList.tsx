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
    <div>
      <h1 className="text-2xl font-bold px-4">User List</h1>
      <ol>
        {users.map((user) => (
          <li key={user._id}>
            <div className="flex items-center px-5 gap-2">
              {user.name} - {user.email}
              <Trash2
                className="text-red-500 cursor-pointer"
                onClick={() => deleteUser(user._id)}
              />
              <Link href={`/UserList/${user._id}`}>
              <SquarePen className="text-blue-500 cursor-pointer" />
              </Link>
             
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default UserList;

