export const dateFormatter = (date) => {
  const dateObject = new Date(date);
  return dateObject.toDateString();
};
