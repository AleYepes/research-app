"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export function PlanToggle() {
  return (
    <div className="mb-3 flex justify-center md:mb-6">
      <div className="bg-gray-200 dark:bg-gray-800 rounded-full p-1">
        <div className="relative grid h-full grid-cols-2 gap-1">
          <div className="relative z-10 h-full px-3 text-center font-medium py-1.5 text-sm">
            <button
              type="button"
              data-state="on"
              role="radio"
              aria-checked="true"
              className="box-content h-full text-primary"
            >
              Personal
            </button>
            <div className="bg-white dark:bg-black absolute inset-0 -z-10 box-content h-full rounded-full shadow-sm"></div>
          </div>
          <div className="relative z-10 h-full px-3 text-center font-medium py-1.5 text-sm">
            <button
              type="button"
              data-state="off"
              role="radio"
              aria-checked="false"
              className="box-content h-full text-gray-500"
            >
              Business
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
