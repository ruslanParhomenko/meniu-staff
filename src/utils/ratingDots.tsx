"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

type RatingDotsProps = {
  name: string;
};

export const RatingDots = ({ name }: RatingDotsProps) => {
  const { setValue, watch } = useFormContext();
  const rating = watch(name) || 0;

  return (
    <div className="flex w-full justify-center items-center gap-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => setValue(name, i)}
          className={cn(
            "text-md transition-colors",
            i <= rating ? "text-background" : "text-black"
          )}
        >
          ●
        </button>
      ))}

      <span
        className="text-md text-background px-2"
        onClick={() => setValue(name, 0)}
      >
        {rating === 0 || rating === "" ? (
          <StarIcon className="size-4 fill-current" />
        ) : (
          rating
        )}
      </span>
      <input type="hidden" value={rating} name={name} />
    </div>
  );
};
