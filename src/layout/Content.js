import React, { Component } from "react";
import FormLogin from "../components/FormLogin";
import { Redirect, withRouter } from "react-router-dom";
import { Alert, Tab, CardImg, Nav, Button, Card } from "react-bootstrap";
import axios from "axios";
import { FaKey, FaUserPlus } from "react-icons/fa";
//const queryservice = new QueryService();
import {
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const loginurl = "api-token-auth/";
const registerurl = "api-register/";
const title = "Login";

const stylepage = {
  padding: "10px",
  margin: "80px 0",
  background: "black",
  height: "50%",
  width: "100%",
  maxWidth: "350px",
  border: "0",
};

const stylebutton = {
  marginTop: "10px",
  background: "linear-gradient(to left,#000000, #434343)",
  width: "50%",
  alignItems: "center",
};

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      username: "",
      password: "",
      message: "",
      tab: "login",
    };
    this.handleLoginReg = this.handleLoginReg.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleLoginReg(event) {
    const { username, password, message, tab } = this.state;
    let currenturl = "";
    if (tab === "login") {
      currenturl = loginurl;
    }
    if (tab === "register") {
      currenturl = registerurl;
    }

    if (!(username && password)) {
      const displaymsg = (
        <Alert variant="warning">Please fill all fields</Alert>
      );
      this.setState({ message: displaymsg });
      //console.log('inavlidoregresa')
      return;
    }
    //console.log('pasa ahora')
    await axios({
      method: "post",
      url: currenturl,
      data: {
        username: username,
        password: password,
      },
    })
      .then((result) => {
        // console.log(result, 'LOGIN EXITOSO RECIBE TOKEN')
        //this.setState({ logged: true})

        if (tab === "login") {
          sessionStorage.setItem("tkaccess", result.data.access);
          sessionStorage.setItem("tkrefresh", result.data.refresh);
          sessionStorage.setItem("user", username);
          this.props.history.push("/user/Hrecords");
        }

        if (tab === "register") {
          const displaymsg = (
            <Alert variant="success">Register Success!!</Alert>
          );
          this.setState({ message: displaymsg });
        }
      })

      .catch((error) => {
        //console.log(error, error.request.response, 'Login Error')
        let displaymsg;

        if (error.response) {
          //console.log(error, error.request.response, 'error respuesta')
          if (tab === "login") {
            displaymsg = <Alert variant="danger">Login Failed</Alert>;
          }

          if (tab === "register") {
            displaymsg = <Alert variant="danger">{error.message}</Alert>;
          }
        } else if (error.request) {
          //console.log(error, error.request.response, 'error peticion')
          displaymsg = <Alert variant="danger">{error.message}</Alert>;
        } else {
          //console.log(error, error.request.response, 'error otros')
          displaymsg = <Alert variant="danger">{error.message}</Alert>;
        }

        this.props.history.push("/login");
        this.setState({ message: displaymsg });
      });
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    //console.log(this.state)
  }

  render() {
    const { validated, message } = this.state;
    return (
      <>
        <div className="mt-10 row border-info text-center justify-content-sm-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0 mt-10">
              <CardHeader className="bg-transparent pb-1">
                {/* <div className="text-muted text-center mb-1">
                  <small>Sign In</small>
                </div> */}
                <Card.Header>{message}</Card.Header>
                {/* <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      // src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      // src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div> */}
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Sign in with credentials</small>
                </div>
                <FormLogin
                  controlId={"LoginPassword"}
                  validated={validated}
                  name={"username"}
                  username={this.state.username}
                  password={this.state.password}
                  namepassword={"password"}
                  handleChange={this.handleChange}
                />
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={this.handleLoginReg}
                >
                  Sign in
                </Button>

                {/* <Form role="form">
                
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button">
                    Sign in
                  </Button>
                </div>
              </Form> */}
              </CardBody>
            </Card>
            {/* <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row> */}
          </Col>

          {/* <Card bg="transparent" text="white" style={stylepage} className="justify-content">
            <Card.Body>
              <CardImg variant="top"
                src={require('./img/site/logo_transparent.png')}
                width="250"
                height="300"
                alt="React Bootstrap logo"
              />
            </Card.Body>
          </Card>
          <Card text="white" 
                style={{...stylepage, 
                        background: 'linear-gradient(to left,#000000, #434343)',
                      }} 
                className="justify-content ">
            <Card.Header>
                {message}
            </Card.Header>
            <Card.Body>
              <Tab.Container id="controlled-tab-example"
                  activeKey={this.state.tab}
                  onSelect={tab => this.setState({ tab })}>
                 <Row style={{
                    margin: '5px',
                    color: 'white',
                    background: 'linear-gradient(to top, #4b6cb7, #182848)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.5s'
                  }}>
                    <Nav.Item style={{width: '50%'}}>
                      <Nav.Link eventKey="login" title="Login" active="true">Login</Nav.Link>
                      
                    </Nav.Item>
                    <Nav.Item style={{width: '50%'}}>
                      <Nav.Link eventKey="register" title="Register" >Register</Nav.Link>
                    </Nav.Item>
                  </Row>
                  <Tab.Content>
                    <Tab.Pane eventKey="login" className="md-4 mt-4">
                      <FormLogin
                        controlId={"LoginPassword"}
                        validated={validated}
                        name={'username'}
                        username={this.state.username}
                        password={this.state.password}
                        namepassword={'password'}
                        handleChange={this.handleChange}
                        
                      />
                      <Button 
                          style={stylebutton}  
                          onClick={this.handleLoginReg} 
                        
                        >
                        
                        <FaKey size="2em" className="mr-3"/>
                        Login
                      </Button>


                    </Tab.Pane>
                    <Tab.Pane eventKey="register" className="md-4 mt-4">
                      <FormLogin
                        controlId={"registerUser"}
                        validated={validated}
                        name={'username'}
                        username={this.state.username}
                        password={this.state.password}
                        namepassword={'password'}                        
                        handleChange={this.handleChange}
                        
                      />
                      <Button 
                        style={stylebutton}
                        onClick={this.handleLoginReg} 
                        
                        >
                        <FaUserPlus size="2em" className="mr-3"/>
                        Register
        
                      </Button>
                    </Tab.Pane>
                  </Tab.Content>
                  
                </Tab.Container>
              </Card.Body>
            </Card> */}
        </div>
      </>
    );
  }
}
export default withRouter(Content);
