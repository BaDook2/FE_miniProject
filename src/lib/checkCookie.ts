const checkCookie = () => {
  const { cookie } = document;
  if (cookie) {
    return true;
  }
  return false;
};

export default checkCookie;
