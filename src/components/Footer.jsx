import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { getCurrentUserDetail } from "../auth";
const user = getCurrentUserDetail();
const Footer = () => (
  <MDBFooter
    bgColor="dark"
    className="text-center text-lg-start text-muted"
    style={{
      marginTop: "2rem",
    }}
  >
    <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
      <div className="me-5 d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
      </div>

      <div>
        <Link to="#" className="me-4 text-reset">
          <MDBIcon color="secondary" fab icon="facebook-f" />
        </Link>
        <Link to="#" className="me-4 text-reset">
          <MDBIcon color="secondary" fab icon="twitter" />
        </Link>
        <Link to="#" className="me-4 text-reset">
          <MDBIcon color="secondary" fab icon="google" />
        </Link>
        <Link to="#" className="me-4 text-reset">
          <MDBIcon color="secondary" fab icon="instagram" />
        </Link>
        <Link to="#" className="me-4 text-reset">
          <MDBIcon color="secondary" fab icon="linkedin" />
        </Link>
        <Link to="#" className="me-4 text-reset">
          <MDBIcon color="secondary" fab icon="github" />
        </Link>
      </div>
    </section>

    <section className="">
      <MDBContainer className="text-center text-md-start mt-5">
        <MDBRow className="mt-3">
          <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              <MDBIcon color="secondary" icon="gem" className="me-3" />
              PlainPost
            </h6>
            <p>Clear Thoughts, Simple Words - PlainPost.</p>
          </MDBCol>

          {/* <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Products</h6>
            <p>
              <Link to="#" className="text-reset">
                Angular
              </Link>
            </p>
            <p>
              <Link to="#" className="text-reset">
                React
              </Link>
            </p>
            <p>
              <Link to="#" className="text-reset">
                Vue
              </Link>
            </p>
            <p>
              <Link to="#" className="text-reset">
                Laravel
              </Link>
            </p>
          </MDBCol> */}

          <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
            <p>
              <Link to="/user/dashboard" className="text-reset">
                Write Blog
              </Link>
            </p>
            <p>
              <Link to="/" className="text-reset">
                Recent Blogs
              </Link>
            </p>
            <p>
              <Link
                to={user && `/user/Profile-info/${user.id}`}
                className="text-reset"
              >
                Profile
              </Link>
            </p>
            <p>
              <Link to="/About" className="text-reset">
                About
              </Link>
            </p>
          </MDBCol>

          <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              <MDBIcon color="secondary" icon="home" className="me-2" />
              Mumbai, MH 421302, IND
            </p>
            <p>
              <MDBIcon color="secondary" icon="envelope" className="me-3" />
              manishdevlikar@gmail.com
            </p>
            {/*
            <p>
              <MDBIcon color="secondary" icon="phone" className="me-3" /> + 01
              234 567 88
            </p>
             <p>
              <MDBIcon color="secondary" icon="print" className="me-3" /> + 01
              234 567 89
            </p> */}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    <div
      className="text-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      © {new Date().getFullYear()} Copyright:
      <Link
        target="_blank"
        className="text-reset fw-bold"
        to="https://github.com/ManishDevlikar/"
      >
        Manish Devlikar
      </Link>
    </div>
  </MDBFooter>
);

export default Footer;
