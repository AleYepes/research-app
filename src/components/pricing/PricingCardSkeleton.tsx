import { Skeleton } from "@/components/ui/skeleton";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PricingCardSkeleton() {
  const cardClasses = cn(
    "border md:min-h-[30rem] md:max-w-96 md:pb-6 relative flex flex-1 flex-col justify-center gap-4 rounded-xl px-6 py-6.5 text-sm bg-white dark:bg-gray-900",
  );

  return (
    <div className={cardClasses}>
      <CardHeader className="p-6">
        <Skeleton className="h-7 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-10 w-1/2" />
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <ul className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <li key={i} className="flex items-start">
              <Skeleton className="h-5 w-5 mr-2 rounded-full" />
              <Skeleton className="h-5 w-full" />
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </div>
  );
}
