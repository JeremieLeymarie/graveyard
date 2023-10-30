from typing import Any, Collection, Dict
from dotenv import dotenv_values
from pymongo import MongoClient
from pymongo.cursor import Cursor
from bson import ObjectId
from db.RepositoryInterface import RepositoryInterface

config = dotenv_values(".env")

class MongoRepository(RepositoryInterface):

    def __init__(self, uri: str, db_name: str) -> None:
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def create(self, collection: Collection, data: Dict):
        col = collection.value
        result = self.db[col].insert_one(data); 

        return self.format(result)


    def get(self, collection: Collection, id: str = None, filter: Dict = None):
        col = collection.value
        result = None

        if id : 
            result = self.db[col].find_one({"_id" : ObjectId(id)})
            return self.formatDocument(result)
        elif filter:
            result = self.db[col].find(filter)

        return self.format(result)

    def get_all(self, collection: Collection):
        col = collection.value

        result = self.db[col].find()
        
        return self.format(result)

    
    def update(self, collection: Collection, data: Dict, id: str = None, filter: Dict = None,):
        col = collection.value
        result = None
        if id : 
            result = self.db[col].update_one({"_id" : ObjectId(id)}, data)
        elif filter:
            result = self.db[col].update_many(filter, data)
        
        return self.format(result)


    def delete(self, collection: Collection, id: str = None, filter: Dict= None):
        col = collection.value
        result = None
        if id : 
            result = self.db[col].delete_one({"_id" : ObjectId(id)})
        elif filter:
            result = self.db[col].delete_many(filter)
        
        return self.format(result)

    def format(self, cursor: Cursor):
        data = []

        for document in cursor:
            if isinstance(document, dict):
                data.append(self.formatDocument(document))
            else: 
                raise Exception(f"Unsupported data format in mongo repository for object: {document}")

        return data

    def formatDocument(self, data: Any):
        formatted = data.copy()

        for key, value in data.items():
            if isinstance(value, ObjectId):
                if key == "_id":
                    formatted["id"] = str(value)
                else:
                    formatted[key] = str(value)
        
        del formatted["_id"]

        return formatted