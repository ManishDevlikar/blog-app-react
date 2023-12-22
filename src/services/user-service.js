import { myAxios } from "./helper";

export const signUp = (user) => {
  return myAxios.post("/api/auth/register", user).then((res) => res.data);
};

export const loginUser = (loginDetails) => {
    return myAxios.post('/api/auth/login',loginDetails).then((res)=>res.data)
}