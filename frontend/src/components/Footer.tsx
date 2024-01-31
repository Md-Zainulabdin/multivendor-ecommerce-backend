import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tighter">Jobs Portal</h3>
            <p className="text-muted-foreground text-sm">
              Connecting talents with opporatunities
            </p>
          </div>
          <div className="text-muted-foreground flex flex-wrap gap-5 text-sm">
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-muted-foreground text-center text-sm">
          © {new Date().getFullYear()} Jobs Portal, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
