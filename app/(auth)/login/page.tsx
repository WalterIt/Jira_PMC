import { Suspense } from "react";
import { LoginForm } from "../_components/login-form";

const LoginPage = () => {
    return (
      <Suspense>
        <LoginForm />
      </Suspense>
    );
}
 
export default LoginPage;