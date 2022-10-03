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

This API fetches all the documents from primaryData collection with all the fields present in the collection. The results are sorted by updatedAt date.

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
        "__v": 0
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
| phoneNumbers| Array  | User's phone numbers									  |

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
        "__v": 0
    }
]
```
Where a User object is:

| Field       | Type   | Description                                      |
| ------------|--------|--------------------------------------------------|
| _id         | string | A unique identifier for the user.                |
| firstName   | string | The user's first name.                 		  |
| middleName  | string | The user’s middle name.                   		  |
| lastName    | string | The user’s last name.            				  |
| createdAt   | Date   | The date when the user's information was added.  |
| updatedAt   | Date   | The date when the user's information was updated.|
| address     | Object | User's address									  |
| phoneNumbers| Array  | User's phone numbers							  |

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
	"address": {
		"line1": "14906 hollydale drive",
		"line2": "",
		"city": "LEAGUE CITY",
		"county": "",
		"zip": ""
	}
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
        "__v": 0
    }
]
```

Where a User object is:

| Field       | Type   | Description                                      |
| ------------|--------|--------------------------------------------------|
| _id         | string | A unique identifier for the user.                |
| firstName   | string | The user's first name.                 		  |
| middleName  | string | The user’s middle name.                   		  |
| lastName    | string | The user’s last name.            				  |
| createdAt   | Date   | The date when the user's information was added.  |
| updatedAt   | Date   | The date when the user's information was updated.|
| address     | Object | User's address									  |
| phoneNumbers| Array  | User's phone numbers							  |

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
POST /primaryData/b47fc640-38a7-11ed-b986-dda0c0b5a583"
Content-Type: application/json
{
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
	"address": {
		"line1": "14906 hollydale drive",
		"line2": "",
		"city": "LEAGUE CITY",
		"county": "",
		"zip": ""
	}
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
        "updatedAt": "2022-09-30T05:47:25.744Z",
        "__v": 0
    }
]
```

Where a User object is:

| Field       | Type   | Description                                      |
| ------------|--------|--------------------------------------------------|
| _id         | string | A unique identifier for the user.                |
| firstName   | string | The user's first name.                 		  |
| middleName  | string | The user’s middle name.                   		  |
| lastName    | string | The user’s last name.            				  |
| createdAt   | Date   | The date when the user's information was added.  |
| updatedAt   | Date   | The date when the user's information was updated.|
| address     | Object | User's address									  |
| phoneNumbers| Array  | User's phone numbers							  |

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

Possible errors:

| Error code           | Description                                     |
| ---------------------|-------------------------------------------------|
| 500 validation failed| Required parameters are not passed				 |


### 2.4. Search a user 