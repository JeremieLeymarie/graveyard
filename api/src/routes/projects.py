from flask import Blueprint

projects = Blueprint('projects')

@projects.route("/")