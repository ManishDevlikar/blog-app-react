import { myAxios } from "./helper";
export const loadAllCategories = () => {
  return myAxios.get("/api/category/").then((res) => res.data);
};
