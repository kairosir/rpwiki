"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function AdBanner({
  id,
  position = "default",
  imageUrl,
  targetUrl,
  altText = "Реклама",
  showCloseButton = false,
  backgroundColor = "transparent",
}) {
  const [isVisible, setIsVisible] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  // Проверяем, была ли реклама закрыта ранее
  useEffect(() => {
    const closedAds = JSON.parse(localStorage.getItem("closedAds") || "[]")
    if (closedAds.includes(id)) {
      setIsVisible(false)
    }
  }, [id])

  const handleClose = () => {
    setIsVisible(false)
    // Сохраняем ID закрытой рекламы в localStorage
    const closedAds = JSON.parse(localStorage.getItem("closedAds") || "[]")
    localStorage.setItem("closedAds", JSON.stringify([...closedAds, id]))
  }

  // Определяем классы в зависимости от позиции
  const getPositionClasses = () => {
    switch (position) {
      case "header":
        return "w-full h-[90px] mb-4"
      case "sidebar":
        return "w-full h-[250px] mb-4"
      case "footer":
        return "w-full h-[90px] mt-4"
      case "content":
        return "w-full h-[250px] my-4"
      case "popup":
        return "fixed bottom-4 right-4 w-[300px] h-[250px] z-50 shadow-lg"
      default:
        return "w-full h-[90px]"
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${getPositionClasses()}`}
      style={{ backgroundColor }}
      data-ad-id={id}
      data-ad-position={position}
    >
      <Link href={targetUrl || "#"} target="_blank" className="block w-full h-full">
        {imageUrl ? (
          <>
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={altText}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <span className="text-xs text-muted-foreground">Загрузка рекламы...</span>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-sm text-muted-foreground">Место для вашей рекламы</span>
          </div>
        )}
      </Link>

      <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1 rounded">Реклама</div>
    </div>
  )
}

