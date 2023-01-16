# Hello-App-with-Flask-SQLAlchemy
This app was created with Flask, SQLAlchemy and Python. The objective is to connect this app to my database.

--------------------------------------------------------------

To run this app on Windows you can use PowerShell.

1- With PowerShell go to the folder in which this app is located.

2- Run the following command: python.py

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
When you run this app a database called "persons" will be created.