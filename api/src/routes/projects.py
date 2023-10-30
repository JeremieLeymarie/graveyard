from flask import Blueprint
from werkzeug.local import LocalProxy

from db.Collection import Collection
from domain.ProjectSchema import ProjectSchema

from db.connect import  get_repository


project_routes = Blueprint('projects', __name__)
db = LocalProxy(get_repository)


@project_routes.route("/")
def all():
    projects = db.get_all(Collection.PROJECTS)
    schema = ProjectSchema(many=True)
    data = schema.dump(projects)
    return {"data" : data, "error": False}