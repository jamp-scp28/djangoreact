import React from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
import Rating from 'react-rating'
import {TiStarOutline, TiStarFullOutline} from 'react-icons/ti'


const FormLoc = (props) => {
  return (
        
      <div>
        <Form 
          validated={props.validated}
          style ={props.style}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Location Name</Form.Label>
              <Form.Control 
                type="text"
                name={props.name} 
                placeholder="Enter Location Name" 
                value={props.fieldloc}
                onChange={props.handleChange}
                required
              />
              <Form.Text className="text-muted">
                  RATING (Temporary Disabled)
              </Form.Text>
              
              <Rating 
                      stop={10}
                      step={2}
                      initialRating={0}
                      emptySymbol={<h3><TiStarOutline/></h3>}
                      fullSymbol={<h3><TiStarFullOutline/></h3>}
                      value={props.fieldloc}
                      
                    />
              
          </Form.Group>

        </Form>
      </div>
  )
}

export default FormLoc
