import React from "react";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import MyUploader from "../../components/MyUploader";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Formik, Field, FieldArray } from "formik";
import { prototype } from "chart.js";

const FormAB = (props) => {
  console.log(props.fields);
  const { validated } = "false";
  const options = props.employees.map((loc, index) => {
    return {
      name: loc.name,
      id: loc.id,
    };
  });
  console.log(props.codes);
  const codes = props.codes.map((loc, index) => {
    return {
      name: loc.description,
      id: loc.id,
    };
  });

  const reasons = [
    {
      name: "AISLAMIENTO PREVENTIVO",
      id: 1,
    },
    {
      name: "OTRO",
      id: 2,
    },
  ];

  let ivalue = "";
  if (props.fields.employee === undefined) {
    ivalue = "";
  } else {
    ivalue = props.fields.employee.name;
    console.log(ivalue);
  }

  let cvalue = "";
  console.log(props.fields);
  if (props.fields.codes === undefined) {
    cvalue = "";
  } else {
    cvalue = props.fields.ciie10;
    console.log(ivalue);
  }

  return (
    <Form noValidate validated={validated}>
      {/* <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom07">
          <Form.Label>Fecha Registro</Form.Label>
          <Form.Control
            name="date"
            type="date"
            format="YYYY-MM-DD"
            placeholder="YYYY/MM/dd"
            required
            defaultValue={props.fields.date}
            onChange={props.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row> */}

      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom02">
          <Form.Label>Trabajador</Form.Label>

          <Typeahead
            defaultInputValue={ivalue}
            name="employee"
            id="employee"
            multiple={false}
            onChange={props.handleEmployee}
            labelKey="name"
            options={options}
          />

          {/* <Form.Control as='select'
            name="location"
            onChange={props.handleChange}
            searchable="Search here.."
            required
          >
            <option disabled>Choose...</option>
            <option selected>{props.fields.location}</option>
            {props.locations.map(loc =>
              <option key={loc.id} value={loc.name}>{loc.name}</option>
            )}
          </Form.Control> */}

          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom02">
          <Form.Label>Motivo de Ausencia</Form.Label>

          <Form.Control
            as="select"
            name="reason"
            defaultValue={props.fields.reason}
            onChange={props.handleChange}
            searchable="Search here.."
            required
          >
            <option disabled>Seleccione...</option>
            {reasons.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </Form.Control>

          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      {/* <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom05">
          <Form.Label>Motivo de Ausencia</Form.Label>
          <Form.Control
            name="reason"
            type="text"
            placeholder="motivo"
            required
            defaultValue={props.fields.reason}
            onChange={props.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row> */}

      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom02">
          <Form.Label>Codigo CIIE10</Form.Label>

          <Typeahead
            defaultInputValue={props.fields.ciie10}
            name="ciie10"
            id="ciie10"
            multiple={false}
            onChange={props.handleCode}
            labelKey="name"
            options={codes}
          />

          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom07">
          <Form.Label>Fecha de Inicio</Form.Label>
          <Form.Control
            name="ini_date"
            type="date"
            format="YYYY-MM-DD"
            placeholder="YYYY/MM/dd"
            required
            defaultValue={props.fields.ini_date}
            onChange={props.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom07">
          <Form.Label>Fecha Fin</Form.Label>
          <Form.Control
            name="end_date"
            type="date"
            format="YYYY-MM-DD"
            placeholder="YYYY/MM/dd"
            required
            defaultValue={props.fields.end_date}
            onChange={props.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom05">
          <Form.Label>Observacion</Form.Label>
          <Form.Control
            name="observation"
            type="textArea"
            placeholder="observacion"
            required
            defaultValue={props.fields.observation}
            onChange={props.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      {/* <Form.Row>
        <Form.Label>Image</Form.Label>

        <MyUploader
          images={props.images}
          getUploadParams={props.getUploadParams}
          handleChangeStatus={props.handleChangeStatus}
          handleSubmitImg={props.handleSubmitImg}
        />
      </Form.Row> */}
    </Form>
  );
};

export { FormAB };
