from abc import ABC, abstractmethod
from typing import Collection

class RepositoryInterface(ABC):

    @abstractmethod
    def create(self, collection: Collection, data: dict):
        pass

    @abstractmethod
    def get(self,collection: Collection, id: str, filter: dict):
        pass

    @abstractmethod
    def get_all(self, collection: Collection,):
        pass
    
    @abstractmethod
    def update(self, collection: Collection, id: str, data: dict):
        pass

    @abstractmethod
    def delete(self, collection: Collection, id: str, filter: dict):
        pass