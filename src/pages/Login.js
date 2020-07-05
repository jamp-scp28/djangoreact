import React from 'react'
import  Header  from '../layout/Header'
import  Content  from '../layout/Content';
import  Footer  from '../layout/Footer'
import FormLogin from '../components/FormLogin';
import {FaGithub} from 'react-icons/fa'
import { Container } from 'react-bootstrap';


const nameapp = 'nameapp'
const footermsg =   <div className="text-center">
                    <FaGithub size="2em"/>
                    <a href="https://github.com/alenq1/reactango-api-crud"> 
                    <p className="lead">GitHub Repo</p>
                    </a>
                    </div>
const page = 'Login'
const style ={

  /* 
  width: '100%',
  height: '100%',
  padding: '100px',
  
   */
  

}

const Login = (props) => {
  
    return (
      <>
        <Container style={style}>
          <Content page={FormLogin}/>
        </Container>
        
        <Footer message={footermsg}/>
      </>
    )
  
}
export default Login