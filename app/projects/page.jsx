import { ProjectCards } from "@/components/project-cards"
import { Search } from "@/components/search"
import { AdBanner } from "@/components/ad-banner"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Filter, Grid3X3, List } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Проекты</h1>
          <p className="text-muted-foreground">
            Выберите RP проект, чтобы получить доступ к полной информации, гайдам и ресурсам
          </p>
        </div>
        <div className="w-full md:w-64">
          <Search placeholder="Поиск по проектам..." />
        </div>
      </div>

      <AdBanner
        id="projects-top-banner"
        position="header"
        imageUrl="/placeholder.svg?height=90&width=728"
        targetUrl="https://example.com/ad-projects"
        altText="Реклама игровых проектов"
        backgroundColor="#f5f5f5"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="gta5">GTA 5</TabsTrigger>
            <TabsTrigger value="samp">SA:MP</TabsTrigger>
            <TabsTrigger value="mta">MTA</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
          <Button variant="ghost" size="icon">
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCards />
      </div>

      <div className="mt-12 bg-card rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Информация о проектах</h2>
        <p className="text-muted-foreground mb-4">
          На нашем портале собрана информация о самых популярных RP проектах в СНГ. Мы стараемся предоставить
          максимально полную и актуальную информацию о каждом проекте, включая описание механик, гайды, карты и многое
          другое.
        </p>
        <p className="text-muted-foreground">
          Если вы не нашли интересующий вас проект или заметили неточность в информации, пожалуйста, сообщите нам через
          форму обратной связи.
        </p>
      </div>
    </div>
  )
}

