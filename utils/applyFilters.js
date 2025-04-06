const applyFilters = (data, filters) => {
  return data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true; // Пропускаем фильтры без значений
      return item[key]?.toString().toLowerCase().includes(value.toString().toLowerCase());
    });
  });
};

export default applyFilters;