from dotenv import dotenv_values
from pymongo import MongoClient
from bson import ObjectId
from db.RepositoryInterface import RepositoryInterface

config = dotenv_values(".env")

class MongoRepository(RepositoryInterface):

    def connect(self):
        self.client = MongoClient(config["ATLAS_URI"])
        self.db = self.client.graveyard

    def create(self, collection: str, data: dict):
        result = self.db[collection].insert_one(data); 
        return self.format(result)


    def get(self, collection: str, id: str, filter: dict):
        result = None
        if id : 
            result = self.db[collection].find_one({"_id" : ObjectId(id)})
        elif filter:
            result = self.db[collection].find(filter)

        return self.format(result)

    def get_all(self, collection: str):
        result = self.db[collection].find()
        
        return self.format(result)

    
    def update(self, collection: str, id: str, filter: dict, data: dict):
        result = None
        if id : 
            result = self.db[collection].update_one({"_id" : ObjectId(id)}, data)
        elif filter:
            result = self.db[collection].update_many(filter, data)
        
        return self.format(result)


    def delete(self, collection: str, id: str, filter: dict):
        result = None
        if id : 
            result = self.db[collection].delete_one({"_id" : ObjectId(id)})
        elif filter:
            result = self.db[collection].delete_many(filter)
        
        return self.format(result)

    def format(self, data: list(dict) | dict):
        if isinstance(data, list):
            return [self.formatDict(el) for el in data ]
        elif isinstance(data, dict): 
            return self.formatDict(data)
        else: 
            raise Exception(f"Format in MongoRepository, invalid type for object: {data}")
        
    def formatDict(self, data: dict):
        formatted = data.copy()
        for key, value in formatted.items():
            if isinstance(value, ObjectId):
                formatted[key] = str(ObjectId)

        return formatted