/**
 * Утилита для динамической загрузки данных по категориям проектов
 */

/**
 * Загружает данные для указанной категории и проекта
 * @param {string} category - категория (vehicles, realty, biz и т.д.)
 * @param {string} projectId - идентификатор проекта
 * @returns {Promise<Object>} - данные категории для проекта
 */
export async function loadCategoryData(category, projectId) {
  try {
    // Динамический импорт данных для конкретного проекта и категории
    const dataModule = await import(`@/data/projects/categories/${category}/${projectId}.js`);
    return dataModule.default;
  } catch (error) {
    console.error(`Ошибка загрузки данных ${category} для проекта ${projectId}:`, error);
    return [];
  }
}

/**
 * Загружает общие данные для категории
 * @param {string} category - категория (vehicles, realty, biz и т.д.)
 * @returns {Promise<Object>} - общие данные категории
 */
export async function loadCategoryCommon(category) {
  try {
    // Динамический импорт общих данных категории
    const commonModule = await import(`@/data/projects/categories/${category}/index.js`);
    return commonModule.default;
  } catch (error) {
    console.error(`Ошибка загрузки общих данных для категории ${category}:`, error);
    return {
      info: {
        title: category.charAt(0).toUpperCase() + category.slice(1),
        description: `Информация о ${category}`
      },
      types: [{ id: "all", name: "Все", icon: "List" }]
    };
  }
}

/**
 * Загружает информацию о проекте
 * @param {string} projectId - идентификатор проекта
 * @returns {Promise<Object>} - данные проекта
 */
export async function loadProjectData(projectId) {
  try {
    const projectsModule = await import(`@/data/projects/index.js`);
    return projectsModule.default[projectId] || null;
  } catch (error) {
    console.error(`Ошибка загрузки данных проекта ${projectId}:`, error);
    return null;
  }
} 