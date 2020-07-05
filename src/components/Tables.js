import React from 'react'
import { Table, Button, OverlayTrigger, Spinner } from 'react-bootstrap'
import {  FaInfoCircle, FaEdit, FaTrashAlt, FaTrash, FaRegTrashAlt} from 'react-icons/fa'




const Tables = (props) => {

  const style = { 
    padding: "0 2em",
    textRendering: "optimizeLegibility",
    color: "#444",
    background: "#eee"
    
        }

  const defaultImage = require('../layout/img/site/no-image-available-icon-6.jpg')

  const renderTooltip = (images, name) => (
    
    <div
      
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: '10px 10px',
        color: 'white',
        borderRadius: 5
      
      }}>
      <img
        src={images === null ?
          defaultImage
        :
          images
        }
          width='375'
          height='250'
          alt=''
      />
      
      
    </div>
  );
  
  
  const imagelll = require('../layout/img/site/code-coder-coding-270348.jpg')
  
  return (
    <Table className="table-borderless table-hover table-striped text-center mr-4" style={style}>
        <thead 
          style={{
            background: `linear-gradient(61deg, #010000 0%, rgba(0, 0, 0, .6) 70%),url(${imagelll})`,
            backgroundSize: `cover`,
            backgroundPosition: `center`,}}
        >
          <tr>
            
            <th>Preview</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>              
            <th>Description</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{
          color: "whitesmoke",
          background: "#0F2027",  /* fallback for old browsers */
          background: "-webkit-linear-gradient(to bottom, #2C5364, #203A43, #0F2027)",  /* Chrome 10-25, Safari 5.1-6 */
          background: "linear-gradient(to bottom, #2C5364, #203A43, #0F2027)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        }}>
          {  props.list.length  === 0 ?
          <tr >    
            <td colSpan="6">There is no Products yet</td>
          </tr>  
            
          :
            
          props.list.map( product =>
          <tr key={product.id}>
            <OverlayTrigger
                placement="right-end"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip(product.images, product.name)}
            >
              <td>
                <img
                    src={
                      product.images === null ?
                        defaultImage
                      :
                        product.images
                      }
                    width='60'
                    height='40'
                    alt=''
                />
              </td>
            </OverlayTrigger>
              <td >{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.observation}</td>
              <td>{product.deployDate}</td>
              
              <td>
              <Button className="mr-2 " variant="info" onClick={() => 
                
                props.handleOnClick(product)}>
                
                <FaInfoCircle/>
  
              </Button>
                <Button className="mr-2 " variant="warning" onClick={() => 
                    
                      props.handleData(product)}>

                  <FaEdit/>
    
                </Button>
                <Button variant="danger" onClick={() => 
                
                props.handleDelete(product.id)}>
  
                  <FaTrashAlt/>
                  
                </Button>
              </td>
            </tr>
            )}
        </tbody>

    </Table>
  )
}

export default Tables