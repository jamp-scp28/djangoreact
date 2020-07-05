This is a simple app build with React and Django for self-learning purposes but feel free to fork you own version 


## Features

This app can make simple things like:

- It comes with data examples but you can create ramdom data on populate.py script (using Faker package)
  
- Login / Register with basic validations (JWT Tokens)
  
- Show a dashboard with backend example data provided or given by user
  
- A List Page with CRUD operations and other functions such a upload images and show map location marker
  
- The last page list data from locations and show ramdom images from external api and also request weather info



## Front-End:

- React with create-react-app

- Mixed components types (function and classes)

- State management with this.state on class component and hooks on function components (no redux)

- mixed styling with bootstrap and custom style variables 

- axios for api request on backend data and also for external api, with interceptor on case of token error

- React router with PrivateRoute for authenticated users

## Back-End:
  
- Django API REST with Django Rest Framework Package

- Basic Models with single relationship fields

- api endpoints for token authentications, data request, for proxy external request with apikeys  

- viewsets with mix of custom handling data and response functions

- some custom configs on settings.py to allow connection from the front-end side


PD: This app was made for learning purposes still have some styling and functional errors, feel free to make your reviews

## ToDo:

* [ ] Create docker-compose files and configs
* [ ] media images config settings on the backend 
* [ ] Modify to better style
* [ ] Improve location page created list

