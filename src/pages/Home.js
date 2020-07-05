import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import CarouselHome from "../components/CarouselHome";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { PieChart, BarChart } from "../components/LineChart";
import { FaKey, FaLock, FaUser, FaWrench, FaGithub } from "react-icons/fa";
import {
  MdLibraryAdd,
  MdModeEdit,
  MdViewList,
  MdDeleteForever
} from "react-icons/md";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const nameapp = "Header";
const footermsg = (
  <div className="text-center">
    <FaGithub size="2em" />
    <a href="https://github.com/alenq1/reactango-api-crud">
      <p className="lead">GitHub Repo</p>
    </a>
  </div>
);
const style = {
  textAlign: "center"
};

const footerstyle = {};

const styleTextCarousel = {
  textShadow: "2px 2px #000000"
};
const carouselContent = [
  {
    title: <p style={{ ...styleTextCarousel }}>Reusable Components</p>,
    subtitle: (
      <p style={{ ...styleTextCarousel }}>Helps you to write quick code</p>
    ),
    image: require("../layout/img/site/work-864960_1920.jpg"),
    position: "up"
  },

  {
    title: (
      <p style={{ ...styleTextCarousel }}>App example for start learning</p>
    ),
    subtitle: (
      <p style={{ ...styleTextCarousel }}>Basic task for common web apps</p>
    ),
    image: require("../layout/img/site/office-dark.jpg"),
    position: "down"
  },

  {
    title: <p style={{ ...styleTextCarousel }}>Backend Integration</p>,
    subtitle: (
      <p style={{ ...styleTextCarousel }}>
        Handle data for backend to control how to display it
      </p>
    ),
    image: require("../layout/img/site/coding-924920_1920.jpg"),
    position: "down"
  }
];

const cardcontent = [
  {
    image: require("../layout/img/site/react.png"),
    title: "React app",
    text:
      "SPA made in react as Front-End, Using libaries like, axios, react-boostrap, leaflet, echarts, etc",
    url: "https://reactjs.org/"  
  },
  {
    image: require("../layout/img/site/drf.png"),
    title: "Django Rest Framework",
    text: "DRF as backend API with modelviewsets, serializers, routes.",
    url: "https://www.django-rest-framework.org/"
  },
  {
    image: require("../layout/img/site/docker.png"),
    title: "Docker",
    text: "For deploying both enviroments, and fast start develop ",
    url: "https://github.com/alenq1/react-django-dockerized"
  },
  {
    image: require("../layout/img/site/desk-2906792_1280.png"),
    title: "Customizable",
    text: "Build your own components or modify to expand functionalities",
    url: ""
  }
];

const dividercontent = [
  {
    image: require("../layout/img/site/no-image-available-icon-6.jpg"),
    title: "Login/Register actions.",
    title1: "Using JWT.",
    text:
      "Using JWT on the backend with access token, and refresh token adding a simple security layer"
  },

  {
    image: require("../layout/img/site/no-image-available-icon-6.jpg"),
    title: "Dashboard and Graphics",
    title1: "And visual stuffs",
    text: "Using bootstrap and other libaries for User Interface"
  },

  {
    image: require("../layout/img/site/no-image-available-icon-6.jpg"),
    title: "Crud Operations",
    title1: "All in one Single Page without Reloading",
    text:
      "Allow the most common actions for data manipulation (CRUD) in only one page"
  }
];

const minicarousel = [
  {
    title: "Create",
    subtitle: "",
    other: (
      <center>
        <MdLibraryAdd color="green" size="5em" />
      </center>
    )
  },

  {
    title: "Retrieve",
    subtitle: "",
    other: (
      <center>
        <MdViewList color="blue" size="5em" />
      </center>
    )
  },
  {
    title: "Update",
    subtitle: "",
    other: (
      <center>
        <MdModeEdit color="yellow" size="5em" />
      </center>
    )
  },
  {
    title: "Delete",
    subtitle: "",
    other: (
      <center>
        <MdDeleteForever color="red" size="5em" />
      </center>
    )
  }
];

const imagecode1 = require("../layout/img/site/code-coder-coding-270348.jpg");
const imagecode2 = require("../layout/img/site/codes-coding-communication-360591.jpg");

const stylesubs = {
  background: `linear-gradient(61deg, #000000 0%, rgba(0, 0, 
    0, .6) 70%),url(${imagecode1})`,
  backgroundSize: `cover`,
  backgroundPosition: `center`,
  height: "420px"
};

const stylesubs2 = {
  background: `linear-gradient(61deg, #000000 0%, rgba(0, 0, 
    0, .6) 70%),url(${imagecode2})`,
  backgroundSize: `cover`,
  backgroundPosition: `center`,
  height: "350px"
};

const Home = props => {
  return (
    <>
      <Header brand={nameapp} alerts={MySwal} />

      <CarouselHome
        content={carouselContent}
        stylecarousel={{
          height: "80vh",
          minHeight: "350px",
          background: "no-repeat center center scroll",
          WebkitBackgroundSize: "cover",
          MozBackgroundSize: "cover",
          obackgroundSize: "cover",
          backgroundSize: "cover"
        }}
      />

      <div className="container-fluid">
        {/* IMPORTANT CLASS DEFINITION FOR FIT PAGE -------> CONTAINER FLUID */}

        <h1
          className="m-5 text-center"
          style={{ textShadow: "2px 2px #000000" }}
        >
          Top Features
        </h1>

        <div className="row m-5">
          {cardcontent.map((content, index) => (
            <div className="col-lg-3 col-sm-6 mb-3 text-dark" key={index}>
              <div className="card h-100">
                <a href={content.url}>
                  <img className="card-img-top" src={content.image} alt="" />
                </a>
                <div className="card-body">
                  <h4 className="card-title">
                    <a href={content.url}>{content.title}</a>
                  </h4>
                  <p className="card-text">{content.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row" style={stylesubs}>
          <div className="col-md-4 col-sm-4 mt-5">
            <h2 className="featurette-heading">
              {dividercontent[0].title}{" "}
              <span className="text-muted">{dividercontent[0].title1}</span>
            </h2>
            <p className="lead">{dividercontent[0].text}</p>
          </div>

          <div className="col-md-4 col-sm-6 mt-5 ">
            <Card className="bg-transparent border-0">
              <div className="m-4 text-center">
                <h1>{<FaKey />}</h1>
                <p className="lead">Token keys with short expiration time</p>
              </div>
            </Card>
            <Card className="bg-transparent border-0">
              <div className="m-4 text-center">
                <h1>{<FaLock />}</h1>
                <p className="lead">Restrict access to anonymous user</p>
              </div>
            </Card>
          </div>
          <div className="col-md-4 col-sm-6 mt-5 flex-end">
            <Card className="bg-transparent border-0">
              <div className="m-4 text-center">
                <h1>{<FaUser />}</h1>
                <p className="lead">Basic & Simple login/logout process</p>
              </div>
            </Card>
            <Card className="bg-transparent  border-0">
              <div className="m-4 text-center">
                <h1>{<FaWrench />}</h1>
                <p className="lead">
                  Custom Additional options for auth process
                </p>
              </div>
            </Card>
          </div>
        </div>

        <div className="row featurette m-5">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading mt-5">
              {dividercontent[1].title}
              <span className="text-muted">{dividercontent[1].title1}</span>
            </h2>
            <p className="lead">{dividercontent[1].text}</p>
          </div>
          <div className="col-md-5 order-md-1">
            <PieChart />
          </div>
        </div>

        <div className="row featurette md-3" style={stylesubs2}>
          <div className="col-md-7">
            <h2 className="featurette-heading mt-5">
              {dividercontent[2].title}
              <span className="text-muted">{dividercontent[2].title1}</span>
            </h2>
            <p className="lead">{dividercontent[2].text}</p>
          </div>
          <div className="col-md-5 mt-5">
            <CarouselHome
              content={minicarousel}
              stylecarousel={{
                height: "250px"
              }}
            />
          </div>
        </div>
      </div>

      <Footer message={footermsg} />
    </>
  );
};
export default Home;
