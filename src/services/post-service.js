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

// upload post banner

export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);

  return privateAxios
    .post(`/api/post/image/upload/${postId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

export const getPostsByCategory = (categoryId) => {
  return privateAxios
    .get(`/api/category/${categoryId}/post`)
    .then((res) => res.data);
};

export const getPostsByUser = (userId) => {
  return privateAxios.get(`/api/user/${userId}/post`).then((res) => res.data);
};

// delete post

export const deletePostById = (postId) => {
  return privateAxios.delete(`/api/posts/${postId}`).then((res) => res.status);
};

// update post

export const updatePostById = (post, postId) => {
  console.log(post);
  return privateAxios.put(`/api/posts/${postId}`, post).then((res) => res.data);
};
