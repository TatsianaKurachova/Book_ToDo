from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS
import sqlite3 as sql
from flask_apispec import marshal_with, doc
from flask_apispec.annotations import marshal_with
from flask_apispec.views import MethodResource
from marshmallow import Schema, fields
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from flask_apispec.extension import FlaskApiSpec


app = Flask(__name__)
api = Api(app)
CORS(app)


class BookResponseSchema(Schema): 
    id = fields.Int()
    author = fields.Str()
    book_name = fields.Str()


class BooksResponseSchema(Schema):
    data = fields.List(fields.Nested(BookResponseSchema))


con = sql.connect("books.db", check_same_thread=False)
cur = con.cursor()

cur.execute("""CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL,
    book_name TEXT NOT NULL)
    """)
con.commit()


class BookAPI(MethodResource, Resource):

    @doc(description='Book Endpoint')
    @marshal_with(BooksResponseSchema)
    def get(self, **kwargs):
        cur.execute("SELECT * FROM books")
        books = [{'id': row[0], 'author': row[1], 'book_name': row[2]} for row in cur.fetchall()]
        return jsonify({'data': books})

    @doc(description='Book Endpoint')
    @marshal_with(BookResponseSchema)
    def post(self):
        if request.json['author'] and request.json['book_name']:
            author = request.json['author']
            book_name = request.json['book_name']
            cur.execute("SELECT * FROM books WHERE author=? AND book_name=?", (author, book_name))
            rows = cur.fetchall()
            
            if len(rows) == 0:
                cur.execute("""INSERT or IGNORE INTO books(
                    author, book_name) VALUES(?,?)""", (author, book_name))
                con.commit()
                return {'message': 'books successfully'}, 201
            else:
                return jsonify({'message': 'Book already exists'}, 300)
        else:
            return {'message': 'Error creating book'}, 400


    @doc(description='Book Endpoint')
    @marshal_with(BookResponseSchema)
    def delete(self, id):
        cur.execute("DELETE FROM books WHERE id=?", (id,))
        con.commit()
        return {'message': 'books deleted'}, 201


app.config.update({
    'APISPEC_SPEC': APISpec(
        title='Books Project',
        version='v1',
        plugins=[MarshmallowPlugin()],
        openapi_version='2.0.0'
    ),
    'APISPEC_SWAGGER_URL': '/swagger/',  # URI to access API Doc JSON 
    'APISPEC_SWAGGER_UI_URL': '/'  # URI to access UI of API Doc
})


api.add_resource(BookAPI, '/api/books', '/api/books/<int:book_id>')
app.add_url_rule('/sw/api/books', view_func=BookAPI.as_view('book_endpoint'))
docs = FlaskApiSpec(app)
docs.register(BookAPI)


app.run()
