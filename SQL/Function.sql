-- fucntion to insert new book, this is a function called by Owner
-- assume one genre related, use separate query to set genres if there are more
-- assume one author related, use separate query to set authors if there are more
-- assume one publisher related, and the publisher is exist in the database, use separate query to set publishers if there are more
-- Details for each on please refer to query.sql file
create or replace function insertNewBook
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

-- test for insert FUNCTION insertNewBook
select insertNewBook(9780747532798, 'Harry Potter and the Philosophers Stone1', 400, 15, 20, 15, 'J.K. Rowling', 'Advanture',  'Bloomsbury Publishing');


-- function for place an order on a single book
create or replace function addSystemOrder
    ( shippingAddress CHARACTER VARYING(25), userName CHARACTER VARYING(15)) 
    RETURNS void AS $$
    DECLARE
        currDate Date := current_date;
    BEGIN
        --insert into SystemOrder table
		insert into SystemOrder
			values
			(nextval('sequenceNumber'), currDate, addSystemOrder.shippingAddress, addSystemOrder.userName) ;
    END;
$$ LANGUAGE plpgsql;

create or replace function updateOrderBook
    (ISBN numeric(13), orderAmount INT)
    RETURNS void AS $$
	Declare 
	orderNumber INT;
    BEGIN
		select max(systemorder.orderNumber) into orderNumber from systemorder;
        insert into orderbook
            values
            (orderNumber, updateOrderBook.ISBN, orderAmount);
		 
		-- update QuantityInStock and selling amount for book
		update Book
			set quantityInStock = quantityInStock - orderAmount,
                SellsAmount = SellsAmount + orderAmount
			where Book.ISBN = updateOrderBook.ISBN;
    END;
$$ LANGUAGE plpgsql;

-- test for placeOrder
select addSystemOrder('test address1', 'user2');
select updateOrderBook('9780747551003', 3)
update book set quantityInStock = quantityInStock - 1 where ISBN = 9780747546245

