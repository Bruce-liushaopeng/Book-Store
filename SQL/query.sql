-- Insert Publishers, when using, replace the desired variable with actual value
INSERT into Publisher 
values ('publisher Name', 'address', 'email', 'bank account');

-- Insert Publisher and Phone, when using, replace the desired variable with actual value
Insert into PublisherPhone
values 
    ('Publisher_Name', 'Phone_Number');


-- Insert books, when using, replace the desired variable with actual value, sells amount should be 0 by default when new book are added
insert into Book
values 
 ('ISBN', 'Book_Name', num_of_pages, purchase_price, selling_price, 0, quantity_in_stock );

-- Insert book genre, when using, replace the desired variable with actual value
insert into BookGenre
values
    (ISBN, 'genre_type');

-- Insert book and author, when using, replace the desired variable with actual value
insert into BookAuthor
values 
    (ISBN, 'author_name');

-- implicit search
select BookName 
from Book
where BookName LIKE '%Intented_book_name_fragment%';

-- Insert book and author, when using, replace the desired variable with actual value
insert into BookPublisher
values 
    (ISBN, 'publisher_name', sharing_percentage);

-- insert initial users
insert into SystemUser
values
    ('user_name', 'user_address', is_admin_boolean);


------------------------------------------------------------------------------------------------------
-- Below showing the query we used in the Javascript to interact with PG client ------
------------------------------------------------------------------------------------------------------

-- insert new publisher
INSERT into Publisher values ('${publisherName}', '${address}', '${email}', '${BankAccount}');

-- insert new book, using the insertNewBook Function
SELECT insertNewBook(${isbn}, '${bookName}', ${numberOfPage},${purchasePrice},${sellingPrice},${initialStock},'${author}','${genre}','${publisherName}', ${percentage});

-- get all books
select * from book

-- get single book
select * from book where isbn = ${isbn};

-- fuzzy search for book name
select isbn, bookname, numberofpages, sellingprice  
        from Book
        where BookName LIKE '%${bookName}%';

-- get the book and author information through IBSN
select * from BookAuthor where isbn = ${isbn};

-- Get the book and publisher information through ISBN
select * from bookpublisher where isbn = ${isbn};

-- get the book genre information from book ISBN
select * from BookGenre where isbn = ${isbn};

-- get book detail, that are used when user [select] a book 
-- what we did is to gather all the information from individual queries and then combine them using concat
      const singleBook = await getSingleBook(isbn)
      const author = await getBookAuthor(isbn)
      const publisher = await getBookPublisher(isbn)
      const genres = await getBookGenres(isbn)
      const res = singleBook.concat(author, publisher, genres)

-- register a new user
INSERT into systemuser values ('${username}', '${address}', 'False');

-- add a system order, using the addSystemOrder function
-- will get called each time then new order placed
select addSystemOrder('${shippingAddress}', '${userName}');

-- update the orderBook relation, using the updateOrderBook function
-- will get called multiple time when an order contain multiple different books
select updateOrderBook(${isbn}, ${orderAmount});

-- login user from the username
select * from systemuser where username = '${username}'

-- get the latest order number
select MAX(ordernumber) from systemOrder

-- get the user's order by inputting the order number and the username
select * from systemorder natural join orderbook where ordernumber = ${ordernumber} and username = '${username}'

-- fuzzy search for genre
select isbn, bookname, genre from book natural join bookgenre where genre LIKE '%${genre}%';

-- fuzzy search for author
select isbn, bookname, author from book natural join bookauthor where author LIKE '%${author}%';

-- fuzzy search for publisher
select isbn, bookname, publisherName from book natural join bookPublisher where publisherName LIKE '%${publisher}%';

-- get sale vs Expend report
select * from saleExpend_report

-- get report by author
select * from author_report

-- get report by genre
select * from genre_report

-- get report by publisher
select * from publisher_report

-- get report by book
select * from book_report