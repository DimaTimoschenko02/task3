export function getDates(str: string) {
  const res = str.match(/\d{2}(\D)\d{2}\1\d{4}/g) as Array<string>;
  return res ? res : [];
}
export function setCreateTime() {
  const date = new Date();
  let fullDate =
    date.getUTCMonth() + '-' + date.getUTCDay() + '-' + date.getUTCFullYear();
  return fullDate;
}
