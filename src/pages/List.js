import React, { PureComponent } from 'react'
import Header from '../layout/Header'
import { Modal, Alert, Button, Row, Fade, Spinner } from 'react-bootstrap';
import CustomBreadCumb from '../components/CustomBreadCumb'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Tables from '../components/Tables';
import Modalcont from '../components/Modalcont'
import QueryService from '../services/QueryService';
import SideBar from '../components/SideBar';
import { FaRegPlusSquare, FaTags } from 'react-icons/fa'
//import Spinner from '../components/Spinner';

const queryservice = new QueryService()
const nameapp = 'Header'
const footermsg = 'Footer'
const page = 'List'
const MySwal = withReactContent(Swal)
const pageStyle = {


}


export default class List extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      locations: '',
      list: [],
      fields: {},
      show: false,
      error: '',
      message: '',
      modaltitle: '',
      loading: false,
      sidebar: false
    }
    this.handleHide = this.handleHide.bind(this)
    this.handleData = this.handleData.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleLocation = this.handleLocation.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleSideBarToggle = this.handleSideBarToggle.bind(this)


  }

  async componentDidMount() {

    const { loading } = this.state
    this.setState({ loading: true })

    await queryservice.getProducts()
      .then(result => {
        ////console.log(result, 'result con axios')
        this.setState({
          list: result.data,
        })
        ////console.log(this.state.products, 'prduct state con axios')          
      })
      .catch(error => {
        //  //console.log(error, 'estructura del error')
        this.setState({
          error: error,
        });
      })

    this.setState({ loading: false });

  }



  handleSideBarToggle() {
    this.setState({
      sidebar: !this.state.sidebar

    })
    //console.log(this.state.sidebar, "Toggled")

  }


  handleData(data) {

    const { show, modaltitle, list, fields } = this.state
    console.log(data)
    if (!data) {

      this.setState({
        fields: {},
        show: true,
        modaltitle: 'Create'

      })
      ////console.log(data, 'DATA DEL FORM limpio')

    }

    else {

      this.setState({
        show: true,
        modaltitle: 'Update',
        fields: data

      })

    }

  }


  async handleCreate(data, images) {

    ////console.log(data, 'DATA DEL FORM para AGREG')
    ////console.log(images, 'DATA DE IMAGENS para AGREG')
    let templist = this.state.list
    let fieldsData = new FormData()

    fieldsData.append('name', data.name)
    fieldsData.append('location', data.location)
    fieldsData.append('price', data.price)
    fieldsData.append('quantity', data.quantity)
    fieldsData.append('description', data.description)
    fieldsData.append('observation', data.observation)
    fieldsData.append('deployDate', data.deployDate)

    if (images[1] !== undefined) {

      fieldsData.set('images', '')
      fieldsData.append('images', images[1], images[1].name)

    }
    ////console.log(fieldsData.get('name'), 'ESTE ES FIELDS DATA COVERTIDO')
    await queryservice.createProduct(fieldsData)
      .then(result => {
        //console.log(result, 'result CREATED')
        //templist.concat(data)
        this.setState({
          list: [...templist, result.data],
          message: <Alert className="mt-4" dismissible variant="info"> {result.data.name} Created</Alert>,
          show: false
        })

        MySwal.fire(
          'Create Sucessfull!',
          'OK',
          'success'
        )

        ////console.log(this.state.list, 'prduct state con axios')
        //fieldsData.reset()      
      })
      .catch(error => {
        ////console.log(error.response, 'estructura del error en CREAR')
        this.setState({ error: error.response.statusText });
        MySwal.fire(
          'Error!',
          error.response.statusText,
          'error'
        )
      })
  }

  async handleUpdate(data, images) {


    
    ////console.log(images[1], 'DATA DE IMAGENS UNO para MODIF')
    let fieldsData = new FormData()
    fieldsData.append('name', data.name)
    fieldsData.append('location', data.location)
    fieldsData.append('price', data.price)
    fieldsData.append('quantity', data.quantity)
    fieldsData.append('description', data.description)
    fieldsData.append('observation', data.observation)
    fieldsData.append('deployDate', data.deployDate)
    if (images[1] !== undefined) {

      fieldsData.set('images', '')
      fieldsData.append('images', images[1], images[1].name)

    }
    ////console.log(fieldsData.get('name'), 'ESTE ES FIELDS DATA COVERTIDO')
    ////console.log(fieldsData.get('images'), 'ESTE ES FIELDS IMAGES COVERTIDO')
    //console.log(data.id, 'ESTE ES ID PARA URL')
    await queryservice.updateProduct(fieldsData, data.id)
      .then(result => {
        ////console.log(result, 'result con axios')
        this.setState({
          ////// list: result.data
          fields: {},
          message:
            <Alert className="mt-4" dismissible variant="info">
              Modified {data.name}
            </Alert>,

          show: false
        })
        MySwal.fire(
          'Modified SucessFully!',
          'OK',
          'success'
        )
        ////console.log(this.state.products, 'prduct state con axios')

      })
      .catch(error => {
        ////console.log(error, 'estructura del error')
        this.setState({ error: error });
        MySwal.fire(
          'Error!',
          error.message,
          'error'
        )
      })


  }

  handleLocation(event) {
    //console.log(event)
    const { fields } = { ...this.state }
    const actualfield = fields
    //console.log(fields)
    //const {value} = event
    actualfield['location'] = event[0].name
    this.setState({
      fields: actualfield
    })
    //console.log(fields)
  }

  handleChange(event) {

    const { fields } = { ...this.state }
    const actualfield = fields
    console.log(fields)
    const { name, value } = event.target
    actualfield[name] = value

    this.setState({
      fields: actualfield
    })
    ////console.log(this.state.fields, 'CAMBIOS DE FIELDS moddificados')

  }


  async handleDelete(pk) {

    const { list } = this.state;

    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then(async (result) => {
        if (result.value) {

          await queryservice.deleteProduct(pk)
            .then(result => {
              //  //console.log(result, 'result con axios')
              this.setState({
                list: list.filter(product => product.id !== pk)
              })
              MySwal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              //   //console.log(this.state.list, 'prduct state con axios')

            })
            .catch(error => {
              MySwal.fire(
                'Error!',
                error.message,
                'error'
              )

              this.setState({ error: error.message });
            })


        }
      })

  }


  handleHide() {

    this.setState({
      show: !this.state.show

    })
  }

  handleOnClick(data) {

    this.setState({
      show: true,
      fields: data,
      modaltitle: 'Detail'

    })

  }


  render() {
    return (
      <div style={{
        ...pageStyle,
        background: this.state.sidebar ? 'rgba(0, 0, 0, .6)' : 'inherit',
        transition: 'background-color .35s cubic-bezier(.4, 0, .2, 1)'

      }}>
        <Header brand={nameapp} alerts={MySwal} />
        <div id="content-wrapper"  >
          <SideBar handleSideBarToggle={this.handleSideBarToggle} />
          <div className="container-fluid mt-2"
            style={
              this.state.sidebar ?
                {/*paddingLeft: '250px',   If MAIN DIV WANT TO RESIZE */
                  paddingLeft: '250px'

                }

                :

                { paddingLeft: '80px' }
            }
          >
            <Row className="container mt-1">

              <CustomBreadCumb
                breadpage={"Product"}
                title={"List"}
              />

              <div>
                <Button
                  onClick={() => this.handleData()} variant="success" className="m-5">
                  <FaRegPlusSquare size="2em" /> Add New
                  </Button>

              </div>
            </Row>
            {this.state.message}

            <Modalcont
              show={this.state.show}
              modaltitle={this.state.modaltitle}
              handleHide={this.handleHide}
              handleUpdate={this.handleUpdate}
              handleCreate={this.handleCreate}
              handleChange={this.handleChange}
              handleLocation={this.handleLocation}
              handleOnClick={this.handleOnClick}
              fields={this.state.fields}
              locations={this.state.locations}
              alerts={MySwal}
            />

            {this.state.loading ?

              <div style={{
                textAlign: 'center',
                margin: 'auto',
                padding: '200px'

              }}>

                <Spinner animation="grow" variant="light" role="status" />
                <Spinner animation="grow" variant="light" role="status" />
                <Spinner animation="grow" variant="light" role="status" />

              </div>

              :

              <Tables
                list={this.state.list}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
                handleOnClick={this.handleOnClick}
                handleData={this.handleData}
                alerts={MySwal}
                loading={this.state.loading}
              >

              </Tables>
            }
          </div>
        </div>
      </div>
    )
  }
}
