from flask import Flask
from routes.projects import project_routes
from routes.users import user_routes


def create_app():
    app = Flask(__name__)

    app.register_blueprint(project_routes, url_prefix="/api/projects")
    app.register_blueprint(user_routes, url_prefix="/api/users")


    return app