import UserUpdateForm from "@/components/UserUpdateForm";

interface Params {
  id: string;
}

const getUserById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching user", error);
  }
}

const UserUpdatePage = async ({ params }: { params: Params }) => {
  const { id } =  await params;
  const user = await getUserById(id);
  console.log(user)
  const { name, email,password } = user;
  console.log("id", id);

  return (
    <div>
      <UserUpdateForm id={id} name={name} email={email} password={password} />
    </div>
  );
};

export default UserUpdatePage;
