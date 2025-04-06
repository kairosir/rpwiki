"use client"

import { useState, useEffect } from "react"
import { ServerCounter } from "@/components/server-counter"
import { AdBanner } from "@/components/ad-banner"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServersByGameType } from "@/components/servers-by-game-type"
import applyFilters from "@/utils/applyFilters"

export default function ServersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [servers, setServers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Удаляю демо-данные серверов и заменяю их пустым массивом
    const servers = [];
    setServers(servers)
    setLoading(false)
  }, [])

  const filteredServers = applyFilters(servers, { gameType: activeTab === "all" ? "" : activeTab, searchQuery })

  const getServersByGameType = (gameType) => {
    return servers.filter((server) => server.gameType === gameType)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Онлайн серверов</h1>

      {/* Счетчики онлайна */}
      <ServerCounter />

      {/* Рекламный баннер */}
      <AdBanner
        id="servers-top-banner"
        position="header"
        imageUrl="/placeholder.svg?height=90&width=728"
        targetUrl="https://example.com/ad-servers"
        altText="Реклама игровых серверов"
        backgroundColor="#f5f5f5"
      />

      {/* Табы для фильтрации */}
      <div className="my-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex md:flex-row gap-2">
            <TabsTrigger value="all">Все серверы</TabsTrigger>
            <TabsTrigger value="samp">SAMP</TabsTrigger>
            <TabsTrigger value="crmp">CRMP</TabsTrigger>
            <TabsTrigger value="gta5">GTA 5</TabsTrigger>
            <TabsTrigger value="mta">MTA Province</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {activeTab === "all" ? (
            <div className="space-y-8">
              {/* SAMP серверы */}
              <ServersByGameType title="SAMP" servers={getServersByGameType("samp")} />

              {/* CRMP серверы */}
              <ServersByGameType title="CRMP" servers={getServersByGameType("crmp")} />

              {/* GTA 5 серверы */}
              <ServersByGameType title="GTA 5" servers={getServersByGameType("gta5")} />

              {/* MTA Province серверы */}
              <ServersByGameType title="MTA Province" servers={getServersByGameType("mta")} />
            </div>
          ) : (
            <ServersByGameType title={activeTab.toUpperCase()} servers={filteredServers} showTitle={false} />
          )}
        </>
      )}
    </div>
  )
}

