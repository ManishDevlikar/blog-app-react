import { Container } from "reactstrap";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";
import { useEffect, useState } from "react";
import { getCurrentUserDetail, isLoggedIn } from "../../auth";
import { deletePostById, getPostsByUser } from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";
const UserDashboard = () => {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    if (isLoggedIn) {
      loadPostData();
    }
  }, []);

  function loadPostData() {
    getPostsByUser(getCurrentUserDetail()?.id)
      .then((res) => {
        setPost([...res]);
        console.log(posts);
      })
      .catch((err) => {
        console.log(err);
        toast.error("error while fetching post");
      });
  }

  // delete post
  const deletePost = (post) => {
    deletePostById(post.postId)
      .then((res) => {
        console.log(res);
        toast.success("post deleted successfully");
        const newPosts = posts.filter((p) => p.postId !== post.postId);
        setPost(newPosts);
      })
      .catch((err) => {
        console.log(err);
        toast.error("error in deleting post");
      });
  };
  return (
    <Base>
      <Container>
        <AddPost />
        <h3 className="mt-5">{`post count (${posts.length})`}</h3>
        {posts.map((post, index) => (
          <Post key={index} post={post} deletePost={deletePost}></Post>
        ))}
      </Container>
    </Base>
  );
};

export default UserDashboard;
