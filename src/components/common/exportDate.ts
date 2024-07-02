const exportDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const todayToDate = `${today.getFullYear()}-${today.getMonth() < 9 ? '0' : ''}${today.getMonth() + 1}-${today.getDate() < 9 ? '0' : ''}${today.getDate()}`;
  const tommorrowToDate = `${tomorrow.getFullYear()}-${tomorrow.getMonth() < 9 ? '0' : ''}${tomorrow.getMonth() + 1}-${today.getDate() < 9 ? '0' : ''}${tomorrow.getDate()}`;
  return { todayToDate, tommorrowToDate };
};

export default exportDate;
