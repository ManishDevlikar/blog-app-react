import { useRef, useContext, useState, useEffect } from "react";
import Base from "../components/Base";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../context/userContext";
import { getPostById, updatePostById } from "../services/post-service";
import { toast } from "react-toastify";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
function UpdateBlog() {
  const [categories, setCategories] = useState([]);
  const editor = useRef(null);
  const { postId } = useParams();
  const userContexData = useContext(userContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  useEffect(() => {
    getPostById(postId)
      .then((res) => {
        setPost({ ...res, categoryId: res.category.categoryId });
        console.log(res.category.categoryId);
      })
      .catch((err) => {
        console.log(err);
        toast.error("error in fetching post");
        navigate("/");
      });

    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });
  }, []);
  useEffect(() => {
    if (post) {
      if (post?.user?.id != userContexData?.user?.data?.id) {
        toast.error("not authorized");
        navigate("/");
      }
    }
  }, [post]);

  const handleChange = (e, field) => {
    setPost({ ...post, [field]: e.target.value });
  };

  const updateBlog = (e) => {
    e.preventDefault();

    updatePostById(
      { ...post, category: { categoryId: post.categoryId } },
      post.postId
    )
      .then(() => toast.success("updated successfully"))
      .catch(() => toast.error("error occure"));
  };

  const updatePost = () => {
    return (
      <div className="wrapper">
        <Card className="shadow-sm mt-2">
          <CardBody>
            <h3>Update Post</h3>
            <Form onSubmit={updateBlog}>
              <div className="my-3">
                <Label for="title">Post Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={post?.title}
                  placeholder="Enter here"
                  onChange={(event) => handleChange(event, "title")}
                ></Input>
              </div>
              <div className="my-3">
                <Label for="content">Post Content</Label>
                <JoditEditor
                  value={post.content}
                  ref={editor}
                  onChange={(newContent) =>
                    setPost({ ...post, content: newContent })
                  }
                />
              </div>

              {/* file uploading */}
              <div className="mt-3">
                <Label for="image">Select Post Image</Label>
                <Input type="file" id="image" onChange={""} />
              </div>

              <div className="my-3">
                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="category"
                  placeholder="Enter here"
                  name="categoryId"
                  value={post.categoryId}
                  onChange={(e) => handleChange(e, "categoryId")}
                >
                  <option disabled value={0}>
                    ---select category---
                  </option>
                  {categories.map((cate) => (
                    <option value={cate.categoryId} key={cate.categoryId}>
                      {cate.categoryTitle}
                    </option>
                  ))}
                </Input>
              </div>
              <Container className="text-center">
                <Button type="submit" color="primary">
                  update Post
                </Button>
                <Button color="danger" className="ms-2">
                  Reset Post
                </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  };

  return (
    <Base>
      <Container>{post && updatePost()}</Container>
    </Base>
  );
}

export default UpdateBlog;
