'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ItemCard({ title, description, image, link, stats }) {
  return (
    <div className="relative flex flex-col h-full group rounded-lg border p-4 hover:border-foreground/50 transition-colors">
      <div className="flex flex-col gap-3 h-full">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {stats && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="flex items-center gap-1 text-xs">
                  <span className="text-muted-foreground capitalize">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          )}

          <Link href={link} className="w-full">
            <Button 
              className="w-full h-8 mt-1" 
              variant="secondary"
              size="sm"
            >
              Подробнее
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 