
export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: "#f8faf8" }}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: "#15803d", borderTopColor: "transparent" }}
        />
        <p className="text-sm font-medium" style={{ color: "#15803d" }}>Loading...</p>
      </div>
    </main>
  );
}