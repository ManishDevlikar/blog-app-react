import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from "../context/userContext";

function Post({
  post = { postId: 0, title: "default title", content: "default content" },
  deletePost,
}) {
  const userContexData = useContext(userContext);
  const [user, setUser] = useState([]);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, []);
  return (
    <Card className="border-0 shadow-sm mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.content.substring(0, 60) + ".....",
          }}
        />
        <div>
          <Link className="btn btn-secondary" to={`/posts/${post.postId}`}>
            Read More
          </Link>
          {userContexData.user.login ? (
            user.id == post.user?.id ? (
              <Button
                onClick={() => deletePost(post)}
                color="danger"
                className="ms-2"
              >
                Delete
              </Button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default Post;
