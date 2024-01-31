import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-6xl items-center justify-between px-3 py-5">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tighter sm:text-2xl"
        >
          Digital <span className="text-primary">Mart</span>
        </Link>

        <Button asChild size={"sm"}>
          <Link to="/auth/login">Login</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
