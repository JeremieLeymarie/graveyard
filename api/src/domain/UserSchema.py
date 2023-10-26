from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Str()
    username = fields.Str()
    password = fields.Str()