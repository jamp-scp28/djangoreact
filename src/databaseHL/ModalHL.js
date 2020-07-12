import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { FormHL } from "./forms/FormHL";
import { InfoHL } from "./InfoHL";
import QueryService from "../services/QueryService";

const queryservice = new QueryService();

const style = {
  background: "#343a40",
  color: "whitesmoke",
  textShadow: "#282c34",
};

const stylein = {
  //background: '-webkit-linear-gradient(to right, #0b8793, #360033)',  /* Chrome 10-25, Safari 5.1-6 */
  background:
    "linear-gradient(to right, #11cdef, #1171ef)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
  color: "whitesmoke",
};
export default class ModalHL extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      employees: [],
      fields: [],
      error: "",
      lat: 17.01924,
      long: -25.06789,
      zoom: 15,
      images: [],
    };
    //this.getUploadParams = this.getUploadParams.bind(this)
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleSubmitImg = this.handleSubmitImg.bind(this);
  }

  componentDidMount() {
    queryservice
      .getEmployees()

      .then((result) => {
        // console.log(result, 'result con axios')
        this.setState({
          employees: result.data,
        });
        console.log(this.state.employees, "Locations state con axios");
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });

    queryservice
      .getLocations()

      .then((result) => {
        // console.log(result, 'result con axios')
        this.setState({
          locations: result.data,
        });
        //console.log(this.state.locations, 'Locations state con axios')
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  //getUploadParams = ({ meta }) => { return { url: uploadapi } }

  // called every time a file's `status` changes
  handleChangeStatus = ({ meta, file }, status) => {
    //console.log(status, meta, file)
    this.setState({ images: [meta, file] });
    //console.log(this.state.images, 'IMAGENES METIDAS')
  };

  // receives array of files that are done uploading when submit button is clicked
  handleSubmitImg = (files, allFiles) => {
    //console.log(files.map(f => f.meta))
    allFiles.forEach((f) => f.remove());
  };

  render() {
    const { modaltitle, handleCreate, handleUpdate, fields } = this.props;
    const agrega = (
      <Button
        variant="success"
        onClick={() => handleCreate(fields, this.state.images)}
      >
        {modaltitle}
      </Button>
    );
    const modifica = (
      <Button
        variant="success"
        onClick={() => handleUpdate(fields, this.state.images)}
      >
        {modaltitle}
      </Button>
    );

    return (
      <Modal show={this.props.show} onHide={() => this.props.handleHide()}>
        <Modal.Header style={style} closeButton>
          <Modal.Title>{this.props.modaltitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={stylein}>
          {modaltitle === "Detail" ? (
            <InfoHL
              fields={this.props.fields}
              lat={this.state.lat}
              long={this.state.long}
              zoom={this.state.zoom}
            />
          ) : (
            <FormHL
              handleEmployee={this.props.handleEmployee}
              locations={this.state.locations}
              employees={this.state.employees}
              fields={this.props.fields}
              handleChange={this.props.handleChange}
              images={this.state.images}
              getUploadParams={this.getUploadParams}
              handleChangeStatus={this.handleChangeStatus}
              handleSubmitImg={this.handleSubmitImg}
            />
          )}
        </Modal.Body>
        <Modal.Footer style={style}>
          {modaltitle === "Create" ? agrega : modifica}
          <Button variant="info" onClick={() => this.props.handleHide()}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
