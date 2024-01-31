import LoginForm from "@/components/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="my-10 w-[400px] space-y-12 p-4 sm:my-16 md:my-32">
        <div>
          <h1 className="text-center text-2xl font-semibold tracking-tighter sm:text-3xl">
            Login to Digital <span className="text-primary">Mart</span>
          </h1>
        </div>
        <div className="space-y-3 rounded-md border p-4 shadow-sm">
          <LoginForm />

          <div className="w-full text-center">
            <span className="text-muted-foreground text-sm">
              Dont have account,{" "}
              <Link
                className="text-primary font-medium hover:underline"
                to={"/auth/signup"}
              >
                Signup!
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
