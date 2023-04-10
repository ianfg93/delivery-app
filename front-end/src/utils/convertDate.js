const convertDate = (obj) => {
  const LIMIT = 9;
  const date = obj.saleDate;
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + Number(1);
  const day = new Date(date).getDate();
  const finalMonth = +month > LIMIT ? month.toString() : `0${month}`;
  const finalDay = +day > LIMIT ? day.toString() : `0${day}`;
  const finalDate = `${finalDay}/${finalMonth}/${year}`;

  return finalDate;
};

export default convertDate;
