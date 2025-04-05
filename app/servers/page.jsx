"use client"

import { useState, useEffect } from "react"
import { ServerCounter } from "@/components/server-counter"
import { AdBanner } from "@/components/ad-banner"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServersByGameType } from "@/components/servers-by-game-type"

export default function ServersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [servers, setServers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    setTimeout(() => {
      const demoServers = [
        // SAMP серверы
        {
          id: 1,
          name: "Emerald",
          project: "Diamond RP",
          gameType: "samp",
          online: 1806,
          capacity: 2000,
          ip: "185.169.134.3",
          port: "7777",
        },
        {
          id: 2,
          name: "Sapphire",
          project: "Advance RP",
          gameType: "samp",
          online: 1170,
          capacity: 1500,
          ip: "185.169.134.4",
          port: "7777",
        },
        {
          id: 3,
          name: "Ruby",
          project: "Diamond RP",
          gameType: "samp",
          online: 1053,
          capacity: 1500,
          ip: "185.169.134.5",
          port: "7777",
        },
        {
          id: 4,
          name: "Topaz",
          project: "Advance RP",
          gameType: "samp",
          online: 987,
          capacity: 1200,
          ip: "185.169.134.6",
          port: "7777",
        },
        {
          id: 5,
          name: "Amethyst",
          project: "Diamond RP",
          gameType: "samp",
          online: 876,
          capacity: 1000,
          ip: "185.169.134.7",
          port: "7777",
        },

        // CRMP серверы
        {
          id: 6,
          name: "Phoenix",
          project: "Titan RP",
          gameType: "crmp",
          online: 543,
          capacity: 800,
          ip: "185.169.134.8",
          port: "7777",
        },
        {
          id: 7,
          name: "Dragon",
          project: "Titan RP",
          gameType: "crmp",
          online: 421,
          capacity: 600,
          ip: "185.169.134.9",
          port: "7777",
        },
        {
          id: 8,
          name: "Griffin",
          project: "Legend RP",
          gameType: "crmp",
          online: 387,
          capacity: 500,
          ip: "185.169.134.10",
          port: "7777",
        },

        // GTA5 серверы
        {
          id: 9,
          name: "Сиэтл",
          project: "Majestic RP",
          gameType: "gta5",
          online: 3130,
          capacity: 3500,
          ip: "connect.majestic-rp.com",
          port: "22005",
        },
        {
          id: 10,
          name: "Хьюстон",
          project: "Majestic RP",
          gameType: "gta5",
          online: 2231,
          capacity: 2500,
          ip: "connect.majestic-rp.com",
          port: "22006",
        },
        {
          id: 11,
          name: "Главный",
          project: "Eclipse RP",
          gameType: "gta5",
          online: 1192,
          capacity: 1500,
          ip: "connect.eclipse-rp.com",
          port: "22005",
        },
        {
          id: 12,
          name: "Второй",
          project: "Eclipse RP",
          gameType: "gta5",
          online: 1087,
          capacity: 1200,
          ip: "connect.eclipse-rp.com",
          port: "22006",
        },

        // MTA Province серверы
        {
          id: 13,
          name: "Province 1",
          project: "MTA Province",
          gameType: "mta",
          online: 876,
          capacity: 1000,
          ip: "mtaprovince.ru",
          port: "22005",
        },
        {
          id: 14,
          name: "Province 2",
          project: "MTA Province",
          gameType: "mta",
          online: 754,
          capacity: 1000,
          ip: "mtaprovince.ru",
          port: "22006",
        },
        {
          id: 15,
          name: "Province 3",
          project: "MTA Province",
          gameType: "mta",
          online: 621,
          capacity: 800,
          ip: "mtaprovince.ru",
          port: "22007",
        },
      ]

      setServers(demoServers)
      setLoading(false)
    }, 500)
  }, [])

  const filteredServers = activeTab === "all" ? servers : servers.filter((server) => server.gameType === activeTab)

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

