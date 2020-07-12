/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import Register from "./views/examples/Register.js";
import Login from "./views/examples/Login.js";
import Tables from "./views/examples/Tables.js";
import Icons from "./views/examples/Icons.js";
import List from "./pages/List";
import Hrecords from "./databaseHL/list/HrecordsList";
import Absences from "./databaseAB/list/AbsenceList";
import Locations from "./pages/Locations";
import Dashboard from "./pages/Dashboard";

var routes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboarddef",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Dashboard,
  //   layout: "/"
  // },
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Index,
  //   layout: "/user",
  // },
  {
    path: "/hrecords",
    name: "Registro de Pruebas",
    icon: "ni ni-bullet-list-67 text-blue",
    component: Hrecords,
    layout: "/user",
  },
  {
    path: "/Absence",
    name: "Registro de Ausencias",
    icon: "ni ni-bullet-list-67 text-red",
    component: Absences,
    layout: "/user",
  },
  // {
  //   path: "/Icons",
  //   name: "Icons",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Icons,
  //   layout: "/user",
  // },
  // {
  //   path: "/List",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: List,
  //   layout: "/user",
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Icons,
  //   layout: "/user",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  // },
];
export default routes;
