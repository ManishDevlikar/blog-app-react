import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { doLoggedOut, getCurrentUserDetail, isLoggedIn } from "../auth";

function CustomNavbar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [login]);

  const navigate = useNavigate();
  const logout = () => {
    doLoggedOut(() => {
      setLogin(false);
      navigate("/");
    });
  };

  return (
    <div>
      <Navbar {...args} className="my-0" color="dark" expand="md" dark>
        <NavbarBrand to="/" tag={ReactLink}>
          MyBlog{" "}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink to="/" tag={ReactLink}>
                New Feed
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/About" tag={ReactLink}>
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/services" tag={ReactLink}>
                Services
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem to="/Services" tag={ReactLink}>
                  Contact Us
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Github</DropdownItem>
                <DropdownItem>Instagram</DropdownItem>
                <DropdownItem>LinkedIn</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/Profile-info">
                    profile info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    {user.email}
                  </NavLink>
                </NavItem>
              </>
            )}

            {!login && (
              <>
                <NavItem>
                  <NavLink to="/Login" tag={ReactLink}>
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/Signup" tag={ReactLink}>
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
