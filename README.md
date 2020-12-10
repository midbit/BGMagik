# BGMagik
An imaginary e-commerce system for boardgame. This system is an assessment, and should not be used commercially.

## User Journey
Before constructing any system, an overview of a user journey should be observed. Howeve, in this case the user journey is assumed. The journey is displayed below.

![SystemInfrastructure](/img/user_journey.png)


## System Infrastructure
Since the requirement state that the stack should be Node, React, and Mongo. The system is seperated between front-end and back-end service. This allows the back-end to serve other form of client other than web application. The system infrastructure diagram is displayed below.

![SystemInfrastructure](/img/infrastructure.png)


## Class Diagram
A layered architecture is used for this project to follows the SOLID principle. A stairway design pattern is used to manage the dependency between packages to avoid  unneccesary complex dependency graph. Dependecy Injection and interface is heavily used for ease of unit testing and code maintability. The diagram is dsplayed below.

![SystemInfrastructure](/img/class_diagram.png)


## RESTFUL API
The system use RESTFUL API instead of GraphQL, due to the nature of the system. There is not a lot of complex queries or graph relationship between the entity within the system, thus a Restful service is justified.

| End Point   | Method |      Parameters      | Description |  Return |
| ------------|-------|-----------------------|-------------|---------|
| /boardgames | Get |  name, page  | Search boardgames based on the parameter. Page indicate which page to paginate to. |Array of boardgames |
| /boardgames/:id | Get |  | Search booardgame based on the id | boardgame |
| /transaction | Post | transaction | Create transaction data when purchasing boardgames | Created transaction object |

## Running the System
The project come with docker-compose file to make deployment easier for most people. This can be run by typing the following command at the root folder.

```
docker-compose up
```

However the data for the boardgame is still need to be inserted. Simply run

```
python data_loader.py
```

I also provid a docker file for this. You can build the image first and then run it.

```
docker build . -t data_loader & docker run data_loader
```

## Environments
For customization the back-end has a set of environment variable that could be use in case the default configuration isn't suitable.

| variable | default |
| --------- | -------|
| MONGO_HOST| localhost |
| MONGO_PORT | 27017 |
| MONGO_DATABASE|    |
| PORT | 8080 |

For customizing the script for loading data.
| variable | default |
| --------- | -------|
| MONGO_HOST| localhost |
| MONGO_PORT | 27017 |
| MONGO_DATABASE|    |

