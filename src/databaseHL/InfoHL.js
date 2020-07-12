import React from 'react'
import { Form, Col, InputGroup, Button, Table } from 'react-bootstrap';
import Maps from '../components/Maps';


const InfoHL = (props) => {
    
    
    const style = {
      cell: "2px",
      borderSpacing: "10px 3rem",
      padding: "10 2em 2em 0",
      border: "1px solid orange",
      outline: "thin solid transparent"
      
    }
     
    return (

      <Table className="table-striped" 
         style={{style}} 
            >
        <tbody>
        <tr >
            <th className="bg-dark text-white">Name</th>
            <td className="bg-white text-dark">{props.fields.name}</td>
        
        </tr>
        <tr>
           <th className="bg-dark text-white">Description</th>
           <td className="bg-white text-dark">{props.fields.description}</td>  
        </tr>
         
        <tr>
          <th className="bg-dark text-white">Price</th>  
          <td className="bg-white text-dark">{props.fields.price}</td>
        </tr>
        <tr>
          <th className="bg-dark text-white"> Location</th>
          <td className="bg-white text-dark">{props.fields.location}</td>
        </tr>
        <tr>
            <td  colSpan="2">
            <Maps
            position={[props.fields.location]}
            zoom={props.zoom}
            height={"250px"}
            width={"450px"}
            numcities={1}
            spinColor={"light"}
            />
            </td>
        </tr>
        </tbody>

    </Table>
      
    );
  
}

export { InfoHL };