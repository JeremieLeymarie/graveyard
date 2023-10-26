
from db.MongoRepository import MongoRepository
from db.RepositoryInterface import RepositoryInterface


class Repository(RepositoryInterface):

    def __init__(self, repository: MongoRepository):
        self.repository = repository

    def connect(self):
        self.repository.connect()

    def create(self, collection: str, data):
        self.repository.create(data, collection, )

    def get(self, collection: str, id: str, filter: dict):
        self.repository.get(id, collection, filter)

    def get_all(self, collection: str,):
        self.repository.get_all(collection)
    
    def update(self, collection: str, id: str, data: dict):
        self.repository.update(id, collection, data)

    def delete(self, collection: str, id: str, filter: dict):
        self.repository.update(id, collection, filter)


    