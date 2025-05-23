import connectMongoDB from "@/lib/mongodb";
import user from "@/models/user";
import { NextResponse } from "next/server";

interface RequestParams {
  params: {
    id: string;
  };
}

interface RequestBody {
  newName: string;
  newEmail: string;
  newPassword: string;
}

export async function PUT(request: Request, { params }: RequestParams) {
  const { id } = await params;
  const {
    newName: name,
    newEmail: email,
    newPassword: password,
  }: RequestBody = await request.json();
  await connectMongoDB();
  await user.findByIdAndUpdate(id, { name, email, password });
  return NextResponse.json(
    { message: "User updated successfully" },
    { status: 200 }
  );
}
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  await connectMongoDB();

  const userDetail = await user.findOne({ _id: id });
  return NextResponse.json(userDetail);
}
