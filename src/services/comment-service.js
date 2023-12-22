import { privateAxios } from "./helper";

export const createComment = (comment, postId, userId) => {
  return privateAxios
    .post(`/api/comment/${postId}/${userId}`, comment)
    .then((res) => res.data);
};
