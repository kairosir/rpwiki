'use client'

import { ItemCard } from "@/components/ui/item-card"

export function ItemsGrid({ items, getItemProps }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          {...getItemProps(item)}
        />
      ))}
    </div>
  )
} 