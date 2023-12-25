import CustomNavbar from "./CustomNavbar";
import Footer from "./Footer";

function Base({ title = "Welcome to my application", children }) {
  return (
    <div className="container-fluid m-0 p-0">
      <CustomNavbar />
      {children}
      <Footer />
    </div>
  );
}

export default Base;
