import React from 'react'
import { Form } from 'react-bootstrap';


const FormLogin = (props) => {
  return (
    
      <Form 
        validated={props.validated}
        style ={props.style}
      >
        <Form.Group controlId={props.controlId} className="mb-4">
          
            <Form.Control 

              type="text"
              name={props.name} 
              placeholder="Enter Username" 
              value={props.username}
              onChange={props.handleChange}
              required
            />
          <Form.Text className="text-muted">
      
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="LoginPassword" className="mt-4">
          
            <Form.Control 

              name={props.namepassword}
              type="password" 
              placeholder="Password" 
              value={props.password}
              onChange={props.handleChange}
              required
            />
        </Form.Group>
  
        

      </Form>
    
  )
}
export default FormLogin
