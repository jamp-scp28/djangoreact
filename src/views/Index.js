/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../variables/charts.js";
import {LoadSpinner, BorderSpinner} from '../components/Spinners';
import { FaPoll, FaFileInvoiceDollar, FaFire, FaMapMarkedAlt, 
  FaTasks, FaChartBar, FaChartPie, FaChartLine } from 'react-icons/fa'
import QueryService from '../services/QueryService';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Header from "../components/Headers/Header.js";
import * as moment from 'moment';
import { Component } from "react";

//declare const
const queryservice = new QueryService()
const nameapp = 'Header'
const MySwal = withReactContent(Swal)

//initi the class module
export default class Index extends Component {
  constructor(props){
    
    super(props);

    this.state = {
      //state for logic
      list: [],
      average: 0,
      totQuanty: 0,
      hotLocation: undefined,
      coord: '',
      rating: 0,
      show: false,
      error: '',
      sidebar: false,
      loading: false,
      //state for view
      activeNav: 1,
      chartExample1Data: "data1"
    };
    this.findAvg = this.findAvg.bind(this)
    // this.handleSideBarToggle = this.handleSideBarToggle.bind(this)

    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  //get the data from the query
  async componentDidMount() {

    // const apiUrl = 'https://jsonplaceholder.typicode.com/posts/';
    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => console.log('This is your data', data));

    //const {coord, hotLocation} = this.state

    console.log("CARGANDO")
    this.setState({ loading: true })
    await queryservice.getProducts()
      .then( result => {

          //console.log(result.data, 'result con axios')
          this.setState({list: result.data})
          console.log(this.state.products, 'prduct state con axios')          
      })
      .catch(error => {
          //console.log(error, 'Error Structure')
          this.setState({ error: error });
      })
    

    //      this.setState({loading: false});
      const {list} = this.state
      this.findAvg(list)
      //console.log(list)
        //console.log("LISTO")
        //console.log(coord, "COORDENADAS")

  }

findAvg(arr){
  if(arr.length === 0){
    this.setState({ loading: false })
    return
    
  }
  this.setState({ loading: true })
  //let value;
  //console.log(arr, 'ARREGLO dE  NTRADA PARa PRoMEDIO')
  let acum = 0;
  let quanty = 0;
  let most = []
  for (let value of arr) {
    acum += value['price']
    quanty += value['quantity']
    most.push(value['location'])
  //  console.log(value['price'], 'valores para promediar' )
  //  console.log(acum, 'acumulado' )
  }
  let  prom = (acum / this.state.list.length).toFixed(0)

  // formula for most frequent value .---->
  let counts = most.reduce((a, c) => {
      a[c] = (a[c] || 0) + 1;
      return a;
  }, {});

  let maxCount = Math.max(...Object.values(counts));
  let mostFrequent = Object.keys(counts).filter(k => counts[k] === maxCount);

//console.log(mostFrequent, 'MAS FREQUENTE');
//console.log(prom, 'promedio')
  this.setState({
    hotLocation: mostFrequent,
    average: prom,
    totQuanty: quanty,      
    loading: false 
  })


}


  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  render() {
    const { hotLocation, list, average, totQuanty,  loading, coord } = this.state
    console.log(list,'data')

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
        
        
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="card-body">
                      
                      <h4 className="display-6">
                          
                          { loading ?
                            <LoadSpinner/>
                            :
                            list.length === 0 ? 
                            <p>No Data</p>
                            :
                            list.length
                          }
                      
                        <FaPoll size="1.5em" className="ml-5"/>

                      </h4>
                       <p >Total Products</p>
                    </div>

                    <div className="card-body">
                      
                      <h4 className="display-6">
                        
                        {loading ?
                        
                        <LoadSpinner/>
                        :
                          
                          average === 0 ? 
                        
                          <p>No data</p>
                        :
                            average
                        }
                      
                      <FaFileInvoiceDollar size="1.5em" className="ml-5"/>

                      </h4>
                      <p >Average Price</p>
                    
                    </div>

                    {/* <Table className="table-borderless table-hover table-striped text-center m-4">
                      <thead>
                        <tr className="bg-dark text-white">
                          <th>Product</th>
                          <th>Last Activity</th>
                        </tr>
                      </thead>
                      
                      <tbody >
                        {list.map((products, key) =>
                          <tr key={key}>
                          <td>{products.name}</td>
                          <td>{moment(products.date_activity, moment.ISO_8601).fromNow()}</td>
                        </tr>
                        )}
                      </tbody>
                    </Table> */}


                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Total orders</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Page visits</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Page name</th>
                      <th scope="col">Visitors</th>
                      <th scope="col">Unique users</th>
                      <th scope="col">Bounce rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">/argon/</th>
                      <td>4,569</td>
                      <td>340</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/index.html</th>
                      <td>3,985</td>
                      <td>319</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/charts.html</th>
                      <td>3,513</td>
                      <td>294</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        36,49%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/tables.html</th>
                      <td>2,050</td>
                      <td>147</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        50,87%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/profile.html</th>
                      <td>1,795</td>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

