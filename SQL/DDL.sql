-- create table SystemUser
create table if not exists SystemUser
	(UserName		CHARACTER VARYING(15) NOT NULL UNIQUE,
	 Address		CHARACTER VARYING(50),
	 isAdmin		Bool NOT NULL,
	 primary key (UserName)
	);

-- A sequence used for the updating the ordernumber
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

-- create table Book
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

-- create table OrderBook
create table if not exists OrderBook
	( OrderNumber		INT NOT NULL,
	 ISBN				numeric(13) NOT NULL,
	 Quantity			INT NOT NULL,
	 primary key (OrderNumber,ISBN),
	 foreign key (OrderNumber) references SystemOrder(OrderNumber),
	 foreign key (ISBN) references Book(ISBN)
	);


-- Set the ISBN foreign key or OrderBook
alter table OrderBook
add foreign key (ISBN) references Book(ISBN);

-- create table BookGenre
create table if not exists BookGenre
	(ISBN				numeric(13) NOT NULL, 
	 Genre				CHARACTER VARYING(25) NOT NULL,
	 primary key (ISBN, Genre),	 
	 foreign key (ISBN) references Book(ISBN)
	);

-- create table BookAuthor
create table if not exists BookAuthor
	(ISBN				numeric(13) NOT NULL UNIQUE,
	 Author				CHARACTER VARYING(25) NOT NULL,
	 primary key (ISBN,Author),
	 foreign key (ISBN) references Book(ISBN)
	);

-- create table BookPublisher
create table if not exists BookPublisher
	(ISBN				numeric(13) NOT NULL,
	 PublisherName	 	CHARACTER VARYING(25) NOT NULL,
	 Percentage			float(2) NOT NULL,
	 primary key (ISBN,PublisherName),
	 foreign key (ISBN) references Book(ISBN)
	);
-- create table Publisher
create table if not exists Publisher
	(PublisherName		CHARACTER VARYING(25) NOT NULL UNIQUE,
	 Address			CHARACTER VARYING(25) NOT NULL UNIQUE,
	 Email				CHARACTER VARYING(25) NOT NULL UNIQUE,
	 BankAccount		numeric(17) NOT NULL UNIQUE,
	 primary key (PublisherName)
	);

-- create foreign key for BookPublisher	
alter table BookPublisher
add foreign key (PublisherName) references Publisher(PublisherName);

-- create table PublisherPhone
create table if not exists PublisherPhone
	(
		PublisherName	CHARACTER VARYING(25) NOT NULL,
		PhoneNumber		numeric(13) NOT NULL UNIQUE,
		primary key (PublisherName, PhoneNumber),
		foreign key (PublisherName) references Publisher(PublisherName)	
	);

-- create book report
create or replace view book_report As
	select isbn, bookname, sellsamount, quantityinstock, (purchaseprice * (sellsamount + quantityinstock)) as purchaseCost, (sellingprice * sellsamount) as revenue
	,  (sellingprice * sellsamount * percentage) as publisherShared
	,  (sellingprice * sellsamount) - (purchaseprice * (sellsamount + quantityinstock)) -(sellingprice * sellsamount * percentage) as profit
	from book natural join bookpublisher;

-- create publisher report
create or replace view publisher_report as 
	select publishername, sum(sellsamount) as book_unit_sold, sum(revenue) as revenue_created, sum(profit) as profit_created
		from bookpublisher join book_report 
		on book_report.isbn = bookpublisher.isbn
		group by publishername;

-- create genre report
create or replace view genre_report as 
	select genre, sum(sellsamount) as book_unit_sold, sum(revenue) as revenue_created, sum(profit) as profit_created
		from bookgenre join book_report 
		on book_report.isbn = bookgenre.isbn
		group by genre;

-- create author report 
create view author_report as 
	select author, sum(sellsamount) as book_unit_sold, sum(revenue) as revenue_created, sum(profit) as profit_created
		from bookauthor join book_report 
		on book_report.isbn = bookauthor.isbn
		group by author;

-- An overall report of revenue, cost, and profit
create or replace view saleExpend_report as 
	select sum(revenue) as total_revenue, sum(purchasecost) as book_purchase_cost, sum(publishershared) as publisherShare, sum(profit) as total_profit from book_report;
	

-- create view to get the selling of last month per book.
create or replace view lastMonthSell AS
	with lastMonthDate (lastMonthDate) AS (
		-- we use the current date minus 30 which give us exactly the date in one month before
		select current_date - 30
	)

	select ISBN, sum(Quantity) as sellAmount from (OrderBook o Join SystemOrder s on o.orderNumber = s.orderNumber)as combinedtable
		where combinedtable.date <= current_date AND combinedtable.date > (select lastMonthDate from lastMonthDate)
		GROUP by ISBN

        

