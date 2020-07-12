import React from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
import MyUploader from '../../components/MyUploader';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Formik, Field, FieldArray } from 'formik'
import { prototype } from 'chart.js';


const FormHL = (props) => {
  console.log(props.fields)
  const { validated } = 'false';
  const options = props.employees.map((loc, index) => {
    return {
      name: loc.name,
      id: loc.id,
    }
  });
  let ivalue = "";
  if (props.fields.employee === undefined){
    ivalue = "" 
    
  } else{
    ivalue = props.fields.employee.name
    console.log(ivalue)
  }
  return (
    

    <Form
      noValidate
      validated={validated}
    >
      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom07">
          <Form.Label>Fecha Registro</Form.Label>
          <Form.Control
            name="date"
            type="date"
            format='YYYY-MM-DD'
            placeholder="YYYY/MM/dd"
            required
            defaultValue={props.fields.date }
            onChange={props.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
              </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>


      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom02">
          <Form.Label>Trabajador</Form.Label>

          <Typeahead
            defaultInputValue={ivalue}
            name='employee'
            id='employee'
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
        <Form.Group as={Col} md="10" controlId="validationCustom07">
          <Form.Label>Fecha de Prueba</Form.Label>
          <Form.Control
            name="date_test"
            type="date"
            format='YYYY-MM-DD'
            placeholder="YYYY/MM/dd"
            required
            defaultValue={props.fields.date_test}
            onChange={props.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
              </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>

        <Form.Group as={Col} md="10" controlId="validationCustom05">
          <Form.Label>Estado Resultado</Form.Label>
          <Form.Control
            name="result"
            type="text"
            placeholder="Resultado"
            required
            defaultValue={props.fields.result}
            onChange={props.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
              </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom07">
          <Form.Label>Fecha de Resultado</Form.Label>
          <Form.Control
            name="date_result"
            type="date"
            format='YYYY-MM-DD'
            placeholder="YYYY/MM/dd"
            required
            defaultValue={props.fields.date_result}
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

}

export { FormHL }

