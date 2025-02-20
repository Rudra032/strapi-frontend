"use client"; // ✅ Ensure this is at the top

import { useRouter } from "next/navigation";

export default function PreviewBanner() {
  const router = useRouter();

  const handleExit = () => {
    router.push("/api/exit-preview");
    router.refresh();
  };

  return (
    <div className="bg-yellow-500 p-4 text-center">
      <p className="font-bold">You are in preview mode</p>
      <button
        onClick={handleExit}
        className="bg-black text-white px-4 py-2 rounded mt-2"
      >
        Exit Preview Mode
      </button>
    </div>
  );
}
