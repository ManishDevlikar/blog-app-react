import { useEffect, useState } from "react";
import { deletePostById, getAllPost } from "../services/post-service";
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
import InfiniteScroll from "react-infinite-scroll-component";
function NewFeed() {
  const [currentPage, setCurrentPage] = useState(0);
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
    changePage(currentPage);
  }, [currentPage]);

  const deletePost = (post) => {
    deletePostById(post.postId)
      .then((res) => {
        console.log(res);
        toast.success("post deleted successfully");
 let newPostContent =postContent.content.filter(p=>p.postId!=post.postId)
        setPostContent({ ...postContent, content: newPostContent });
      })
      .catch((err) => {
        console.log(err);
        toast.error("error in deleting post");
      });
  };

  const changePage = (pageNo = 0, pageSize = 5) => {
    if (pageNo > postContent.pageNo && postContent.lastPage) {
      return;
    }
    if (pageNo < postContent.pageNo && postContent.pageNo == 0) {
      return;
    }
    getAllPost(pageNo, pageSize)
      .then((res) => {
        setPostContent({
          content: [...postContent.content, ...res.content],
          totalPages: res.totalPages,
          totalElements: res.totalElements,
          pageSize: res.pageSize,
          lastPage: res.lastPage,
          pageNo: res.pageNo,
        });
        // window.scroll(0, 0);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong");
      });
  };

  const changePageInfinite = () => {
    console.log("changed");
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ size: 12 }}>
          <h3>Blogs Count({postContent?.totalElements})</h3>

          <InfiniteScroll
            dataLength={postContent?.content.length}
            next={changePageInfinite}
            hasMore={!postContent.lastPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>You Have Seen It All</b>
              </p>
            }
          >
            {postContent?.content?.map((post) => (
              <Post deletePost={deletePost} key={post.postId} post={post} />
            ))}
          </InfiniteScroll>

          {/* <Container className="mt-2">
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
          </Container> */}
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
