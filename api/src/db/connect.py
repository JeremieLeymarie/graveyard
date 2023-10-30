from flask import g

from db.Repository import Repository

def get_repository()-> Repository:
    if 'db' not in g:
        repo = Repository()
        g.db = repo

    return g.db