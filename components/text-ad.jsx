import Link from "next/link"

export function TextAd({
  id,
  title,
  description,
  targetUrl,
  icon = null,
  backgroundColor = "transparent",
  textColor = "inherit",
}) {
  return (
    <Link href={targetUrl || "#"} target="_blank" className="block w-full" data-ad-id={id}>
      <div className="p-3 rounded-lg border hover:bg-accent/50 transition-colors" style={{ backgroundColor }}>
        <div className="flex items-start gap-3">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div style={{ color: textColor }}>
            <h4 className="font-medium text-sm">{title || "Рекламное объявление"}</h4>
            {description && <p className="text-xs mt-1">{description}</p>}
          </div>
        </div>
        <div className="text-right mt-1">
          <span className="text-[10px] text-muted-foreground">Реклама</span>
        </div>
      </div>
    </Link>
  )
}

