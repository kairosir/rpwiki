import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function DetailButton({ href }) {
  return (
    <Button variant="outline" size="sm" asChild>
      <Link href={href} className="flex items-center gap-1">
        <span>Подробнее</span>
        <ChevronRight className="h-4 w-4" />
      </Link>
    </Button>
  )
}

