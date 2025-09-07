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
    <div className="flex w-full justify-center items-center gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => setValue(name, i)}
          className={cn(
            "text-md transition-colors",
            i <= rating ? "text-rd" : "text-gr"
          )}
        >
          ●
        </button>
      ))}
      <span
        className="w-5 text-center text-md text-rd font-bold pl-2 cursor-pointer inline-block"
        onClick={() => setValue(name, 0)}
      >
        {rating === 0 ? (
          <StarIcon className="size-3 fill-current text-gr cursor-pointer mx-auto" />
        ) : (
          rating
        )}
      </span>
      <input type="hidden" value={rating} name={name} />
    </div>
  );
};
