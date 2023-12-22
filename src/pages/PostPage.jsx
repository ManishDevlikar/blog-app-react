import { Link, useParams } from "react-router-dom";
import Base from "../components/Base";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import { useEffect, useState } from "react";
import { getPostById } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { createComment } from "../services/comment-service";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
function PostPage() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({ content: "" });
  const [user, setUser] = useState(undefined);
  const { postId } = useParams();
  useEffect(() => {
    // load post from db
    setUser(getCurrentUserDetail());
    getPostById(postId)
      .then((res) => {
        setPost(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("error in loading");
      });
  }, []);

  console.log(post);
  const submitPost = () => {
    if (isLoggedIn() === false && user === undefined) {
      toast.error("logged in first");
      return;
    }
    if (comment.content.trim() === "") {
      toast.error("empty comment not allowed");
      return;
    }
    createComment(comment, postId, user?.id)
      .then((res) => {
        setPost({ ...post, comments: [...post.comments, res] });
        setComment({ content: "" });
        toast.success("comment added");
        console.log(comment);
      })
      .catch((err) => {
        toast.error("error");
        console.log(err);
      });
  };
  return (
    <Base>
      <Container className="mt-4">
        <Link to={"/"}>Home</Link>/{post && <Link to="">{post.title}</Link>}
        <Row>
          <Col
            md={{
              size: 12,
            }}
          >
            <Card className=" mt-3 shadow-sm border-0">
              <CardBody>
                <CardText className="text-end mb-0">
                  Posted By <b>{post?.user?.name}</b> on{" "}
                  {new Date(post?.addedDate).toDateString()}
                </CardText>
                <CardText className="text-end">
                  <span className=" text-muted">
                    {post?.category?.categoryTitle}
                  </span>
                </CardText>
                <div
                  className="divider"
                  style={{
                    width: "100%",
                    height: "1px",
                    background: "#e2e2e2",
                  }}
                ></div>
                <CardText className="mt-2">
                  <h3 style={{ fontSize: "2rem" }}> {post?.title}</h3>
                </CardText>
                <div
                  className="image-container mt-3 container "
                  style={{ maxWidth: "50%" }}
                >
                  <img
                    className="img-fluid rounded"
                    src={BASE_URL + `/api/post/image/` + post?.imageName}
                    alt=""
                  />
                </div>
                <CardText
                  className="mt-3"
                  dangerouslySetInnerHTML={{ __html: post?.content }}
                ></CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={{ size: 9, offset: 1 }}>
            <h3>Comments ({post ? post?.comments.length : "0"})</h3>
            {post &&
              post?.comments.map((comm, key) => (
                <Card key={key} className="mt-2 border-0 shadow-sm">
                  <CardBody>
                    <CardText>{comm.content}</CardText>
                  </CardBody>
                </Card>
              ))}
            <Card className="mt-2 border-0 shadow-sm">
              <CardBody>
                <Input
                  type="textarea"
                  placeholder="Enter comment here"
                  value={comment.content}
                  onChange={(e) => setComment({ content: e.target.value })}
                />
                <Button onClick={submitPost} color="primary" className="mt-2 ">
                  submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default PostPage;
