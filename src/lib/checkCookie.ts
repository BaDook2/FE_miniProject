const checkCookie = () => {
  const { cookie } = document;
  console.log('cookie:', cookie);
  if (cookie) {
    return true;
  }
  return false;
};

export default checkCookie;
