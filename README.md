## Address book
Backend for address book app service
Frontend: Please see inside **app** README.md

## Technologies
1. Spring Boot 2.3.3
2. Postgres 12.3
3. Spring JDBC Template (No ORM)

## How to build

1. Create a database called `test`
2. Create a table `address` using **init.sql**

Run this command in order to create a jar file
```
mvn clean package
java -jar target/addressBook.jar
```
Or Use spring-boot maven plugin
```
mvn spring-boot:run
```

## Docker 
In order to run the application in the docker you need
1. docker cli
2. docker-compose
Execute this command to run the app inside a container
``
docker-compose up
``

## How to test

### Create address
```
 curl --header "Content-Type: application/json"   --request POST   --data '{"firstName":"Cris","lastName":"Wolfe","address":"Bc"}'   http://localhost:8080/addresses
```
It will create a new address with specified address,name and last_name.
#### Validation
All fields are mandatory, first name and last_name have to be bigger than 2 characters

### Update address
Url format `localhost:8080/addresses/{id}`
```
 curl --header "Content-Type: application/json"   --request POST   --data '{"firstName":"Cris","lastName":"Wolfe","address":"Alberta"}'   http://localhost:8080/addresses/15
```

### Delete address
Url format `localhost:8080/addresses/{id}`
```
curl -X DELETE http://localhost:8080/addresses/14
```

### Get addresses 
Url format `localhost:8080/addresses?firstName&lastName&address`
All params are optional. Search will be performed using wildcard on each field
```
  curl localhost:8080/addresses?address=Alber
```
