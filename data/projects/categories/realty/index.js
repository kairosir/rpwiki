// Общие данные о недвижимости для всех проектов
const realtyCommon = {
  info: {
    title: "Недвижимость",
    description: "Полный каталог недвижимости, доступной в проекте. Квартиры, дома, гаражи и другие объекты недвижимости."
  },
  types: [
    { id: "all", name: "Вся недвижимость", icon: "Building" },
    { id: "apartment", name: "Квартиры", icon: "Home" },
    { id: "house", name: "Дома", icon: "Warehouse" },
    { id: "garage", name: "Гаражи", icon: "Car" },
    { id: "business", name: "Бизнес-недвижимость", icon: "Store" }
  ]
};

export default realtyCommon; 