from csv import list_dialects
from email.policy import default
from msilib.schema import Class
from tkinter import CASCADE
from flask import Flask, render_template, request, redirect, session, url_for, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
import sys
from flask_migrate import Migrate
from sqlalchemy import false
# from sqlalchemy import false


app = Flask(__name__, static_folder='static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:4991@localhost:5432/crudapp5'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

#Parent List of Todos --> Header
class TodoList(db.Model):
    __tablename__ = 'todolists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    todos = db.relationship('Todos', backref='list', lazy=True )
    completed = db.Column(db.Boolean, nullable=True, default=False)

#Children  
class Todos(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(), nullable=False)
    completed = db.Column(db.Boolean, nullable=True, default=False)
    list_id = db.Column(db.Integer, db.ForeignKey('todolists.id'), nullable=True)

def __repr__(self):
    return f'<todo id: {self.id}, description: {self.description}>'

# Many to Many Relationship
order_items = db.Table('order_items', 
        db.Column('orders_id', db.Integer, db.ForeignKey('orders.id'), primary_key=True),
        db.Column('products_id', db.Integer, db.ForeignKey('products.id'), primary_key=True))

class Orders(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(), nullable=False)
    products = db.relationship('Products', secondary = order_items,
             backref=db.backref('orders', lazy=True))

class Products(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)


db.create_all()

@app.route('/todos/create', methods=["POST"])
def create_todo():
    error = False
    body = {}
    #descrip = request.form.get('description', '')
    try:
        descrip = request.get_json()['description']
        lstId = request.get_json()['activeLstId']
        #I need list Id 
        todo = Todos(description = descrip, list_id = lstId) 
        db.session.add(todo)
        db.session.commit()  
        print('added') 
        body['id'] = todo.id
        body['completed'] = todo.completed
        body['description'] = todo.description
    except:
        error = True 
        db.session.rollback()
        print(sys.exc_info())
    #redirect(url_for('index')) this is used if rendered server side --No AJAX request
    finally:
        db.session.close()
    if error:
        abort(400)
    else:
        return jsonify(body)


@app.route('/todos/<todo_id>/set-completed', methods=['POST'])
def set_completed_todo(todo_id):
    try:
        completed = request.get_json()['completed']
        todo = Todos.query.get(todo_id)
        todo.completed = completed
        db.session.commit()
    except:
        db.session.rollback()
    finally:
        db.session.close() 
    return redirect(url_for('index'))


#### Delete function route
@app.route('/todos/<delete_id>', methods=['DELETE'])
def delete(delete_id):
    try:
        Todos.query.filter_by(id=delete_id).delete()
        db.session.commit()
    except:
        db.session.rollback()
    finally:
        db.session.close()
    return jsonify({'success': True})

@app.route('/')
def index():
   return redirect(url_for('get_list_todos', list_id=1))

#######~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main List~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##############

#Get List Todos
@app.route('/lists/<list_id>')
def get_list_todos(list_id):
    return render_template('index.html',
    lists = TodoList.query.all(),
    active_list = TodoList.query.get(list_id),
    todos = Todos.query
        .filter_by(list_id=list_id)
        .order_by('id')
        .all())

@app.route('/todolist/create', methods=["POST"])
def Create_Main_List_Item():
    error = False
    body = {}
    try:
        newListName = request.get_json()['description']
        todoList = TodoList(name= newListName)
        db.session.add(todoList)
        db.session.commit()
        print('Main List item Added')
        body['id'] = todoList.id
        body['description'] = todoList.name
        #body.list 
    except:
        error = True
        db.session.rollback()
        print(sys.exc_info)

    finally:
        db.session.close()
    if error:
        abort(400)
    else:
        return jsonify(body) 


###~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Main List Delete

@app.route('/lists/<delete_id>', methods=['DELETE'])
def delete_main(delete_id):
    error=False
    try:
        print('delete list started')
        #TodoList.query.filter_by(id=delete_id).delete()
        list = TodoList.query.get(delete_id)
        todos = list.todos
        for t in todos:
            print(t)
            db.session.delete(t)
        
        db.session.delete(list)
        db.session.commit()
        print('Main list item - deleted')
    except:
        db.session.rollback()
        error = True
    finally:
        db.session.close()
        if error:
            abort(500)
        else:
            return jsonify({'success': True})

@app.route('/lists/<list_id>/set-List-Completed', methods=['POST'])
def set_list_completed(list_id):
    try:
        status  = request.get_json()['listcompleted']
        list = TodoList.query.get(list_id)
        list.completed = status
        todos = list.todos
        for t in todos:
            t.completed = status
        db.session.commit()
        #get list of todos children -- mark them completed or un completed
    except:
        db.session.commit()
    finally:
        db.session.rollback()
    return redirect(url_for('index'))


#always include this at the bottom of your code
if __name__ == '__main__':
   app.run(host="0.0.0.0", port=3000)

# Or run your app using
#Run App
# FLASK_APP=app.py FLASK_DEBUG=true Flask run