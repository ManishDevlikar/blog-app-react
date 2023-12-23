import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CategorySideMenu() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    loadAllCategories()
      .then((res) => {
        setCategory([...res]);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="pt-5">
      <ListGroup>
        <ListGroupItem
          tag={Link}
          to="/"
          action={true}
          className="border-0 shadow-sm"
        >
          All Blogs
        </ListGroupItem>
        {category &&
          category.map((cat, index) => (
            <ListGroupItem
              tag={Link}
              to={"/categories/" + cat.categoryId}
              action={true}
              className="border-0 shadow-sm mt-1"
              key={index}
            >
              {cat.categoryTitle}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}

export default CategorySideMenu;
