
from typing import Dict, Union
from db.mongo.MongoRepository import MongoRepository
from db.Collection import Collection, collections_map,repository_map
from db.RepositoryInterface import RepositoryInterface

# This should be instanciated only once for the whole app, to avoid redundant connections.
class Repository(RepositoryInterface):

    def __init__(self):
        pass


    def get_db(self,  collection: Collection) -> MongoRepository : # Should be a union if other repos are implemented
        repo_name = collections_map.get(collection)
        if repo_name and getattr(self, repo_name, None) is None:

            config = repository_map.get(repo_name)
            repo = config.get("repo")(**(config.get("params")))
            setattr(self, repo_name, repo)

        return getattr(self, repo_name, None) 

    def create(self, collection: Collection, data):
        db = self.get_db(collection)
        db.create( collection, data)

    def get(self, collection: Collection, id: str= None, filter: Dict= None):
        db = self.get_db(collection)
        db.get(collection, id, filter)

    def get_all(self, collection: Collection):
        db = self.get_db(collection)
        return db.get_all(collection)
    
    def update(self, collection: Collection,  data: Dict, id: str = None, filter: Dict = None,):
        db = self.get_db(collection)
        return db.update(collection, data, id, filter )

    def delete(self, collection: Collection, id: str= None, filter: Dict     = None):
        db = self.get_db(collection)
        return db.update(collection, id, filter)


    