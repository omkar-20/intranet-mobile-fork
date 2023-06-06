const dateFormater = (date: Date) => {
  let textDate = '';

  textDate += `${date.getFullYear()}-`;

  textDate +=
    date.getMonth() < 9
      ? `0${date.getMonth() + 1}-`
      : `${date.getMonth() + 1}-`;

  textDate += date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

  return textDate;
};

export {dateFormater};
