import Link from "next/link"
import { Map, Car, Home, DollarSign, ShoppingBag, Shirt, Sparkles, Package, Briefcase, Users } from "lucide-react"

const iconMap = {
  Map: <Map className="h-5 w-5 md:h-6 md:w-6" />,
  Car: <Car className="h-5 w-5 md:h-6 md:w-6" />,
  Home: <Home className="h-5 w-5 md:h-6 md:w-6" />,
  DollarSign: <DollarSign className="h-5 w-5 md:h-6 md:w-6" />,
  ShoppingBag: <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />,
  Shirt: <Shirt className="h-5 w-5 md:h-6 md:w-6" />,
  Sparkles: <Sparkles className="h-5 w-5 md:h-6 md:w-6" />,
  Package: <Package className="h-5 w-5 md:h-6 md:w-6" />,
  Briefcase: <Briefcase className="h-5 w-5 md:h-6 md:w-6" />,
  Users: <Users className="h-5 w-5 md:h-6 md:w-6" />,
}

export function ProjectCategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {categories.map((category) => (
        <Link
          key={category.title}
          href={category.href}
          className="flex items-start gap-2 md:gap-4 p-3 md:p-4 rounded-lg bg-card hover:bg-accent transition-colors"
        >
          <div className="p-1.5 md:p-2 bg-primary/10 rounded-md text-primary">{iconMap[category.icon]}</div>
          <div>
            <h3 className="font-medium text-sm md:text-base md:font-bold">{category.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

