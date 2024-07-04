import Cookies from 'js-cookie';

const checkCookie = () => {
  const cookie = Cookies.get();
  console.log('cookie:', cookie);
  if (cookie) {
    return true;
  }
  return false;
};

export default checkCookie;
