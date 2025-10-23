import { Suspense } from "react";
import { LoginForm } from "../(auth)/_components/login-form";

const DashboarPage = () => {
    return (
      <Suspense>
        <LoginForm />
      </Suspense>
    );
}
 
export default DashboarPage;