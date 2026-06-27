// app/not-found.jsx

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "#f8faf8" }}>
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-8xl font-black" style={{ color: "#6B8E23" }}>404</h1>
        <h2 className="text-2xl font-bold" style={{ color: "#14532d" }}>Page Not Found</h2>
        <p className="text-sm text-gray-400 max-w-sm">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-2 px-5 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "#15803d" }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}