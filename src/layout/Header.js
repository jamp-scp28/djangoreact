import React from "react";
import { Nav, Navbar, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { Redirect, withRouter, Link } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";

const stylea = {
  position: "sticky",
};

const Header = (props) => {
  const user = sessionStorage.getItem("user");
  return (
    <Navbar
      style={{ paddingLeft: "50px" }}
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="mr-3 ml-3"
    >
      {/* <Navbar.Brand href="#home" className="ml-2">
        <img
          src={require("./img/site/logo_transparent.png")}
          width="35"
          height="35"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand> */}
      <Nav className="ml-2 mr-auto">
        <Link to="/">
          <h6 style={{ color: "white" }}>Home</h6>
        </Link>
      </Nav>
      <Nav>
        {sessionStorage.tkaccess ? (
          <DropdownButton
            alignRight
            title={user}
            id="dropdown-menu-align-right"
          >
            {/* <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item> */}
            <Dropdown.Divider />

            <Dropdown.Item
              onSelect={function () {
                props.alerts
                  .fire({
                    title: "Are you sure?",
                    text: "You Want logout??",
                    type: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Log out!",
                  })
                  .then((result) => {
                    if (result.value) {
                      props.alerts.fire(
                        "LoggedOut!",
                        "Your exited from the app.",
                        "info",
                        sessionStorage.removeItem("tkaccess"),
                        sessionStorage.removeItem("tkrefresh"),
                        sessionStorage.removeItem("user"),
                        props.history.push("/")
                      );
                    }
                  });
              }}
            >
              {" "}
              Logout
            </Dropdown.Item>
          </DropdownButton>
        ) : (
          <Button onClick={(e) => props.history.push("/login")}>login</Button>
        )}
      </Nav>
    </Navbar>
  );
};

export default withRouter(Header);
