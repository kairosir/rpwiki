'use client'

import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileMenu({ trigger }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
        <div className="flex flex-col h-full">
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Меню</h2>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </div>
          </div>
          <nav className="flex-1 overflow-auto">
            <div className="flex flex-col p-4 space-y-3">
              <Link 
                href="/monitoring" 
                className="text-sm hover:text-primary transition-colors py-2"
              >
                Мониторинг
              </Link>
              <Link 
                href="/guides" 
                className="text-sm hover:text-primary transition-colors py-2"
              >
                Гайды
              </Link>
              <Link 
                href="/news" 
                className="text-sm hover:text-primary transition-colors py-2"
              >
                Новости
              </Link>
              <Link 
                href="/community" 
                className="text-sm hover:text-primary transition-colors py-2"
              >
                Сообщество
              </Link>
              <Link 
                href="/support" 
                className="text-sm hover:text-primary transition-colors py-2"
              >
                Поддержка
              </Link>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
} 