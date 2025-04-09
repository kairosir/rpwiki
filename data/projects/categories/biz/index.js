// Данные о бизнесах, общие для всех проектов
const businessesCommon = {
  info: {
    title: "Бизнесы",
    description: "Полный каталог доступных бизнесов на проекте. Выбирайте из различных типов: магазины, сервисы, развлечения и многое другое."
  },
  types: [
    { id: "all", name: "Все", icon: "Building" },
    { id: "shop", name: "Магазины", icon: "Store" },
    { id: "food", name: "Рестораны", icon: "Utensils" },
    { id: "service", name: "Сервисы", icon: "Wrench" },
    { id: "entertainment", name: "Развлечения", icon: "Music" },
    { id: "car_dealer", name: "Автосалоны", icon: "Car" }
  ]
};

export default businessesCommon; 