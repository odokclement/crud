import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import user from "@/models/user";
import connectMongoDB from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        // Hardcoded user data
        // const users = [
        //   { id: "1", name: "John Doe", email: "john@example.com", password: "1234567890" },
        //   { id: "2", name: "Jane Smith", email: "jane@example.com", password: "securepass" }
        // ];
        console.log("Received credentials:", credentials); // Debugging log

        // Find user
        if (!credentials?.email || !credentials?.password) {
          throw new Error("email and password are required");
        }
        try {
          // Connect to MongoDB
          await connectMongoDB();

          // Find the user in the database
          const foundUser = await user.findOne({ email: credentials.email });

          if (!foundUser) {
            throw new Error("User not found");
          }

          // If using plain text passwords, compare directly
          if (foundUser.password !== credentials.password) {
            throw new Error("Invalid password");
          }

          console.log("User authenticated:", foundUser);
          return {
            id: foundUser._id.toString(),
            name: foundUser.name,
            email: foundUser.email,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Authentication failed, invalid credentials");
        }
      },
    }),
  ],

  // Add other NextAuth configuration options here
});

export { handler as GET, handler as POST };
