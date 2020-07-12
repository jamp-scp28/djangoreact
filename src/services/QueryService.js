import axios from "axios";
import { createBrowserHistory } from "history";
const apiurl = "api/v1/";
const mnurl = "http://localhost:8000/";
const logurl = "api-token-auth/";
const retokenurl = "api-token-refresh/";
const hist = createBrowserHistory();
const item = "product";
const records = "health";
const absences = "absence";
let tkaccess = sessionStorage.getItem("tkaccess");
let tkrefresh = sessionStorage.getItem("tkrefresh");

let maxRetries = 3;
let retries = 0;

//console.log(tkaccess, 'token de acceso a mandar')

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    //console.log(originalRequest, "ORIGINAL REQUEST")
    if (!error.response) {
      //console.log(error, 'ERROR  AL PRINCIPIO')
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      sessionStorage.getItem("tkrefresh").length > 0
    ) {
      // Hace la solicitud de refresco de tokens

      originalRequest._retry = true;

      //console.log(error.response.data, 'tipo de  error 401')
      //console.log(tkrefresh, tkaccess, 'tokens despues de 401')
      //console.log(error.response.data, "ERROR RELOGIN")

      return axios
        .post(retokenurl, {
          refresh: sessionStorage.getItem("tkrefresh"),
        })
        .then((responseData) => {
          // actualiza la información de OAuth
          //////////////setTokens(responseData.data.access_token, responseData.data.refresh_token);
          //console.log(tkrefresh, tkaccess, 'tokens EN EXITO')
          //console.log(responseData.data, 'respuest a consulta de refresh')
          sessionStorage.setItem("tkaccess", responseData.data.access);
          originalRequest.headers["Authorization"] =
            "Bearer " + responseData.data.access;
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + responseData.data.access;

          // re-intenta la solicitud original
          return axios(originalRequest);
        })
        .catch((error) => {
          //console.log(tkrefresh, tkaccess, 'tokens CON NUEVO ERROR PARA SER BORRADOS')
          //console.log(error.response, 'ERROR DE NUEVO EN PETICION')
          sessionStorage.removeItem("tkaccess");
          sessionStorage.removeItem("tkrefresh");
          sessionStorage.removeItem("user");
          hist.push("/login");
        });
    }

    //console.log(tkrefresh, tkaccess, 'tokens DEVUELTOS EN ULTIMA PARTE')
    //console.log(error.response, 'ERROR PARA DEVOLVER')
    return Promise.reject(error);
  }
);

export default class QueryService {
  constructor() {}
  //Quedy Absence Records

  async getAbsences() {
    const url = `${apiurl}${absences}/`;
    console.log(sessionStorage.getItem("tkaccess"));
    return await axios({
      method: "GET",
      baseURL: mnurl,
      url: url,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
  }

  async getCodes() {
    const url = `${apiurl}codes/`;
    return await axios({
      method: "GET",
      baseURL: mnurl,
      url: url,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
  }

  async deleteAbsence(absence) {
    const url = `${apiurl}${absences}/${absence}/`;
    return await axios({
      method: "DELETE",
      url: url,
      baseURL: mnurl,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
  }

  async createAbsence(absence) {
    const url = `${apiurl}${absences}/`;
    console.log(absence.get("employee"), "ASI ME LLEGO el NAME");
    return await axios({
      method: "POST",
      url: url,
      baseURL: mnurl,
      data: absence,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
    // return await axios
    //   .post(url, product, {
    //   headers: {
    //     'Authorization': `Bearer ${sessionStorage.getItem('tkaccess')}`,
    //     'Content-type': 'multipart/form-data'
    //     }

    //   })
  }

  async updateAbsence(absence, id) {
    const url = `${apiurl}${absences}/${id}/`;
    //console.log(product, 'ESTE ES EL DATO QUE sE MANDa A modificarrrr  SERVER')
    //console.log(id, 'NUMERO DE ID')
    console.log(absence.get("employee"), "ASI ME LLEGO el NAME");
    return await axios({
      method: "PUT",
      url: url,
      baseURL: mnurl,
      data: absence,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
  }

  //Query Service for Health Information

  async getHrecords() {
    const url = `${apiurl}${records}/`;
    console.log(sessionStorage.getItem("tkaccess"));
    return await axios({
      method: "GET",
      baseURL: mnurl,
      url: url,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
  }

  async getEmployees() {
    const url = `${apiurl}employee/`;
    return await axios({
      method: "GET",
      baseURL: mnurl,
      url: url,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
  }

  async deleteHrecord(record) {
    const url = `${apiurl}${records}/${record}/`;
    return await axios({
      method: "DELETE",
      url: url,
      baseURL: mnurl,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
  }

  async createHrecord(record) {
    const url = `${apiurl}${records}/`;
    console.log(record.get("employee"), "ASI ME LLEGO el NAME");
    return await axios({
      method: "POST",
      url: url,
      baseURL: mnurl,
      data: record,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
    // return await axios
    //   .post(url, product, {
    //   headers: {
    //     'Authorization': `Bearer ${sessionStorage.getItem('tkaccess')}`,
    //     'Content-type': 'multipart/form-data'
    //     }

    //   })
  }

  async updateHrecord(record, id) {
    const url = `${apiurl}${records}/${id}/`;
    //console.log(product, 'ESTE ES EL DATO QUE sE MANDa A modificarrrr  SERVER')
    //console.log(id, 'NUMERO DE ID')
    console.log(record.get("employee"), "ASI ME LLEGO el NAME");
    return await axios({
      method: "PUT",
      url: url,
      baseURL: mnurl,
      data: record,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
  }

  //new codesss

  async getLocations() {
    const url = `${apiurl}location/`;
    return await axios({
      method: "GET",
      baseURL: mnurl,
      url: url,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
  }

  async getProducts() {
    const url = `${apiurl}${item}/`;
    console.log(sessionStorage.getItem("tkaccess"));
    return await axios({
      method: "GET",
      baseURL: mnurl,
      url: url,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
  }

  async deleteProduct(product) {
    const url = `${apiurl}${item}/${product}/`;
    return await axios({
      method: "DELETE",
      url: url,
      baseURL: mnurl,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
  }

  async createProduct(product) {
    const url = `${apiurl}${item}/`;
    console.log(product.get("location"), "ASI ME LLEGO el NAME");
    return await axios({
      method: "POST",
      url: url,
      baseURL: mnurl,
      data: product,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
    // return await axios
    //   .post(url, product, {
    //   headers: {
    //     'Authorization': `Bearer ${sessionStorage.getItem('tkaccess')}`,
    //     'Content-type': 'multipart/form-data'
    //     }

    //   })
  }

  async updateProduct(product, id) {
    const url = `${apiurl}${item}/${id}/`;
    //console.log(product, 'ESTE ES EL DATO QUE sE MANDa A modificarrrr  SERVER')
    //console.log(id, 'NUMERO DE ID')
    //console.log(product.get('name'), 'ASI ME LLEGO el NAME')
    return await axios({
      method: "PUT",
      url: url,
      baseURL: mnurl,
      data: product,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
    // return await axios
    //   .put(url, product, {
    //     headers: {
    //       'Authorization': `Bearer ${sessionStorage.getItem('tkaccess')}`,
    //       'Content-type': 'multipart/form-data'
    //       }

    //     })
  }

  async deleteLocation(location) {
    const url = `${apiurl}${item}/${location}/`;
    return await axios.delete(url, location, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });
  }

  async createLocation(location) {
    const url = `${apiurl}location/`;
    //console.log(location, 'ASI ME LLEGO LOCATION PARA GUARDAR')
    return await axios({
      method: "POST",
      url: url,
      baseURL: mnurl,
      data: location,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });

    // return await axios
    //   .post(url, location, {
    //   headers: {
    //     'Authorization': `Bearer ${sessionStorage.getItem('tkaccess')}`,
    //     'Content-Type': 'application/json'
    //     }

    //   })
  }

  async updateLocation(location, id) {
    const url = `${apiurl}${item}/${id}/`;
    //console.log(location, 'ESTE ES EL DATO QUE SE MANDA A MODIFICAR EN SERVER')
    //console.log(id, 'NUMERO DE ID')
    //console.log(location.get('name'), 'ASI ME LLEGO el NAME')
    return await axios({
      method: "PUT",
      url: url,
      baseURL: mnurl,
      data: location,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkaccess")}`,
        "Content-Type": "application/json",
      },
    });

    // return await axios
    //   .put(url, location, {
    //     headers: {
    //       'Authorization': `Bearer ${sessionStorage.getItem('tkaccess')}`,
    //       'Content-type': 'multipart/form-data'
    //       }

    //     })
  }

  // TEMPORARRY DISABLED

  // async getProductsByURL(link) {
  //   const url = `${apiurl}${link}`;
  //   return await axios
  //     .get(url)
  //     .then(response => response.data)
  //     .catch(err => console.log(err));
  // }
  // async getProduct(pk) {
  //   const url = `${apiurl}${item}/${pk}/`;
  //   return await axios
  //     .get(url)

  // }

  // async login(user, passwd) {
  //   console.log(user, passwd, 'PASA LOGIN DATOS')
  //   return await axios({
  //       method: 'get',
  //       url: 'api-token-auth/',
  //       data: {
  //         'username': user,
  //         'password': passwd
  //       }
  //     })
  //     .then(result => {

  //       console.log(result, 'RESULT LOGIN AXIOS')
  //       //this.setState({ logged: true})
  //       sessionStorage.setItem("tkaccess", result.data.access)
  //       sessionStorage.setItem("tkrefresh", result.data.refresh)
  //     })
  //     .catch(err => console.log(err, 'LOOIGn FALLIDO'));

  // }

  // async getoken(user, token) {
  //   return await axios
  //     .post(retokenurl, token)

  // }
  // async getWeather(data){
  //   //return await axios
  //   //.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=imperial`)

  // }
}
