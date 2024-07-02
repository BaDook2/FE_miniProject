const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('ko-KR').format(number);
};
const formatPrice = (price: number) => {
  return `${price.toLocaleString('ko-KR')}원`;
};
export { formatNumber, formatPrice };
