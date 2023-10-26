from abc import ABC, abstractmethod

class RepositoryInterface(ABC):

    @abstractmethod
    def connect():
        pass

    @abstractmethod
    def create(self, collection: str, data: dict):
        pass

    @abstractmethod
    def get(self,collection: str, id: str, filter: dict):
        pass

    @abstractmethod
    def get_all(self, collection: str,):
        pass
    
    @abstractmethod
    def update(self, collection: str, id: str, data: dict):
        pass

    @abstractmethod
    def delete(self, collection: str, id: str, filter: dict):
        pass