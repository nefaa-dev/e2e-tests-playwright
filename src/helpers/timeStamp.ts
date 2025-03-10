const date = new Date();

const currentDate =
  date.getDate() +
  "_" +
  (date.getMonth() + 1) +
  "_" +
  date.getFullYear() +
  "_" +
  date.getHours() +
  "_" +
  date.getMinutes() +
  "_" +
  date.getSeconds() +
  "_" +
  date.getMilliseconds();

export { currentDate };
