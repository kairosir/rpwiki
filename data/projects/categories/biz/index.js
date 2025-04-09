// Общие данные о бизнесах для всех проектов
const bizCommon = {
  info: {
    title: "Бизнесы",
    description: "Полный список бизнесов, доступных в проекте. Магазины, заправки, рестораны и другие виды бизнеса."
  },
  types: [
    { id: "all", name: "Все бизнесы", icon: "Store" },
    { id: "shop", name: "Магазины", icon: "ShoppingCart" },
    { id: "gas", name: "Заправки", icon: "Fuel" },
    { id: "food", name: "Еда", icon: "Utensils" },
    { id: "entertainment", name: "Развлечения", icon: "Music" },
    { id: "service", name: "Услуги", icon: "Wrench" }
  ]
};

export default bizCommon; 