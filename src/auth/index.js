//is logged in
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data == null) {
    return false;
  } else {
    return true;
  }
};

//do login
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// do logged out

export const doLoggedOut = (next) => {
  localStorage.removeItem("data");
  next();
};

// get current user

export const getCurrentUserDetail = () => {
  if (isLoggedIn) {
    return JSON.parse(localStorage.getItem("data"))?.user;
  } else {
    return undefined;
  }
};

export const getToken = () => {
  if (isLoggedIn()) {
    // console.log(JSON.parse(localStorage.getItem("data"))?.token);
    return JSON.parse(localStorage.getItem("data"))?.token;
  } else {
    return null;
  }
};
