import React from 'react'
import {Container, Row} from 'react-bootstrap'


const style={
 
  color: '#fff',
  widht: '100%',
  background: '#0F2027',  /* fallback for old browsers */
  background: '-webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027)',  /* Chrome 10-25, Safari 5.1-6 */
  background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  

}


const footer = (props) => {
  return (

      <div  className="py-5 text-center" style={style}>
      {props.message}
      </div>
    
  
  )
}

export default footer
