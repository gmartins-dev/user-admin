import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// Skeleton específico para tabela de usuários
function UsersTableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="p-4">
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <div className="border-t">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border-b last:border-b-0">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-8 w-[80px]" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Skeleton para cards do dashboard
function DashboardCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-4" />
      </div>
      <Skeleton className="h-8 w-[80px]" />
      <Skeleton className="h-3 w-[140px] mt-2" />
    </div>
  )
}

export { Skeleton, UsersTableSkeleton, DashboardCardSkeleton }
