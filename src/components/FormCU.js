import React from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
import MyUploader from '../components/MyUploader';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Formik, Field, FieldArray } from 'formik'


const FormCU = (props) => {

  const { validated } = 'false';

  const options = props.locations.map((loc, index) => {
    return {
      name: loc.name,
      id: loc.name,
    }
  });

  return (

    <Form
      noValidate
      validated={validated}
    >

      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          {/* <Field name="name" component="input" type="radio" value="female" />{' '}  */}

          <Form.Control
            name="name"
            required
            type="text"
            placeholder="First name"
            defaultValue={props.fields.name}
            onChange={props.handleChange}
            autoComplete='on'
          />

          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom02">
          <Form.Label>Location</Form.Label>

          <Typeahead
            defaultInputValue={props.fields.location}
            name='location'
            id='location'
            multiple={false}
            onChange={props.handleLocation}
            labelKey="name"
            options={options}
          />

          {/* <Select
            placeholder="Year"
            //value={selectedYear}
            onChange={props.handleLocation.bind(this)}
            isSearchable={true}
            options={options}
            name="location"
            isLoading={false}
          /> */}



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
        <Form.Group as={Col} md="5" controlId="validationCustom03">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            placeholder="Price" required
            defaultValue={props.fields.price}
            onChange={props.handleChange}
          />

          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
              </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="5" controlId="validationCustom04">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            name="quantity"
            type="number"
            placeholder="Quantity"
            required
            defaultValue={props.fields.quantity}
            onChange={props.handleChange}
          />

          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
            </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>

        <Form.Group as={Col} md="10" controlId="validationCustom05">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            type="textarea"
            placeholder="Description"
            required
            defaultValue={props.fields.description}
            onChange={props.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
              </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>


      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom06">
          <Form.Label>Observation</Form.Label>
          <Form.Control
            name="observation"
            type="textarea"
            placeholder="observation"
            required
            defaultValue={props.fields.observation}
            onChange={props.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
              </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom07">
          <Form.Label>Deploy Date</Form.Label>
          <Form.Control
            name="deployDate"
            type="date"
            format='YYYY-MM-DD'
            placeholder="YYYY/MM/dd"
            required
            defaultValue={props.fields.deployDate}
            onChange={props.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
              </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Label>Image</Form.Label>

        <MyUploader
          images={props.images}
          getUploadParams={props.getUploadParams}
          handleChangeStatus={props.handleChangeStatus}
          handleSubmitImg={props.handleSubmitImg}
        />
      </Form.Row>

    </Form>
  );

}

export { FormCU }

