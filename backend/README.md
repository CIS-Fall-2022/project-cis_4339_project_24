# Dataplatform’s API documentation

This repository contains the documentation for Dataplatform Web application API.

## 1. Overview

The application does not require any authentication and uses RESTful API. It identifies the oraganization based on an evironmental variable defined for the system it is running on. 
The application is using mongodb atlas for data management. The APIs are to manupulate the `primaryData` collection(which have the users inforamtion) and `eventData` collection (have events data). The organization are registered manually in the database. 

### Before startup 
Setup a .env file with the following variables, e.g.:

```
MONGO_URL = mongodb+srv://<username>:<password>@cluster0.abcdc.mongodb.net/dbname
ORGANIZATION = <organization code>
```

## 2. primaryData

All the APIs that deals with the primaryData collection have prefix `/primaryData` subpage.

### 2.1. All Users

This API fetches the documents from primaryData collection, which were added by that specific organization with all the fields present in the collection. The results are sorted by updatedAt date.

```
GET http://localhost:3000/primaryData
```

The response is a array of users.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
    {
        "address": {
            "line1": "14906 hollydale drive",
            "line2": "",
            "city": "LEAGUE CITY",
            "county": "",
            "zip": ""
        },
        "_id": "b47fc640-38a7-11ed-b986-dda0c0b5a583",
        "firstName": "Jahidul",
        "middleName": "ji",
        "lastName": "Islam",
        "email": "adrianmonzalvo1988@gmail.com",
        "phoneNumbers": [
            {
                "primaryPhone": "8329080595",
                "secondaryPhone": ""
            }
        ],
        "createdAt": "2022-09-20T05:47:25.744Z",
        "updatedAt": "2022-09-20T05:47:25.744Z",
        "__v": 0,
        "organization": "631d4b84f6eb186df032a11a"
    }
]
```
Where a User object is:

| Field       | Type   | Description                                      |
| ------------|--------|--------------------------------------------------|
| id          | string | A unique identifier for the user.                |
| firstName   | string | The user's first name.                 		  |
| middleName  | string | The user’s middle name.                   		  |
| lastName    | string | The user’s last name.            				  |
| createdAt   | Date   | The date when the user's information was added.  |
| updatedAt   | Date   | The date when the user's information was updated.|
| address     | Object | User's address									  |
| phoneNumbers| Array  | User's phone numbers							  |
| organization| String | The reference id to the organization which manupulated this data  |

Where a address object is:

| Field      | Type   | Description                                      |
| -----------|--------|--------------------------------------------------|
| line1      | string | The line 1 of address of the user.               |
| line2  	 | string | The line 2 of address of the user.               |
| city 		 | string | The city where user lives.                 		 |
| county     | string | The country where user lives.     				 |
| zip  		 | string | The zip code of the city where user lives.    	 |

Where a phoneNumbers object is:

| Field         | Type   | Description                                      |
| --------------|--------|--------------------------------------------------|
| primaryPhone  | string | Primary Phone number of the user.                |
| secondaryPhone| string | Secondary Phone number of the user.              |

### 2.2. Specific Users

API to find a specific user by the given ID. 

```
GET http://localhost:3000/primaryData/id/
```

With the following parameters:

| Parameter     | Type     | Required?  | Description                       |
| ------------- |----------|------------|-----------------------------------|
| `id`          | string   | required   | The unqiue id of the user         |

Example request:

```
GET http://localhost:3000/primaryData/id/b47fc640-38a7-11ed-b986-dda0c0b5a583
```

The response is a array of users that have the given id.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
    {
        "address": {
            "line1": "14906 hollydale drive",
            "line2": "",
            "city": "LEAGUE CITY",
            "county": "",
            "zip": ""
        },
        "_id": "b47fc640-38a7-11ed-b986-dda0c0b5a583",
        "firstName": "Jahidul",
        "middleName": "ji",
        "lastName": "Islam",
        "email": "adrianmonzalvo1988@gmail.com",
        "phoneNumbers": [
            {
                "primaryPhone": "8329080595",
                "secondaryPhone": ""
            }
        ],
        "createdAt": "2022-09-20T05:47:25.744Z",
        "updatedAt": "2022-09-20T05:47:25.744Z",
        "__v": 0,
        "organization": "631d4b84f6eb186df032a11a"
    }
]
```

The response object will be same as previous APIs.

### 2.3. Add new user

API to add the user information to the mongodb collection.

```
POST http://localhost:3000/primaryData/
```

With the following parameters:

| Parameter     | Type     | Required?  | Description                       |
| ------------- |----------|------------|-----------------------------------|
| `firstName`   | string   | required   | First Name of the user            |
| `middleName`  | string   | optional   | middle Name of the user           |
| `lastName`    | string   | required   | last Name of the user             |
| `email`       | string   | optional   | email of the user         	    |
| `phonenumber` | array    | required   | Phone numbers of the user         |
| `address.city`| string   | required   | address of the user             |

Example request:

```
POST /primaryData/
Content-Type: application/json
{
	"address": {
		"line1": "14906 hollydale drive",
		"line2": "",
		"city": "LEAGUE CITY",
		"county": "",
		"zip": ""
	},
	"_id": "b47fc640-38a7-11ed-b986-dda0c0b5a583",
	"firstName": "Jahidul",
	"middleName": "ji",
	"lastName": "Islam",
	"email": "adrianmonzalvo1988@gmail.com",
	"phoneNumbers": [
		{
			"primaryPhone": "8329080595",
			"secondaryPhone": ""
		}
	],
	"createdAt": "2022-09-20T05:47:25.744Z",
	"updatedAt": "2022-09-20T05:47:25.744Z",
	"__v": 0,
	"organization": "631d4b84f6eb186df032a11a"
}
```

The API returns the mongodb document that is created using the input data 
Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
    {
        "address": {
            "line1": "14906 hollydale drive",
            "line2": "",
            "city": "LEAGUE CITY",
            "county": "",
            "zip": ""
        },
        "_id": "b47fc640-38a7-11ed-b986-dda0c0b5a583",
        "firstName": "Jahidul",
        "middleName": "ji",
        "lastName": "Islam",
        "email": "adrianmonzalvo1988@gmail.com",
        "phoneNumbers": [
            {
                "primaryPhone": "8329080595",
                "secondaryPhone": ""
            }
        ],
        "createdAt": "2022-09-20T05:47:25.744Z",
        "updatedAt": "2022-09-20T05:47:25.744Z",
        "__v": 0,
        "organization": "631d4b84f6eb186df032a11a"
    }
]
```

The response object will be same as previous APIs.

Possible errors:

| Error code           | Description                                     |
| ---------------------|-------------------------------------------------|
| 500 validation failed| Required parameters are not passed				 |

### 2.4. Update an existing user

API to add the user information to the mongodb collection. It will also change the update date automatically.

```
PUT http://localhost:3000/primaryData/:id
```

With the following parameters:

| Parameter     | Type     | Required?  | Description                       								|
| ------------- |----------|------------|-------------------------------------------------------------------|
| `firstName`   | string   | required   | First Name of the user            								|
| `middleName`  | string   | optional   | middle Name of the user           								|
| `lastName`    | string   | required   | last Name of the user             								|
| `email`       | string   | optional   | email of the user         	    								|
| `phonenumber` | array    | required   | Phone numbers of the user         								|
| `address.city`| string   | required   | address of the user              									|
| `address.city`| string   | required   | address of the user              									|
 
Example request:

```
POST /primaryData/b47fc640-38a7-11ed-b986-dda0c0b5a583"
Content-Type: application/json
{
	"address": {
		"line1": "14906 hollydale drive",
		"line2": "",
		"city": "LEAGUE CITY",
		"county": "",
		"zip": ""
	},
	"_id": "b47fc640-38a7-11ed-b986-dda0c0b5a583",
	"firstName": "Jahidul",
	"middleName": "ji",
	"lastName": "Islam",
	"email": "adrianmonzalvo1988@gmail.com",
	"phoneNumbers": [
		{
			"primaryPhone": "8329080595",
			"secondaryPhone": ""
		}
	],
	"createdAt": "2022-09-20T05:47:25.744Z",
	"updatedAt": "2022-09-20T05:47:25.744Z",
	"__v": 0,
	"organization": "631d4b84f6eb186df032a11a"
}
```

The API returns the mongodb document that is updated using the input data 
Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
    {
        "address": {
            "line1": "14906 hollydale drive",
            "line2": "",
            "city": "LEAGUE CITY",
            "county": "",
            "zip": ""
        },
        "_id": "b47fc640-38a7-11ed-b986-dda0c0b5a583",
        "firstName": "Jahidul",
        "middleName": "ji",
        "lastName": "Islam",
        "email": "adrianmonzalvo1988@gmail.com",
        "phoneNumbers": [
            {
                "primaryPhone": "8329080595",
                "secondaryPhone": ""
            }
        ],
        "createdAt": "2022-09-20T05:47:25.744Z",
        "updatedAt": "2022-09-20T05:47:25.744Z",
        "__v": 0,
        "organization": "631d4b84f6eb186df032a11a"
    }
]
```


The response object will be same as previous APIs.


Possible errors:

| Error code           | Description                                     |
| ---------------------|-------------------------------------------------|
| 500 validation failed| Required parameters are not passed				 |


### 2.5. Search a user 

API that seaches from the primaryData collection. The API have the option to search by name or by the pgone number

```
GET http://localhost:3000/primaryData/search
```

With the following parameters:

| Parameter     | Type     | Required?  | Description                       								|
| ------------- |----------|------------|-------------------------------------------------------------------|
| `firstName`   | string   | required   | First Name of the user            								|
| `lastName`    | string   | required   | last Name of the user             								|
| `phoneNumbers.primaryPhone` | array    | required   | The primary Phone numbers of the user         		|
| `searchBy`    | string   | required   | It can be either `name` for firstName and lastName or `number` for phone number |
  
Example requests:
```
GET	http://localhost:3000/primaryData/search?firstName=j&lastName=&searchBy=name
```
```
GET	http://localhost:3000/primaryData/search?firstName=j&lastName=test&searchBy=name
```
```
GET	http://localhost:3000/primaryData/search?phoneNumbers.primaryPhone=8329080595&searchBy=number
```

Example responses:
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[]
```

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
    {
        "address": {
            "line1": "14906 hollydale drive",
            "line2": "",
            "city": "LEAGUE CITY",
            "county": "",
            "zip": ""
        },
        "_id": "b47fc640-38a7-11ed-b986-dda0c0b5a583",
        "firstName": "Jahidul",
        "middleName": "ji",
        "lastName": "Islam",
        "email": "adrianmonzalvo1988@gmail.com",
        "phoneNumbers": [
            {
                "primaryPhone": "8329080595",
                "secondaryPhone": ""
            }
        ],
        "createdAt": "2022-09-20T05:47:25.744Z",
        "updatedAt": "2022-09-20T05:47:25.744Z",
        "__v": 0,
        "organization": "631d4b84f6eb186df032a11a"
    }
]
```

The response object will be same as previous APIs.


Possible errors:

| Error code             | Description                                           |
| -----------------------|-------------------------------------------------------|
| 304 request not changed| The search parameters has not changed.				 |


## 3. eventData

All the APIs that deals with the eventData collection have prefix `/eventData` subpage.

### 3.1. All Events

This API fetches the documents from eventData collection, which were added by that specific organization with all the fields present in the collection. The results are sorted by updatedAt date.

```
GET http://localhost:3000/eventData
```

The response is a array of event.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
    {
        "address": {
            "line1": "ghadbn",
            "line2": "",
            "city": "",
            "county": "",
            "zip": ""
        },
        "_id": "efcb60d0-4255-11ed-9e6a-cdaa95919513",
        "organization": "631d4b84f6eb186df032a11a",
        "eventName": "test",
        "services": [
            "Family Support",
            "Adult Education"
        ],
        "date": "2022-10-21T00:00:00.000Z",
        "description": "",
        "attendees": [
            "489b15d0-4255-11ed-bdde-13d8ed291536",
            "b47fc640-38a7-11ed-b986-dda0c0b5a583"
        ],
        "__v": 0
    }
]
```
Where a event object is:

| Field       | Type   | Description                                      |
| ------------|--------|--------------------------------------------------|
| _id         | string | A unique identifier for the event.                |
| eventName   | string | The name for the event              		      |
| services    | array  | The services offered in the event                |
| description | string | The description of the event       			  |
| date   	  | Date   | The date when the event will be held on.  			  |
| attendees   | array  | The users that are attending the event           |
| address     | Object | event's address									  |
| organization| String | The reference id to the organization which manupulated this data  |

Where a address object is:

| Field      | Type   | Description                                      |
| -----------|--------|--------------------------------------------------|
| line1      | string | The line 1 of address of the event.               |
| line2  	 | string | The line 2 of address of the event.               |
| city 		 | string | The city where event lives.                 		 |
| county     | string | The country where event lives.     				 |
| zip  		 | string | The zip code of the city where event lives.    	 |

### 3.2. Specific event

API to find a specific event by the given ID. 

```
GET http://localhost:3000/eventData/id/
```

With the following parameters:

| Parameter     | Type     | Required?  | Description                       |
| ------------- |----------|------------|-----------------------------------|
| `id`          | string   | required   | The unqiue id of the event         |

Example request:

```
GET http://localhost:3000/eventData/id/efcb60d0-4255-11ed-9e6a-cdaa95919513
```

The response is a array of events that have the given id.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
    {
        "address": {
            "line1": "ghadbn",
            "line2": "",
            "city": "",
            "county": "",
            "zip": ""
        },
        "_id": "efcb60d0-4255-11ed-9e6a-cdaa95919513",
        "organization": "631d4b84f6eb186df032a11a",
        "eventName": "test",
        "services": [
            "Family Support",
            "Adult Education"
        ],
        "date": "2022-10-21T00:00:00.000Z",
        "description": "",
        "attendees": [
            "489b15d0-4255-11ed-bdde-13d8ed291536",
            "b47fc640-38a7-11ed-b986-dda0c0b5a583"
        ],
        "__v": 0
    }
]
```
The response object will be same as previous event APIs.

### 3.3. Seach a  event

API to search an event by date or by its name 

```
GET http://localhost:3000/eventData/search
```

With the following parameters:

| Parameter     | Type     | Required?  | Description                       								|
| ------------- |----------|------------|-------------------------------------------------------------------|
| `eventName`   | string   | required   | name of the event            								|
| `eventDate`    | string   | required   | event date              								|
| `searchBy`    | string   | required   | It can be either `name` for name of the event or `date` for date  |
  
Example requests:

```
GET	http://localhost:3000/eventData/search?eventName=t&searchBy=name
```
Example response:
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
[]
```

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
    {
        "address": {
            "line1": "ghadbn",
            "line2": "",
            "city": "",
            "county": "",
            "zip": ""
        },
        "_id": "efcb60d0-4255-11ed-9e6a-cdaa95919513",
        "organization": "631d4b84f6eb186df032a11a",
        "eventName": "test",
        "services": [
            "Family Support",
            "Adult Education"
        ],
        "date": "2022-10-21T00:00:00.000Z",
        "description": "",
        "attendees": [
            "489b15d0-4255-11ed-bdde-13d8ed291536",
            "b47fc640-38a7-11ed-b986-dda0c0b5a583"
        ],
        "__v": 0
    }
]
```

The response object will be same as previous event APIs.

Possible errors:

| Error code             | Description                                           |
| -----------------------|-------------------------------------------------------|
| 304 request not changed| The search parameters has not changed.				 |

### 3.4. Events  for which a client is signed up

API takes the user if and find its reference in the event attendees 

```
GET http://localhost:3000/eventData/client/:id
```

With the following parameters:

| Parameter     | Type     | Required?  | Description                       								|
| ------------- |----------|------------|-------------------------------------------------------------------|
| `id`   | string   | required   | id of the user         								|

Example requests:

```
GET http://localhost:3000/eventData/client/489b15d0-4255-11ed-bdde-13d8ed291536
```
Example response:
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
[]
```

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
    {
        "address": {
            "line1": "ghadbn",
            "line2": "",
            "city": "",
            "county": "",
            "zip": ""
        },
        "_id": "efcb60d0-4255-11ed-9e6a-cdaa95919513",
        "organization": "631d4b84f6eb186df032a11a",
        "eventName": "test",
        "services": [
            "Family Support",
            "Adult Education"
        ],
        "date": "2022-10-21T00:00:00.000Z",
        "description": "",
        "attendees": [
            "489b15d0-4255-11ed-bdde-13d8ed291536",
            "b47fc640-38a7-11ed-b986-dda0c0b5a583"
        ],
        "__v": 0
    }
]
```

The response object will be same as previous event APIs.

### 3.5. Create a new event 

API to add the event information to the mongodb collection. 

```
POST http://localhost:3000/eventData
```

With the following parameters:

| Parameter   | Type   | Required | Description                                      |
| ------------|--------|--------- |--------------------------------------------------|
| eventName   | string | required | The name for the event              		      |
| services    | array  | optional | The services offered in the event                |
| description | string | optional | The description of the event       			  |
| date   	  | Date   | required | The date when the event will be held on.  			  |
| attendees   | array  | optional | The users that are attending the event           |
| address     | Object | optional | event's address									  |
| organization| String | optional | The reference id to the organization which manupulated this data  |

Where a address object is:

| Parameter   | Type   | Required | Description                                      |
| -----------|--------|---------- |-------------------------------------------------|
| line1      | string | optional | The line 1 of address of the event.               |
| line2  	 | string | optional | The line 2 of address of the event.               |
| city 		 | string | optional | The city where event lives.                 		 |
| county     | string | optional | The country where event lives.     				 |
| zip  		 | string | optional | The zip code of the city where event lives.    	 |

Example request:

```
POST /eventData"
Content-Type: application/json
{
	"address": {
		"line1": "ghadbn",
		"line2": "",
		"city": "",
		"county": "",
		"zip": ""
	},
	"eventName": "test",
	"services": [
		"Family Support",
		"Adult Education"
	],
	"date": "2022-10-21T00:00:00.000Z",
	"description": "",
	"attendees": [
		"489b15d0-4255-11ed-bdde-13d8ed291536",
		"b47fc640-38a7-11ed-b986-dda0c0b5a583"
	]
}
```

The API returns the mongodb document that is added to the collection.
Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
    {
        "address": {
            "line1": "ghadbn",
            "line2": "",
            "city": "",
            "county": "",
            "zip": ""
        },
        "_id": "efcb60d0-4255-11ed-9e6a-cdaa95919513",
        "organization": "631d4b84f6eb186df032a11a",
        "eventName": "test",
        "services": [
            "Family Support",
            "Adult Education"
        ],
        "date": "2022-10-21T00:00:00.000Z",
        "description": "",
        "attendees": [
            "489b15d0-4255-11ed-bdde-13d8ed291536",
            "b47fc640-38a7-11ed-b986-dda0c0b5a583"
        ],
        "__v": 0
    }
]
```


The response object will be same as previous APIs.


Possible errors:

| Error code           | Description                                     |
| ---------------------|-------------------------------------------------|
| 500 validation failed| Required parameters are not passed				 |

### 3.6. Update an existing event 

API to update the event information in the mongodb collection. 

```
PUT http://localhost:3000/eventData/:id
```

With the following parameters:

| Parameter   | Type   | Required | Description                                      |
| ------------|--------|--------- |--------------------------------------------------|
| eventName   | string | required | The name for the event              		      |
| services    | array  | optional | The services offered in the event                |
| description | string | optional | The description of the event       			  |
| date   	  | Date   | required | The date when the event will be held on.  			  |
| attendees   | array  | optional | The users that are attending the event           |
| address     | Object | optional | event's address									  |
| organization| String | optional | The reference id to the organization which manupulated this data  |

Where a address object is:

| Parameter   | Type   | Required | Description                                      |
| -----------|--------|---------- |-------------------------------------------------|
| line1      | string | optional | The line 1 of address of the event.               |
| line2  	 | string | optional | The line 2 of address of the event.               |
| city 		 | string | optional | The city where event lives.                 		 |
| county     | string | optional | The country where event lives.     				 |
| zip  		 | string | optional | The zip code of the city where event lives.    	 |

Example request:

```
PUT /eventData/efcb60d0-4255-11ed-9e6a-cdaa95919513"
Content-Type: application/json
{
	"address": {
		"line1": "ghadbn",
		"line2": "",
		"city": "",
		"county": "",
		"zip": ""
	},
	"eventName": "test",
	"services": [
		"Family Support",
		"Adult Education"
	],
	"date": "2022-10-21T00:00:00.000Z",
	"description": "",
	"attendees": [
		"489b15d0-4255-11ed-bdde-13d8ed291536",
		"b47fc640-38a7-11ed-b986-dda0c0b5a583"
	],
	"__v": 0
}
```

The API returns the mongodb document that is updated using the input data 
Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
    {
        "address": {
            "line1": "ghadbn",
            "line2": "",
            "city": "",
            "county": "",
            "zip": ""
        },
        "_id": "efcb60d0-4255-11ed-9e6a-cdaa95919513",
        "organization": "631d4b84f6eb186df032a11a",
        "eventName": "test",
        "services": [
            "Family Support",
            "Adult Education"
        ],
        "date": "2022-10-21T00:00:00.000Z",
        "description": "",
        "attendees": [
            "489b15d0-4255-11ed-bdde-13d8ed291536",
            "b47fc640-38a7-11ed-b986-dda0c0b5a583"
        ],
        "__v": 0
    }
]
```


The response object will be same as previous APIs.


Possible errors:

| Error code           | Description                                     |
| ---------------------|-------------------------------------------------|
| 500 validation failed| Required parameters are not passed				 |


### 3.7. Add an attendee to event

API to update the event information and add a new attendee to the event in the mongodb collection. 
The API will make sure there is no duplicate attendee in data

```
PUT http://localhost:3000/eventData/addAttendee/:id
```

With the following parameters:

| Parameter   | Type   | Required | Description                                      |
| ------------|--------|--------- |--------------------------------------------------|
| attendee    | string | required |The id of the user               		      |


Example request:

```
PUT /eventData/addAttendee/efcb60d0-4255-11ed-9e6a-cdaa95919513"
Content-Type: application/json
{
	"attendee":"489b15d0-4255-11ed-bdde-13d8ed291536"
}
```

The API returns the mongodb document that is updated using the input data 
Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```


| Field       | Type   | Description                                      |
| ------------|--------|--------------------------------------------------|
| acknowledged| boolean | If the update was successful or not             |
| modifiedCount| number | number of documents that were modified    |
| upsertedId  | number | number of upsert documents    |
| matchedCount| number | number of documents that matches the query    |



Another possible API response will be 

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
{
    "acknowledged": false
}
```

| Field       | Type   | Description                                      |
| ------------|--------|--------------------------------------------------|
| acknowledged| boolean | If the update was successful or not             |


### 3.8. how many clients signed up for each event for the last 2 months
API to find all the number of clients that signed up for events in the last 2 months

```
GET http://localhost:3000/eventData/report
```



The API returns the mongodb document that is updated using the input data 
Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
    {
        "_id": "efcb60d0-4255-11ed-9e6a-cdaa95919513",
        "attendee": 2
    }
]
```

Where the object is:

| Field       | Type   | Description                                      |
| ------------|--------|--------------------------------------------------|
| _id         | string | A unique identifier for the event.                |
| attendee   | string | number of clients that signed up for the event    |
