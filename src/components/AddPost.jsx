import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import JoditEditor from "jodit-react";
import { loadAllCategories } from "../services/category-service";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  createPost as addPost,
  uploadPostImage,
} from "../services/post-service";
import { getCurrentUserDetail } from "../auth";
function AddPost() {
  const [user, setUser] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const editor = useRef(null);
  //   const [content, setContent] = useState("");
  const [post, setPost] = useState({ title: "", content: "", categoryId: "" });

  // image uploading
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    // let fileList = e.target.files;
    // console.log(fileList[0]);
    if (
      e.target.files[0].type !== "image/png" &&
      e.target.files[0].type !== "image/jpeg"
    ) {
      toast.error("only png and jpeg format allowed default image is set");
      console.log(image);
      return;
    } else {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    setUser(getCurrentUserDetail());
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });
  }, []);

  const fieldChanged = (e) => {
    // console.log(e.target.value);
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const contentFieldChanged = (data) => {
    setPost({ ...post, content: data });
    // console.log(post);
  };

  const createPost = (e) => {
    e.preventDefault();
    if (post.title.trim() === "") {
      toast.error("enter valid title");
      return;
    }
    if (post.content.trim() === "") {
      toast.error("enter valid post content");
      return;
    }
    if (post.categoryId === "") {
      toast.error("select the category of the blog");
      return;
    }
    post["userId"] = user.id;
    addPost(post)
      .then((data) => {
        uploadPostImage(image, data.postId)
          .then((res) => {
            toast.success("image uploaded");
          })
          .catch((err) => {
            toast.error("image not uploaded");
            console.log(err);
          });
        toast.success("post created successfully");
        setPost({ title: "", content: "", categoryId: "" });
      })
      .catch((err) => [toast.error(err)]);
  };

  return (
    <div className="wrapper">
      {/* {JSON.stringify(post)} */}
      <Card className="shadow-sm mt-2">
        <CardBody>
          <h3>Whats on your mind</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Enter here"
                onChange={fieldChanged}
              ></Input>
            </div>
            <div className="my-3">
              <Label for="content">Post Content</Label>
              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={contentFieldChanged}
              />
            </div>

            {/* file uploading */}
            <div className="mt-3">
              <Label for="image">Select Post Image</Label>
              <Input type="file" id="image" onChange={handleFileChange} />
            </div>

            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="Enter here"
                name="categoryId"
                onChange={fieldChanged}
                defaultValue={0}
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
                Create Post
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
}

export default AddPost;
