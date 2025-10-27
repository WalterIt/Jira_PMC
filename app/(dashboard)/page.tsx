import LoginButton from "../(auth)/_components/login-button";
import { Button } from "@/components/ui/button";

const DashboarPage = () => {
    return (
    <div className="flex items-center justify-center h-dvh">
      <div className="flex justify-center gap-8 flex-col items-center">
        <h1 className="text-6xl text-blue-950 font-bold">🔐 Better Authentication</h1>
        <p className="text-3xl text-blue-950 font-bold mb-4" >A Simple Authentication</p>
        <div>
            <LoginButton asChild>
              <Button variant={"secondary"} size={"lg"}>
                Get Started
              </Button>
          </LoginButton>
        </div>


      </div>
    </div>
    );
}
 
export default DashboarPage;