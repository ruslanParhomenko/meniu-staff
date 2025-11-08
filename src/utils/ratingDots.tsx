"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Circle, StarIcon } from "lucide-react";

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
            i <= rating ? "text-black" : "text-gray-300/60"
          )}
        >
          <Circle className="size-4 px-0.5 fill-current cursor-pointer mx-auto" />
        </button>
      ))}
      <span
        className="w-10 text-center text-md text-black font-bold cursor-pointer inline-block"
        onClick={() => setValue(name, 0)}
      >
        {rating === 0 ? (
          <StarIcon className="size-4 fill-current text-black cursor-pointer mx-auto" />
        ) : (
          rating
        )}
      </span>
      <input type="hidden" value={rating} name={name} />
    </div>
  );
};
