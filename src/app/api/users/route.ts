import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import user from "@/models/user";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  const { name, email, password }: UserRequest = await request.json();
  await connectMongoDB();
  await user.create({ name, email, password });
  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const users = await user.find();
  return NextResponse.json(users);
}

interface DeleteRequest extends Request {
  nextUrl: {
    searchParams: {
      get: (name: string) => string | null;
    };
  };
}

export async function DELETE(request: DeleteRequest): Promise<NextResponse> {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await user.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted successfully" });
}
