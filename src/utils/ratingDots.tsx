import { useState } from "react";
import { cn } from "@/lib/utils"; // если используешь ShadCN utils

export const RatingDots = () => {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="flex w-full justify-center items-center gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => setRating(i)}
          className={cn(
            "text-xs transition-colors",
            i <= rating ? "text-black" : "text-gray-300"
          )}
        >
          ●
        </button>
      ))}
    </div>
  );
};
