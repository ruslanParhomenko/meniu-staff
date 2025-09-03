'use client";';
import { useState } from "react";
import { cn } from "@/lib/utils";

export const RatingDots = () => {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="flex w-full justify-center items-center gap-2">
      {[1, 2, 3, 4, 5].map((i, index) => (
        <button
          key={`${i}+${index}`}
          type="button"
          onClick={() => setRating(i)}
          className={cn(
            "text-md  transition-colors",
            i <= rating ? "text-black" : "text-background"
          )}
        >
          ●
        </button>
      ))}
      <span className="text-md pl-4">{rating ?? "0"}</span>
    </div>
  );
};
