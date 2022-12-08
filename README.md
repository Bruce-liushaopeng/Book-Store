Group Project name: Online Bookstore

Group members:<br>
    Shaopeng Liu (101078992)<br>
    Shang Shi (101173744)<br>
    Xiaobin Xu (101118254)<br>

Purpose: 
    This project is meant to implement a command-line based application for an online bookstore that is composed of multiple functions. Without registration, users can view the books in the bookstore or search for a book they are looking for. Users can use this application to register an account to purchase books and follow up on their orders. This application also allows the owner(administrator) to place and check orders, add new books, and view the report of the publishers, authors, etc. 

System Config: <br>
npm vision: 8.19.2<br>
node.js vision: v18.12.1<br>
pgAdmin vision: 6.13<br>
pgAdmin Server using: PostgreSQL 14


Setup database: 	<br>
    1. Change system vairbales by going to file: database-initialize-variables.js<br>
   	2. Change the passwor<br>
	3. Change the database name, use a name that haven't been in your database.<br>

	In the command line, run:

   	3. npm install, install the NodeJs packages
    4. node database-creator, to create a new database with the name you entered at step 3
    5. node database-initializer, create tables, functions, triggers, and initial data
	6. When see the message of success, then means the setup is complete

To run the system:

    	1. in the CMD, run" node console ", this will start the command line application


Here's a list all available commands that you could use. 

Notice some command will only be available when you login, and some command are reserved for Admin user only.
    
        <login>                 login to your account
        <register>              register to our book-store's account
        <view-all-books>        view all the books in the store
        <select>                select a book to view detail
        <add-to-basket>         to add the book to like to your basket
        <help>                  to view command line info again
        <search-by-isbn>        search a book by isbn
        <search-by-author>      search books by author
        <search-by-genre>       search books by genre
        <search-by-publisher>   search books by publisher
        <search-by-bookname>    search books by book name
        <logout>                logout your account
        <place-order>           place order
        <check-order>           check your order
        <user-info>             view your information
        <add-new-book>          add new book to the store
        <view-report>           to view all the available reports
        
Because the short timeframe of the project, There are some edge cases are not handled, place read the following notice to avoid strange system behaviours.

        1. Do not place-order with an empty basket, use add-to-basket command first.
        2. When system requiring user input, please don't provide an empty string.
        3. Search function in this application is case sensitive
        4. The system don't support new Admin register, to test Admin functionality, use the username "admin1"

    
    
    
    






