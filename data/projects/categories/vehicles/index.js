// Данные о транспорте, общие для всех проектов
const vehiclesCommon = {
  info: {
    title: "Транспорт",
    description: "Полный каталог транспортных средств, доступных в проекте. Выбирайте из множества автомобилей, мотоциклов, лодок и самолетов."
  },
  types: [
    { id: "all", name: "Все", icon: "Car" },
    { id: "car", name: "Автомобили", icon: "Car" },
    { id: "bike", name: "Мотоциклы", icon: "Bike" },
    { id: "truck", name: "Грузовики", icon: "Truck" },
    { id: "boat", name: "Лодки", icon: "Ship" },
    { id: "plane", name: "Авиация", icon: "Plane" }
  ]
};

// Экспортируем данные
export default vehiclesCommon; 