import { useEffect, useState } from "react";
import { getAllPost } from "../services/post-service";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
function NewFeed() {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNo: "",
  });
  useEffect(() => {
    // getAllPost(0, 5)
    //   .then((res) => {
    //     setPostContent(res);
    //   })
    //   .catch((err) => {
    //     console.log("Error: ", err);
    //   });
    changePage(0);
  }, []);
  // console.log(postContent);

  const changePage = (pageNo = 0, pageSize = 5) => {
    if (pageNo > postContent.pageNo && postContent.lastPage) {
      return;
    }
    if (pageNo < postContent.pageNo && postContent.pageNo == 0) {
      return;
    }
    getAllPost(pageNo, pageSize)
      .then((res) => {
        setPostContent(res);
        window.scroll(0, 0);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong");
      });
  };
  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <h1>Blogs Count({postContent?.totalElements})</h1>

          {postContent?.content?.map((post) => (
            <Post key={post.postId} post={post} />
          ))}

          <Container className="mt-2">
            <Pagination size="md">
              <PaginationItem
                onClick={() => changePage(postContent.pageNo - 1)}
                disabled={postContent.pageNo == 0}
              >
                <PaginationLink previous>previous</PaginationLink>
              </PaginationItem>
              {[...Array(postContent?.totalPages)].map(
                (item, index) => (
                  item,
                  (
                    <PaginationItem
                      active={postContent.pageNo == index}
                      key={index}
                      onClick={() => changePage(index)}
                    >
                      <PaginationLink>{index + 1}</PaginationLink>
                    </PaginationItem>
                  )
                )
              )}
              <PaginationItem
                onClick={() => changePage(postContent.pageNo + 1)}
                disabled={postContent.lastPage == true}
              >
                <PaginationLink next>next</PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
