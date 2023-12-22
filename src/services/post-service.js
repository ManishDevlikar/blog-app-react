import { privateAxios } from "./helper";
import { myAxios } from "./helper";
export const createPost = (postData) => {
  console.log(postData);
  return privateAxios
    .post(
      `/api/user/${postData.userId}/category/${postData.categoryId}/post`,
      postData
    )
    .then((res) => res.data);
};

// api/user/1/category/1/post

// get all post

export const getAllPost = (pageNo, pageSize) => {
  return myAxios
    .get(
      `/api/posts?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=addedDate&sortDirc=des`
    )
    .then((res) => res.data);
};

// ?pageNo=0&pageSize=5

// load post based omn id

export const getPostById = (postId) => {
  return myAxios.get(`/api/posts/${postId}`).then((res) => res.data);
};
