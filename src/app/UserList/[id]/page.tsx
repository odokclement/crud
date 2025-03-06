"use client";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userSchema } from "@/schemas/userSchema";

interface UserUpdateProps {
  userId: string;
}

const UserUpdateForm = ({ userId }: UserUpdateProps) => {
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        console.error("User ID is undefined");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (response.ok) {
          const { users } = await response.json();
          if (users) {
            // Set Default Values
            form.reset({
              name: users.name,
              email: users.email,
              password: "",
            });
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, form]);

  const handleSubmit = async (data: z.infer<typeof userSchema>) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName: data.name,
          newEmail: data.email,
          newPassword: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      alert("User updated successfully 🎉");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
    return <h3>Loading user data...</h3>;
  }

  return (
    <>
      <h3 className="text-2xl mb-4">Update User</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Name"
                    {...field}
                    className="w-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    {...field}
                    className="w-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    {...field}
                    className="w-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-fit bg-green-400 hover:bg-green-500"
          >
            Update User
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UserUpdateForm;
