-- create table SystemUser
create table if not exists SystemUser
	(UserName		CHARACTER VARYING(15) NOT NULL UNIQUE,
	 Address		CHARACTER VARYING(50),
	 isAdmin		Bool NOT NULL,
	 primary key (UserName)
	);

CREATE SEQUENCE if not exists sequenceNumber
START WITH 1000
INCREMENT BY 1;

-- create table SysetmOrder
create table if not exists SystemOrder
	(OrderNumber		INT, 
	 Date				Date NOT NULL,
	 ShippingAddress	CHARACTER VARYING(25) NOT NULL,		
	 UserName			CHARACTER VARYING(15) NOT NULL,
	 primary key (OrderNumber),
	 foreign key (UserName) references SystemUser(UserName)
	);

create table if not exists Book
	(ISBN				numeric(13) NOT NULL UNIQUE,
	 BookName			varchar(50) NOT NULL,
	 NumberofPages		INT NOT NULL,
	 PurchasePrice		float(2) NOT NULL,
	 SellingPrice		float(2) NOT NULL,
	 SellsAmount		INT NOT NULL,
	 QuantityInStock	INT NOT NULL,
	 primary key (ISBN)
	);

create table if not exists OrderBook
	( OrderNumber		INT NOT NULL,
	 ISBN				numeric(13) NOT NULL,
	 Quantity			INT NOT NULL,
	 primary key (OrderNumber,ISBN),
	 foreign key (OrderNumber) references SystemOrder(OrderNumber),
	 foreign key (ISBN) references Book(ISBN)
	);



alter table OrderBook
add foreign key (ISBN) references Book(ISBN);

create table if not exists BookGenre
	(ISBN				numeric(13) NOT NULL, 
	 Genre				CHARACTER VARYING(25) NOT NULL,
	 primary key (ISBN, Genre),	 
	 foreign key (ISBN) references Book(ISBN)
	);

create table if not exists BookAuthor
	(ISBN				numeric(13) NOT NULL UNIQUE,
	 Author				CHARACTER VARYING(25) NOT NULL,
	 primary key (ISBN,Author),
	 foreign key (ISBN) references Book(ISBN)
	);

create table if not exists BookPublisher
	(ISBN				numeric(13) NOT NULL,
	 PublisherName	 	CHARACTER VARYING(25) NOT NULL,
	 Percentage			float(2) NOT NULL,
	 primary key (ISBN,PublisherName),
	 foreign key (ISBN) references Book(ISBN)
	);
	
create table if not exists Publisher
	(PublisherName		CHARACTER VARYING(25) NOT NULL UNIQUE,
	 Address			CHARACTER VARYING(25) NOT NULL UNIQUE,
	 Email				CHARACTER VARYING(25) NOT NULL UNIQUE,
	 BankAccount		numeric(17) NOT NULL UNIQUE,
	 primary key (PublisherName)
	);
	
alter table BookPublisher
add foreign key (PublisherName) references Publisher(PublisherName);

create table if not exists PublisherPhone
	(
		PublisherName	CHARACTER VARYING(25) NOT NULL,
		PhoneNumber		numeric(13) NOT NULL UNIQUE,
		primary key (PublisherName, PhoneNumber),
		foreign key (PublisherName) references Publisher(PublisherName)	
	);

-- BONUS, cauculate the revenue by author
create or replace view authorSales As
	with bs as
		(select book.isbn, BookAuthor.author, book.sellsamount as sells 
		from BookAuthor 
		left join book 
		on book.isbn=BookAuthor.isbn)
	select 	author, sum(sells)as sales
	from bs
	group by author;


create or replace view SaleExpend As
	with 
	bookSale (isbn, revenue) as (
		select book.isbn, book.sellsamount * book.SellingPrice from book), 
	bookExp (isbn, purchaseTotal) as (
		select book.isbn, (book.sellsamount + book.quantityInStock * book.PurchasePrice) from book),
	publisherExp (isbn, publishershare) as (
		select bookSale.isbn, bookSale.revenue * percentage as publisherExpend from bookSale natural join bookpublisher)

select 
t1.isbn, revenue, purchaseTotal, publishershare, revenue - purchaseTotal - publishershare as profit 
from (bookSale natural join bookExp) as t1 left join publisherExp on t1.isbn = publisherExp.isbn;

-- information for best author by sales unit count
create or replace view bestauthor_amount As
	with bsa as
		(select book.isbn, BookAuthor.author, sellsamount 
		from BookAuthor 
		left join book 
		on book.isbn=BookAuthor.isbn)
	select 	author, sum(sellsamount) as salesa
	from bsa
	group by author;
	

-- information for best author based on total revenue per author
create or replace view bestauthor_sales As
	with bs as
		(select book.isbn, BookAuthor.author, (book.sellsamount*book.sellingprice) as sells 
		from BookAuthor 
		left join book 
		on book.isbn=BookAuthor.isbn)
	select 	author, sum(sells)as sales
	from bs
	group by author;
	


-- BONUS, cauculate the revenue by genre
create or replace view genreSales As
	with bs as
		(select book.isbn, bookgenre.genre, book.SellsAmount as sells 
		from bookgenre 
		left join book 
		on book.isbn=bookgenre.isbn)
	select 	genre, sum(sells)as sales
	from bs
	group by genre;

-- BONUS, use to see which publisher creates the most profit for the books store
create or replace view PublisherTotalSale AS
	with PublisherTotalSells as (
		with PublisherSells as(
			select publishername, bookname, ((sellingprice-purchaseprice - sellingprice * BookPublisher.percentage)*sellsamount) as sells
			from BookPublisher join book
			on bookpublisher.ISBN = book.isbn)

			select publishername, sum(sells) as total
			from PublisherSells
			group by publishername)

		select *
		from PublisherTotalSells;

-- BONUS get the publisher sells the most book
create or replace view bestPublisher_amount AS
	with PublisherTotalAmount as (
		with PublisherAmount as(
			select publishername, bookname, sellsamount
			from BookPublisher join book
			on bookpublisher.ISBN = book.isbn)

			select publishername, sum(sellsamount) as total
			from PublisherAmount
			group by publishername)

		select *
		from PublisherTotalAmount;

select *
from bestpublisher_amount
where total = (select max(total) from bestpublisher_amount);

-- create view to get the selling of last month per book.
create or replace view lastMonthSell AS
	with lastMonthDate (lastMonthDate) AS (
		select current_date - 30
	)

	select ISBN, sum(Quantity) as sellAmount from (OrderBook o Join SystemOrder s on o.orderNumber = s.orderNumber)as combinedtable
		where combinedtable.date <= current_date AND combinedtable.date > (select lastMonthDate from lastMonthDate)
		GROUP by ISBN

        

