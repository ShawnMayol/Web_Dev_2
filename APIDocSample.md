READ:
Method: GET
URL: http://..../read.php
Sample Response (Success):
{
  "status": 200,
  "data": {
    "0": {
      "id": 10,
      "firstName": "Ex",
      "lastName": "Ample",
      "email": "example@gmail.com",
      "number": "09123456789"
    }
    "count": 1
    }
}

ADD:
Method: POST
URL: http://..../add.php
Data Needed: 
•	fname
•	lname
•	emailAdd
•	contactNum
Sample Request: http://..../add.php?fname=Ex&lname=Ample&emailAdd=chiz%40gmail.com&contactNum=09876543212
Sample Response (Success):
{
  "status": 200,
  "data": 45, //id of the newly added contact
  "message": "Contact added."
}

EDIT:
Method: POST
URL: https://..../edit.php
Data Needed:
•	id
•	fname
•	lname
•	emailAdd
•	contactNum
•	curEmail
Sample Request: http://..../edit.php?id=8&fname=Ex%20Ray&lname=Ample&emailAdd=Ex%40gmail.com&contactNum=09999999999&curEmail=Ex%40gmail.com
Sample Response (Success):
{
  "status": 200,
  "message": "Contact edited."
}

DELETE:
Method: POST
URL: https://..../delete.php
Data Needed: 
•	id
Sample Request: https://..../delete.php?id=5
Sample Response (Success):
{
  "status": 200,
  "message": "Contact deleted."
}

