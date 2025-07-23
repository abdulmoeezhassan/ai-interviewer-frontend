export const getYears = (start = 1980, end = new Date().getFullYear()) => {
  const years = [];
  for (let i = end; i >= start; i--) {
    years.push(i);
  }
  return years;
};