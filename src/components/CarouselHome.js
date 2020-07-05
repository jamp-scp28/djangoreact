import React from 'react'
import { Carousel } from 'react-bootstrap';

const style = {

  }

const CarouselHome = (props) => {
  return (

        <div className="m-3">
          <Carousel >

            {
              props.content.map( (items, key) =>
  
              <Carousel.Item  key={key} style={props.stylecarousel}>

                {
                items.image ?
                  <img
                    className="d-block w-100"
                    src={items.image}
                    alt="First slide"
                  />
                  :
                  <div className="align-content-center">
                    {items.other}
                  </div>
                }

                  <Carousel.Caption>
                    <h3>{items.title}</h3>
                    <p>{items.subtitle}</p>
                  </Carousel.Caption>
              </Carousel.Item>

                )}
  
            </Carousel>
        </div>

)
}
export default CarouselHome;