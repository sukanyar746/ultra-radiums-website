import { cn } from '@/lib/utils';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('shimmer rounded-xl', className)} />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 space-y-3">
      <Skeleton className="w-full h-40 rounded-xl" />
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-1/2 h-3" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-12 h-5" />
      </div>
    </div>
  );
}

export function StoreCardSkeleton() {
  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 flex gap-4">
      <Skeleton className="w-16 h-16 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-1/2 h-3" />
        <Skeleton className="w-1/3 h-3" />
      </div>
    </div>
  );
}

export function PriceRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-surface-100 dark:border-surface-700">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <div className="space-y-1.5">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>
      <Skeleton className="w-16 h-6" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <Skeleton className="w-48 h-8" />
      <Skeleton className="w-full h-12 rounded-2xl" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
