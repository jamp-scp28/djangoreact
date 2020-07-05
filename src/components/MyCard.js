import React from 'react'

const MyCard = (props) => {
    return (
        <div class="col-lg-3 col-sm-6 mb-3">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src={props.image} alt=""/></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">{props.title}</a>
            </h4>
            <p class="card-text">{props.text}</p>
          </div>
        </div>
      </div>
    )
}

export default MyCard
