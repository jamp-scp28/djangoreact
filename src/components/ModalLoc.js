import React, { useState, useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap'
import FormLoc from '../components/FormLoc'
import QueryService from '../services/QueryService'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)
const queryservice = new QueryService()

const style = {

  background: '#343a40',  
  color: 'whitesmoke',
  textShadow: '#282c34',
  
}

const stylein = {

  //background: '-webkit-linear-gradient(to right, #0b8793, #360033)',  /* Chrome 10-25, Safari 5.1-6 */
  background: 'linear-gradient(to right, #0b8793, #360033)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: 'whitesmoke',

}

const ModalLoc = (props) => {



    

    


    

    


    return (
      <Modal show={props.showed} onHide={props.hide}>
      <Modal.Header style={style} closeButton>
        <Modal.Title>{props.modaltitle}</Modal.Title>
      </Modal.Header>
        <Modal.Body style={stylein}>
          
        
          
          <FormLoc 
          fields={props.fieldloc}
          handleChange={props.handleChange}
          name="name"
          />
        
        
        </Modal.Body>
        <Modal.Footer style={style}>
        <Button variant="success" onClick={() => props.NewLocation(props.fieldloc)}>Add</Button>
        <Button variant="info" onClick={props.hide}>Back</Button>
        </Modal.Footer>

      </Modal>
    )
}
export { ModalLoc }