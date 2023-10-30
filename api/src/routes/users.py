from flask import Blueprint, request
from werkzeug.local import LocalProxy
from db.Collection import Collection
from domain.UserSchema import UserSchema

from db.connect import get_repository


user_routes = Blueprint('users', __name__)
db = LocalProxy(get_repository)

@user_routes.route("/", methods=["GET"])
def all():
    if request.method == "GET":
        users = db.get_all(Collection.USERS)
        data = UserSchema(many=True).dump(users)
        return {"data" : data, "error": False}
    
@user_routes.route("/<id>", methods=["GET"])
def one(id: str):
     if request.method == "GET":
        users = db.get(Collection.USERS, id)
        data = UserSchema().dump(users)
        return {"data" : data, "error": False}