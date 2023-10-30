from enum import Enum
from dotenv import dotenv_values

from db.mongo.MongoRepository import MongoRepository

config = dotenv_values(".env") 

class Collection(Enum): 
    USERS = "users"
    PROJECTS = "projects"

class Repository(Enum):
    MONGO = "mongo"


repository_map = {
    "mongo" : {"params" : {"db_name" : "database", "uri" : config.get("ATLAS_URI")}, "repo" : MongoRepository }
}

collections_map = {
    Collection.USERS : "mongo",
    Collection.PROJECTS : "mongo"
}