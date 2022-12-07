-- fucntion to insert new book, this is a function called by Owner
-- assume one genre related, use separate query to set genres if there are more
-- assume one author related, use separate query to set authors if there are more
-- assume one publisher related, and the publisher is exist in the database, use separate query to set publishers if there are more
-- Details for each on please refer to query.sql file
create or replace function insertNewBook
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

