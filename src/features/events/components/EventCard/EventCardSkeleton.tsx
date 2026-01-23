import { cn } from '@/lib/utils'

interface EventCardSkeletonProps {
  className?: string
}

export const EventCardSkeleton = ({ className }: EventCardSkeletonProps) => {
  return (
    <div className={cn('event-card', className)}>
      <div className="aspect-[4/5] overflow-hidden bg-zinc-900 mb-8 animate-pulse">
        <div className="w-full h-full bg-zinc-800" />
      </div>
      <div className="space-y-4">
        <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
        <div className="h-8 w-full bg-zinc-800 rounded animate-pulse" />
      </div>
    </div>
  )
}

