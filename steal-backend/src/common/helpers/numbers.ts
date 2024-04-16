export const formartNumber = (number: number) =>
  new Intl.NumberFormat('vi-VN').format(number);

export const formatDate = (date: string | Date) => {
  let d;

  if (typeof date === 'string') {
    d = new Date(date);
  } else {
    d = date;
  }

  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};
