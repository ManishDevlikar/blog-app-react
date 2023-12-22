import CustomNavbar from "./CustomNavbar";

function Base({ title = "Welcome to my application", children }) {
  return (
    <div className="container-fluid m-0 p-0">
      <CustomNavbar />
      {children}
      <div>footer</div>
    </div>
  );
}

export default Base;
