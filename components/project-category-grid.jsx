import Link from "next/link"
import { Map, Car, Home, DollarSign, ShoppingBag, Shirt, Sparkles, Package, Briefcase, Users } from "lucide-react"

const iconMap = {
  Map: <Map className="h-6 w-6" />,
  Car: <Car className="h-6 w-6" />,
  Home: <Home className="h-6 w-6" />,
  DollarSign: <DollarSign className="h-6 w-6" />,
  ShoppingBag: <ShoppingBag className="h-6 w-6" />,
  Shirt: <Shirt className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
  Package: <Package className="h-6 w-6" />,
  Briefcase: <Briefcase className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
}

export function ProjectCategoryGrid({ categories, projectId }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link
          key={category.title}
          href={`/projects/${projectId}/${category.id}`}
          className="flex items-start gap-4 p-4 rounded-lg bg-card hover:bg-accent transition-colors"
        >
          <div className="p-2 bg-primary/10 rounded-md text-primary">{iconMap[category.icon]}</div>
          <div className="flex-1">
            <h3 className="font-bold">{category.title}</h3>
            {category.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {category.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}

