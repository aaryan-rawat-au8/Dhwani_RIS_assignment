# Dhwani_RIS_assignment

How to run the code:-

1-install npm dependencies.(npm i)
2-type 'nodemon src/app.js' to run the server.

API :-

1- User Login-'http://localhost:2000/register'
2- User Logout-'http://localhost:2000/logout'
3- Get State-'http://localhost:2000/state'
4- Post State-'http://localhost:2000/state'
5- Get District-'http://localhost:2000/district'
6- Post District-'http://localhost:2000/district'
7- Get Child-'http://localhost:2000/child'
8- Post Child-'http://localhost:2000/child'

>>>>>First signup a user using POST 'http://localhost:2000/register'.
req parameters:

{
    "name":"abc",
    "age":23,
    "organisation": "health-care",
    "designation": "social worker",
    "password": "1234",
    "email": "abc@gmail.com"
}

>>>>>>>Then signin using GET 'http://localhost:2000/register'.
req parameters:

{
    "password": "1234",
    "email": "abc@gmail.com"
}

>>>>>>>To add states use POST:'http://localhost:2000/state'
req parameters:

{
    "state":"delhi"
}

>>>>>>>To add district use POST:'http://localhost:2000/district'
req parameters:

{
    "district":"kanpur"
}

>>>>>>>>To add child  use POST :'http://localhost:2000/child'
req parameters:

{   
    "name":"aryan",
    "sex":"male",
    "dob":"05-06-1998",
    "father_name":"abc",
    "mother_name":"xyz",
    "state":"uttarkhand",
    "district":"dehradun"
}

