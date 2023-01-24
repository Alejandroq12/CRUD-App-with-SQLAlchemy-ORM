----------------------------------------------------------------
# CRUD App with SQLAlchemy ORM
This app was created with Flask, SQLAlchemy and Python. The objective is to connect this app to my database.

--------------------------------------------------------------

To run this app on Windows you can use PowerShell.

1- With PowerShell go to the folder in which this app is located.

2- Run the following command: python app.py

3-To quit you must press CTRL + C

----------------------------------------------------------------

Before running you must install:

-Python3;

-Flask;

-SQLAlchemy;

-PostgreSQL;

-Psycopg2;

-OpenSSL;

-------------------------------------------------------------------

Before running:

- A server using postgreSQL must be running, and it has to have this specifications: 

dialect: postgresql;

username: postgres;

password: 4991;

host: localhost;

port: 5432

Database: postgres.

Example:

dialect://username:password@host:port/database 

Example with the correct configuration: postgresql://postgres:4991@localhost:5432/postgres

If you want to change those settings just go to app.py and on line 5 you can do that.

-----------------------------------------------------------------
Important:
You need to create a data base called "crudapp5" before running. Remember that you can chose your own name.
--------------------------------------------------------------------
Note: 

I had a problem when running from the terminal with "db.create.all()". I fixed that problem this way:

Whatched this video: https://www.youtube.com/watch?v=Ny1g-Wk5nyM

from flask_hello_app import app, Person

>>> with app.app_context():          

...  Person.query.all()  
...
[<Person 1>]


Thank you: 

That video was suggested by Yohannes Getient on Starkoverflow https://stackoverflow.com/questions/34122949/working-outside-of-application-context-flask
------------------------------------------------------------------------------------------
