import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>ИП</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Иван Петров</p>
          <p className="text-sm text-muted-foreground">
            Добавил новую статью
          </p>
        </div>
        <div className="ml-auto font-medium">+1</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>АС</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Анна Сидорова</p>
          <p className="text-sm text-muted-foreground">
            Отредактировала гайд
          </p>
        </div>
        <div className="ml-auto font-medium">+1</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>МК</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Максим Козлов</p>
          <p className="text-sm text-muted-foreground">
            Обновил мониторинг
          </p>
        </div>
        <div className="ml-auto font-medium">+1</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>ЕВ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Елена Волкова</p>
          <p className="text-sm text-muted-foreground">
            Добавила новость
          </p>
        </div>
        <div className="ml-auto font-medium">+1</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>ДМ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Дмитрий Морозов</p>
          <p className="text-sm text-muted-foreground">
            Обновил профиль
          </p>
        </div>
        <div className="ml-auto font-medium">+1</div>
      </div>
    </div>
  )
} 