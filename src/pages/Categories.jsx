import { useEffect, useState } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";
import Post from "../components/Post";

import { deletePostById, getPostsByCategory } from "../services/post-service";
import { toast } from "react-toastify";

function Categories() {
  const { categoryId } = useParams();
  const [posts, setPost] = useState([]);
  useEffect(() => {
    getPostsByCategory(categoryId)
      .then((res) => {
        setPost([...res]);
        console.log(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryId]);

  const deletePost = (post) => {
    deletePostById(post.postId).then((res) => {
      console.log(res);
      toast.success("post deleted successfully");
      let newPosts = posts.filter((p) => p.postId !== post.postId);
      setPost(newPosts);
    });
  };

  return (
    <Base>
      <Container className="my-2">
        <Row>
          <Col md={2}>
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <h3>{`Blog Count (${posts.length})`}</h3>
            {posts &&
              posts.map((post, index) => (
                <Post deletePost={deletePost} key={index} post={post} />
              ))}
            {posts.length <= 0 ? <h3>No Post Found</h3> : ""}
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Categories;
