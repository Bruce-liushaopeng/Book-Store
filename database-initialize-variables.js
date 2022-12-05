
//defind create the table query
let createTable = `-- create table SystemUser
create table if not exists SystemUser
	(UserName		CHARACTER VARYING(15) NOT NULL UNIQUE,
	 Address		CHARACTER VARYING(50),
	 isAdmin		Bool NOT NULL,
	 primary key (UserName)
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
	 foreign key (OrderNumber) references SystemOrder(OrderNumber)
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
let initialDataQuery = `INSERT into Publisher
values ('Bloomsbury Publishing', '50 Bedford Square, London', 'contact@bloomsbury.com ', '12345678909876543'), -- Haryy Potter
('Allen & Unwin', '83 Alexander StCrows Nest', 'UK@allenandunwin.com', '12345678909876544'); -- lord of the rings
Insert into PublisherPhone
values
    ('Bloomsbury Publishing', 1234567890987),
    ('Bloomsbury Publishing', 1234567890988),
    ('Bloomsbury Publishing', 1234567890989),
    ('Allen & Unwin', 1234567890990);
insert into Book
values (9780747532743, 'Harry Potter and the Philosopher’s Stone', 400, 15, 20, 0, 15 ),
 (9780747538486, 'Harry Potter and the Chamber of Secrets', 250, 15, 20, 0, 15 ),
 (9780747542155, 'Harry Potter and the Prisoner of Azkaban', 500, 15, 20, 0, 15 ),
 (9780747551003, 'Harry Potter and the Order of the Phoenix', 400, 15, 20, 0, 5 ),
 (9780747546245, 'Harry Potter and the Goblet of Fire', 300, 15, 20, 0, 15 );
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
    (9780747551003, 'Children'),
    (9780747551003, 'Advanture'),
    (9780747551003, 'Fantasy'),
    (9780747551003, 'Narrative');
insert into BookAuthor
values
    (9780747532743, 'J.K. Rowling'),
    (9780747538486, 'J.K. Rowling'),
    (9780747542155, 'J.K. Rowling'),
    (9780747546245, 'J.K. Rowling');
insert into BookPublisher
values
    (9780747532743, 'Bloomsbury Publishing', 0.05),
    (9780747538486, 'Bloomsbury Publishing', 0.05),
    (9780747542155, 'Bloomsbury Publishing', 0.05),
    (9780747546245, 'Bloomsbury Publishing', 0.05);
insert into SystemUser
values
    ('user1', 'ottawa bank street', False),
    ('user2', 'ottawa Carleton University', False),
    ('admin1', 'ottawa Downtown', True);
`;

let initialFunctionQuery = `create or replace function insertNewBook
(ISBN numeric(13), BookName varchar(50), NumberofPages INT, PurchasePrice float(2), SellingPrice float(2), InitialStock INT, author CHARACTER VARYING(25), genre CHARACTER VARYING(25), PublisherName CHARACTER VARYING(25)) 
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

    -- insert into BookPublisher Table
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
$$ LANGUAGE plpgsql;`

let initialTriggerQuery = `CREATE or replace FUNCTION book_stock_check() RETURNS trigger AS $book_stock_check$
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

let getAllBooks = `select * from book`

let getSellExpendReport = `select * from SaleExpend`

module.exports = { createTable, initialDataQuery, getAllBooks, initialFunctionQuery, initialTriggerQuery}