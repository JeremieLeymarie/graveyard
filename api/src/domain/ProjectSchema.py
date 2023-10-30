from marshmallow import Schema, fields
from enum import Enum

class ProjectStatus(Enum):
    ALIVE = "alive"
    DEAD = "dead"

class ProjectSchema(Schema):
    id = fields.Str()
    name = fields.Str()
    createdAt = fields.DateTime()
    lastWorkedOnAt = fields.DateTime()
    # status = fields.Enum(ProjectStatus)



