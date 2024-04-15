export const getCategoriesFromString = (categories: string) => {
  return categories
    .slice(1, categories.length - 1)
    .split(',')
    .map((category) => category.trim());
};
