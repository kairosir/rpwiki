"use client"

import { useState, useEffect, useRef } from "react"
import { SearchIcon, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { useDebounce } from "@/hooks/use-debounce"
import { cn } from "@/lib/utils"

// Временные данные для демонстрации, в реальном приложении будут заменены на данные из API
const searchableContent = {
  projects: {
    "majestic-rp": {
      name: "Majestic RP",
      sections: {
        guides: [
          { title: "Начало игры", content: "Гайд для новичков по началу игры", url: "/projects/majestic-rp/guides/start" },
          { title: "Бизнесы", content: "Все о бизнесах на сервере", url: "/projects/majestic-rp/guides/business" }
        ],
        vehicles: [
          { title: "Спортивные автомобили", content: "Каталог спортивных автомобилей", url: "/projects/majestic-rp/vehicles/sport" }
        ]
      }
    },
    "diamond-rp": {
      name: "Diamond RP",
      sections: {
        guides: [
          { title: "Система домов", content: "Гайд по покупке и содержанию домов", url: "/projects/diamond-rp/guides/houses" }
        ]
      }
    }
  }
}

export function GlobalSearch({ placeholder = "Поиск информации на сайте..." }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef(null)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const searchContent = async () => {
      if (debouncedQuery.length < 2) {
        setResults([])
        return
      }

      setIsLoading(true)
      
      // Имитация поиска по контенту
      // В реальном приложении здесь будет API запрос
      const searchResults = []
      
      Object.entries(searchableContent.projects).forEach(([projectId, project]) => {
        Object.entries(project.sections).forEach(([sectionType, items]) => {
          items.forEach(item => {
            if (
              item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
              item.content.toLowerCase().includes(debouncedQuery.toLowerCase())
            ) {
              searchResults.push({
                projectId,
                projectName: project.name,
                sectionType,
                ...item
              })
            }
          })
        })
      })

      setResults(searchResults)
      setIsLoading(false)
      setIsOpen(true)
    }

    searchContent()
  }, [debouncedQuery])

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative flex items-center rounded-md bg-primary/10 px-4 py-2">
        <SearchIcon className="h-5 w-5 text-primary" />
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("")
              setResults([])
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Выпадающие результаты поиска */}
      {isOpen && (query.length >= 2 || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[500px] overflow-auto rounded-md border bg-background shadow-md">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((result, index) => (
                <Link
                  key={index}
                  href={result.url}
                  className="block rounded-md p-3 hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{result.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {result.content}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {result.projectName}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="capitalize">{result.sectionType}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Ничего не найдено
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
} 