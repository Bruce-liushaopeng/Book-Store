//define the drop table query

exports.databaseName = "bookstore5"
exports.pw = "Lsp75908635"

exports.dropTable = `
DROP TABLE IF EXISTS PublisherPhone CASCADE;
DROP TABLE IF EXISTS BookPublisher CASCADE;
DROP TABLE IF EXISTS Publisher CASCADE;
DROP TABLE IF EXISTS BookAuthor CASCADE;
DROP TABLE IF EXISTS SystemOrder CASCADE;
DROP TABLE IF EXISTS SystemUser CASCADE;
DROP TABLE IF EXISTS OrderBook CASCADE;
DROP TABLE IF EXISTS BookGenre CASCADE;
DROP TABLE IF EXISTS Book CASCADE;
`;
//defind create the table query
exports.createTable = `-- create table SystemUser
create table if not exists SystemUser
	(UserName		CHARACTER VARYING(15) NOT NULL UNIQUE,
	 Address		CHARACTER VARYING(50),
	 isAdmin		Bool NOT NULL,
	 primary key (UserName)
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

-- create table SysetmOrder
create table if not exists SystemOrder
	(OrderNumber		numeric(10) NOT NULL UNIQUE, 
	 Date				Date NOT NULL,
	 ShippingAddress	CHARACTER VARYING(25) NOT NULL,		
	 UserName			CHARACTER VARYING(15) NOT NULL,
	 primary key (OrderNumber),
	 foreign key (UserName) references SystemUser(UserName)
	);

create table if not exists OrderBook
	(OrderNumber		numeric(10) NOT NULL,
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

-- create view to get the selling of last month per book.
create or replace view lastMonthSell AS
	with lastMonthDate (lastMonthDate) AS (
		select current_date - 30
	)

	select ISBN, sum(Quantity) as sellAmount from (OrderBook o Join SystemOrder s on o.orderNumber = s.orderNumber)as combinedtable
		where combinedtable.date <= current_date AND combinedtable.date > (select lastMonthDate from lastMonthDate)
		GROUP by ISBN
        

`;

//define insert data query
exports.initialDataQuery = `-- Insert initial Publishers
INSERT into Publisher 
values ('Bloomsbury Publishing', '50 Bedford Square, London', 'contact@bloomsbury.com ', '12345678909876543'), -- Haryy Potter
('Houghton Mifflin Harcourt', '83 Alexander StCrows Nest', 'UK@allenandunwin.com', '12345678909876544'), -- lord of the rings
('Bantam Spectra', '230 West Street, NewYork', 'support@sibme.com', '12345678909876513'); -- the Game of the Thrones

--Insert into PublisherPhone
values 
    ('Bloomsbury Publishing', 1234567890987), 
    ('Bloomsbury Publishing', 1234567890988), 
    ('Bloomsbury Publishing', 1234567890989), 
    ('Houghton Mifflin Harcourt', 1234567890990),
    ('Bantam Spectra',441232436789),
    ('Bantam Spectra',44123456789);


-- Insert initial books
insert into Book
values (9780747532743, 'Harry Potter and the Philosopher’s Stone', 400, 15, 20, 0, 15 ),
 (9780747538486, 'Harry Potter and the Chamber of Secrets', 250, 15, 20, 0, 15 ),
 (9780747542155, 'Harry Potter and the Prisoner of Azkaban', 500, 15, 20, 0, 15 ),
 (9780747551003, 'Harry Potter and the Order of the Phoenix', 400, 15, 20, 0, 5 ),
 (9780747546245, 'Harry Potter and the Goblet of Fire', 300, 15, 20, 0, 15 ),
 (9780618042203, 'The Lord of the Ring: The Ring Sets Out',350, 10,25,0,12),
 (9780618042210, 'The Lord Of The Rings: The Ring Goes South',253, 10,25,0,20),
 (9780618083589, 'The Lord Of The Rings: The Treason of Isengard',604, 10,25,0,17),
 (9780618042234, 'The Lord Of The Rings: The Ring Goes East', 189,10,25,0,11),
 (9780261102231, 'The Lord Of The Rings: The War of the Ring',476,10,25,0,13),
(9780618083565, 'The Lord Of The Rings: The End of the Third Age',  176,10,25,0,18),
(9780553588484, 'A Game of Thrones 1',  835,20,50,0,20),
(9780553381696, 'A Game of Thrones: A Clash of Kings',  969,20,50,0,20),
(9780553573428, 'A Game of Thrones: A Storm of Swords',  1177,20,50,0,20),
(9780553582024, 'A Game of Thrones: A Feast for Crows',   1061,20,50,0,20),
(9780553582017, 'A Game of Thrones: A Dance with Dragons',  1125,20,50,0,20),
(9780002247412, 'A Game of Thrones: The Winds of Winter',  1023,20,50,0,20);

-- Insert initial bookGenre
insert into BookGenre
values
    (9780747532743, 'Children'),
    (9780747532743, 'Advanture'),
    (9780747532743, 'Fantasy'),
    (9780747532743, 'Narrative'),
    (9780747538486, 'Children'),
    (9780747538486, 'Advanture'),
    (9780747538486, 'Fantasy'),
    (9780747538486, 'Narrative'),
    (9780747542155, 'Children'),
    (9780747542155, 'Advanture'),
    (9780747542155, 'Fantasy'),
    (9780747542155, 'Narrative'),
    (9780747546245, 'Children'),
    (9780747546245, 'Advanture'),
    (9780747546245, 'Fantasy'),
    (9780747546245, 'Narrative'),
    (9780618042203,'Advanture'),
    (9780618042203,'Fantasy'),
    (9780618042203,'Fiction'),
    (9780618042203,'Classics'),
    (9780618042210,'Advanture'),
    (9780618042210,'Fantasy'),
    (9780618042210,'Fiction'),
    (9780618042210,'Classics'),
    (9780618083589,'Advanture'),
    (9780618083589,'Fantasy'),
    (9780618083589,'Fiction'),
    (9780618083589,'Classics'),
    (9780618042234,'Advanture'),
    (9780618042234,'Fantasy'),
    (9780618042234,'Fiction'),
    (9780618042234,'Classics'),
    (9780261102231,'Advanture'),
    (9780261102231,'Fantasy'),
    (9780261102231,'Fiction'),
    (9780261102231,'Classics'),
    (9780618083565,'Advanture'),
    (9780618083565,'Fantasy'),
    (9780618083565,'Fiction'),
    (9780618083565,'Classics'),
    (9780553588484,'Advanture'),
    (9780553588484,'Fantasy'),
    (9780553588484,'Fiction'),
    (9780553588484,'Epic'),
    (9780553381696,'Advanture'),
    (9780553381696,'Fantasy'),
    (9780553381696,'Fiction'),
    (9780553381696,'Epic'),
    (9780553573428,'Advanture'),
    (9780553573428,'Fantasy'),
    (9780553573428,'Fiction'),
    (9780553573428,'Epic'),
    (9780553582024,'Advanture'),
    (9780553582024,'Fantasy'),
    (9780553582024,'Fiction'),
    (9780553582024,'Epic'),
    (9780553582017,'Advanture'),
    (9780553582017,'Fantasy'),
    (9780553582017,'Fiction'),
    (9780553582017,'Epic'),
    (9780002247412,'Advanture'),
    (9780002247412,'Fantasy'),
    (9780002247412,'Fiction'),
    (9780002247412,'Epic');






insert into BookAuthor
values 
    (9780747532743, 'J.K. Rowling'),
    (9780747538486, 'J.K. Rowling'),
    (9780747542155, 'J.K. Rowling'),
    (9780747546245, 'J.K. Rowling'),
    (9780618042203,'J.R.R. Tolkien'),
    (9780618042210,'J.R.R. Tolkien'),
    (9780618083589, 'J.R.R. Tolkien'),
    (9780618042234, 'J.R.R. Tolkien'),
    (9780261102231, 'J.R.R. Tolkien'),
    (9780618083565, 'J.R.R. Tolkien'),
    (9780553588484, 'George R. R. Martin'),
    (9780553381696, 'George R. R. Martin'),
    (9780553573428, 'George R. R. Martin'),
    (9780553582024, 'George R. R. Martin'),
    (9780553582017, 'George R. R. Martin'),
    (9780002247412, 'George R. R. Martin');

insert into BookPublisher
values 
    (9780747532743, 'Bloomsbury Publishing', 0.05),
    (9780747538486, 'Bloomsbury Publishing', 0.05),
    (9780747542155, 'Bloomsbury Publishing', 0.05),
    (9780747546245, 'Bloomsbury Publishing', 0.05),
    (9780618042203,'Houghton Mifflin Harcourt',0.09),
    (9780618042210,'Houghton Mifflin Harcourt',0.09),
    (9780618083589, 'Houghton Mifflin Harcourt',0.09),
    (9780618042234, 'Houghton Mifflin Harcourt',0.09),
    (9780261102231, 'Houghton Mifflin Harcourt',0.09),
    (9780618083565, 'Houghton Mifflin Harcourt',0.09),
    (9780553588484, 'Bantam Spectra', 1.12),
    (9780553381696, 'Bantam Spectra', 1.12),
    (9780553573428, 'Bantam Spectra', 1.12),
    (9780553582024, 'Bantam Spectra', 1.12),
    (9780553582017, 'Bantam Spectra', 1.12),
    (9780002247412, 'Bantam Spectra', 1.12);

-- insert initial users
insert into SystemUser
values
    ('user1', 'ottawa bank street', False),
    ('user2', 'ottawa Carleton University', False),
    ('admin1', 'ottawa Downtown', True);
`;

exports.initialFunctionQuery = `create or replace function insertNewBook	
(ISBN numeric(13), BookName varchar(50), NumberofPages INT, PurchasePrice float(2), SellingPrice float(2), InitialStock INT, author CHARACTER VARYING(25), genre CHARACTER VARYING(25), PublisherName CHARACTER VARYING(25), percentage numeric(2)) 	
RETURNS void AS $$	
BEGIN	
	--insert into Book table	
	insert into Book	
		values	
		(ISBN, BookName, NumberOfPages, PurchasePrice, SellingPrice, 0, InitialStock);	
	--insert into Book Author Table	
	insert into BookAuthor	
		values	
		(ISBN, author);	
	--insert into Book Publisher Table	
	insert into BookPublisher	
		values	
		(ISBN, PublisherName, percentage);	
	-- insert into BookGenre Table	
	insert into BookGenre	
		values	
		(ISBN, genre);	
END;	
$$ LANGUAGE plpgsql;	


create or replace function placeOrder
    (ISBN numeric(13), orderAmount int, orderNumber numeric(10), shippingAddress CHARACTER VARYING(25), userName CHARACTER VARYING(15)) 
    RETURNS void AS $$
    DECLARE
        currDate Date := current_date;
    BEGIN
        --insert into SystemOrder table
		insert into SystemOrder
			values
			(placeOrder.orderNumber, currDate, placeOrder.shippingAddress, placeOrder.userName);
		--insert into OrderBook table
        insert into orderbook
            values
            (placeOrder.orderNumber, placeOrder.ISBN, orderAmount);
		 
		-- update QuantityInStock and selling amount for book
		update Book
			set quantityInStock = quantityInStock - orderAmount,
                SellsAmount = SellsAmount + orderAmount
			where Book.ISBN = placeOrder.ISBN;
    END;
$$ LANGUAGE plpgsql;`;

exports.initialTriggerQuery = `CREATE or replace FUNCTION book_stock_check() RETURNS trigger AS $book_stock_check$
BEGIN
    -- checking book stock quatities, if less than 10, auto plus 15
    IF NEW.quantityInStock < 10 THEN
        -- auto ordering and stock up
        update book set quantityInStock = NEW.quantityInStock + (select SellsAmount from lastMonthSell where lastMonthSell.ISBN = book.ISBN) 
        where book.ISBN = NEW.ISBN;
    END IF;
    RETURN NEW;
END;
$book_stock_check$ LANGUAGE plpgsql;

CREATE or replace TRIGGER book_stock_check AFTER UPDATE ON Book	
FOR EACH ROW EXECUTE FUNCTION book_stock_check();`	


exports.getAllBooks = `select * from book`	
exports.getSellExpendReport = `select * from SaleExpend`	


exports.getAllBooks = `select * from book`;
