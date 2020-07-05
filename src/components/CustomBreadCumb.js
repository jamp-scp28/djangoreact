import React from 'react'
import '../bread.css'


const CustomBreadCumb = (props) => {
  return (
    
    <div className="cont_breadcrumbs_3">
        <ul>  
          <li><a href="#">{props.breadpage}</a></li>
          <li><a href="#" className="breadcrumb-item active">{props.title}</a></li>
        </ul>
    </div>

  )
}
export default CustomBreadCumb
