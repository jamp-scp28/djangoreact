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

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import LineChart, {
  CircleChart,
  RatingChart,
} from "../../components/LineChart";
import Chart from "chart.js";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";
import { LoadSpinner, BorderSpinner } from "../../components/Spinners";

import {
  FaPoll,
  FaFileInvoiceDollar,
  FaFire,
  FaMapMarkedAlt,
  FaTasks,
  FaChartBar,
  FaChartPie,
  FaChartLine,
} from "react-icons/fa";
import QueryService from "../../services/QueryService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//declare const
const queryservice = new QueryService();
const nameapp = "Header";
const MySwal = withReactContent(Swal);

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test_data: [],
      absence_data: [],
      list: [],
      test_list: [],
      abs_list: [],
      abs_list: 0,
      ais_abs: 0,
      oth_abs: 0,
      positive_test: 0,
      pending_test: 0,
      average: 0,
      totQuanty: 0,
      hotLocation: undefined,
      coord: "",
      rating: 0,
      show: false,
      error: "",
      sidebar: false,
      loading: false,
    };

    this.findAvg = this.findAvg.bind(this);
    this.getStatsTest = this.getStatsTest.bind(this);
    this.getStatsAbs = this.getStatsAbs.bind(this);
    this.handleSideBarToggle = this.handleSideBarToggle.bind(this);
  }

  async componentDidMount() {
    //const {coord, hotLocation} = this.state

    console.log("CARGANDO");
    this.setState({ loading: true });

    //Get absences data
    await queryservice
      .getAbsences()
      .then((result) => {
        //console.log(result.data, 'result con axios')
        this.setState({ abs_list: result.data });
        //console.log(this.state.products, 'prduct state con axios')
      })
      .catch((error) => {
        //console.log(error, 'Error Structure')
        this.setState({ error: error });
      });

    //Get length of test

    await queryservice
      .getHrecords()
      .then((result) => {
        //console.log(result.data, 'result con axios')
        this.setState({ test_list: result.data });
        //console.log(this.state.products, 'prduct state con axios')
      })
      .catch((error) => {
        //console.log(error, 'Error Structure')
        this.setState({ error: error });
      });

    // Get length of other things

    await queryservice
      .getProducts()
      .then((result) => {
        //console.log(result.data, 'result con axios')
        this.setState({ list: result.data });
        //console.log(this.state.products, 'prduct state con axios')
      })
      .catch((error) => {
        //console.log(error, 'Error Structure')
        this.setState({ error: error });
      });

    //      this.setState({loading: false});
    const { list } = this.state;
    this.findAvg(list);
    const { test_list } = this.state;
    this.getStatsTest(test_list);
    const { abs_list } = this.state;
    this.getStatsAbs(abs_list);
    //console.log("LISTO")
    //console.log(coord, "COORDENADAS")
  }

  getStatsAbs(list) {
    let aisl = 0;
    let others = 0;
    let imexhs = 0;
    let rimab = 0;
    let ut = 0;

    list.map((record) => {
      if (record.employee.enterprise === "IMEXHS") {
        imexhs += 1;
      } else if (record.employee.enterprise === "RIMAB") {
        rimab += 1;
      } else {
        ut += 1;
      }
    });

    list.map((record) => {
      if (record.result === "AISLAMIENTO PREVENTIVO") {
        aisl += 1;
      } else {
        others += 1;
      }
    });

    this.setState({
      absence_data: [
        {
          name: "IMEXHS",
          value: imexhs,
        },
        {
          name: "RIMAB",
          value: rimab,
        },
        {
          name: "UT",
          value: ut,
        },
      ],
      ais_abs: aisl,
      oth_abs: others,
    });

    console.log(this.state.positive_test);
  }

  getStatsTest(list) {
    let no_test_pos = 0;
    let no_test_neg = 0;

    let imexhs = 0;
    let rimab = 0;
    let ut = 0;

    list.map((record) => {
      if (record.employee.enterprise === "IMEXHS") {
        imexhs += 1;
      } else if (record.employee.enterprise === "RIMAB") {
        rimab += 1;
      } else {
        ut += 1;
      }
    });

    list.map((record) => {
      if (record.result === "POSITIVO") {
        no_test_pos += 1;
      } else if (record.result === "PENDIENTE") {
        no_test_neg += 1;
      }
    });

    this.setState({
      test_data: [
        {
          name: "IMEXHS",
          value: imexhs,
        },
        {
          name: "RIMAB",
          value: rimab,
        },
        {
          name: "UT",
          value: ut,
        },
      ],
      positive_test: no_test_pos,
      pending_test: no_test_neg,
    });
    console.log(this.state.positive_test);
  }

  handleHide() {
    this.setState({
      show: !this.state.show,
    });
  }

  handleSideBarToggle() {
    this.setState({
      sidebar: !this.state.sidebar,
    });
    console.log(this.state.sidebar, "Toggled");
  }

  findAvg(arr) {
    if (arr.length === 0) {
      this.setState({ loading: false });
      return;
    }
    this.setState({ loading: true });
    //let value;
    //console.log(arr, 'ARREGLO dE  NTRADA PARa PRoMEDIO')
    let acum = 0;
    let quanty = 0;
    let most = [];
    for (let value of arr) {
      acum += value["price"];
      quanty += value["quantity"];
      most.push(value["location"]);
      //  console.log(value['price'], 'valores para promediar' )
      //  console.log(acum, 'acumulado' )
    }
    let prom = (acum / this.state.list.length).toFixed(0);

    // formula for most frequent value .---->
    let counts = most.reduce((a, c) => {
      a[c] = (a[c] || 0) + 1;
      return a;
    }, {});

    let maxCount = Math.max(...Object.values(counts));
    let mostFrequent = Object.keys(counts).filter(
      (k) => counts[k] === maxCount
    );

    //console.log(mostFrequent, 'MAS FREQUENTE');
    //console.log(prom, 'promedio')
    this.setState({
      hotLocation: mostFrequent,
      average: prom,
      totQuanty: quanty,
      loading: false,
    });
  }

  render() {
    const {
      test_data,
      absence_data,
      hotLocation,
      list,
      test_list,
      abs_list,
      ais_abs,
      oth_abs,
      positive_test,
      pending_test,
      average,
      totQuanty,
      loading,
      coord,
    } = this.state;
    console.log(test_list, test_list[0]);

    return (
      <>
        <div className="header bg-gradient-info pb-2 pt-2 pt-md-4">
          <Container fluid>
            <div className="col-auto offset-sm-1 header-body">
              {/* Card stats */}
              <Row>
                <Col lg="5" xl="5">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <Col>
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0 ml-0"
                          >
                            No. de Pruebas
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0 ml-0">
                            {loading ? (
                              <LoadSpinner />
                            ) : test_list.length === 0 ? (
                              <p>No Data</p>
                            ) : (
                              test_list.length
                            )}
                          </span>
                        </Col>

                        <Col className="col-auto">
                          <div className="fas fa-chart-pie icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className=" ni ni-chart-pie-35" />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <p className="mt-1 mb-0 text-muted text-sm">
                          <span className="text-danger mr-2">
                            <i className="fa fa-arrow-up" /> Positivos
                          </span>{" "}
                          <span className="text-nowrap">{positive_test}</span>
                        </p>

                        <p className="mt-1 ml-4 mb-0 text-muted text-sm">
                          <span className="text-warning mr-2">
                            <i className="fa fa-arrow-up" /> En espera
                          </span>{" "}
                          <span className="text-nowrap">{pending_test}</span>
                        </p>
                      </Row>
                      <Row></Row>
                    </CardBody>
                  </Card>

                  <Card className="card-stats mb-2 mt-1 mb-xl-0">
                    {loading ? (
                      <BorderSpinner />
                    ) : list.length === 0 ? (
                      <p>No Data</p>
                    ) : (
                      <CircleChart
                        data={test_data}
                        // textchart={"Quantity Circle Chart "}
                      />
                    )}
                  </Card>
                </Col>

                <Col lg="5" xl="5">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <Col>
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0 ml-0"
                          >
                            Ausencias
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0 ml-0">
                            {loading ? (
                              <LoadSpinner />
                            ) : abs_list.length === 0 ? (
                              <p>No Data</p>
                            ) : (
                              abs_list.length
                            )}
                          </span>
                        </Col>

                        <Col className="col-auto">
                          <div className="fas fa-chart-pie icon icon-shape bg-success text-white rounded-circle shadow">
                            <i className="ni ni-calendar-grid-58" />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <p className="mt-1 mb-0 text-muted text-sm">
                          <span className="text-danger mr-2">
                            <i className="fa fa-arrow-up" /> En Aislamiento
                          </span>{" "}
                          <span className="text-nowrap">{ais_abs}</span>
                        </p>

                        <p className="mt-1 ml-4 mb-0 text-muted text-sm">
                          <span className="text-warning mr-2">
                            <i className="fa fa-arrow-up" /> Otros
                          </span>{" "}
                          <span className="text-nowrap">{oth_abs}</span>
                        </p>
                      </Row>
                    </CardBody>
                  </Card>

                  <Card className="card-stats mb-2 mt-1 mb-xl-0">
                    {loading ? (
                      <BorderSpinner />
                    ) : list.length === 0 ? (
                      <p>No Data</p>
                    ) : (
                      <CircleChart
                        data={absence_data}
                        // textchart={"Quantity Circle Chart "}
                      />
                    )}
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
