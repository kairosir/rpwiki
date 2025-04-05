"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"

export function Search({ placeholder = "Поиск информации на сайте..." }) {
  const [query, setQuery] = useState("")

  return (
    <div className="relative">
      <div className="relative flex items-center rounded-md bg-primary/10 px-4 py-2">
        <SearchIcon className="h-5 w-5 text-primary" />
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  )
}

