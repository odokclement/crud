import UserLoginForm from "@/components/UserLoginForm";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
  } from "@/components/ui/tabs";
import UserForm from "@/components/UserForm";
const AuthPage = () => {
    return ( 
        <>
        <Tabs defaultValue="login" className="w-full max-w-md mx-auto mt-5">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <UserLoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <UserForm />{" "}
        </TabsContent>
      </Tabs>
        </>
       
     );
}
 
export default AuthPage;