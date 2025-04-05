export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="h-8 w-64 bg-muted rounded animate-pulse mb-2"></div>
          <div className="h-4 w-96 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-32 bg-muted rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-muted rounded animate-pulse"></div>
        </div>
      </div>

      <div className="h-20 w-full bg-muted rounded animate-pulse mb-6"></div>

      <div className="my-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="h-10 w-96 bg-muted rounded animate-pulse"></div>
          <div className="h-10 w-64 bg-muted rounded animate-pulse"></div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 w-full bg-muted rounded animate-pulse"></div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="h-8 w-64 bg-muted rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 w-full bg-muted rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

