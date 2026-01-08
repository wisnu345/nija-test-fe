import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <img src="/404.png" alt="404" className="md:w-1/3" />

      <Link
        to="/"
        className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
