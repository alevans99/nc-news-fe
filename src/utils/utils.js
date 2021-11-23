export const dateFormatter = (date) => {
  const dateObject = new Date(date);
  return dateObject.toDateString();
};

export const capitaliseString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
