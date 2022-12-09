-- trigger function when update book stock amount
CREATE or replace FUNCTION book_stock_check() RETURNS trigger AS $book_stock_check$
    BEGIN
        -- checking book stock quatities, if less than 10, auto plus thge amount where amout equal to the total sale in the last month.
        IF NEW.quantityInStock < 10 THEN
            -- auto ordering and stock up
            update book set quantityInStock = NEW.quantityInStock + (select SellsAmount from lastMonthSell where lastMonthSell.ISBN = book.ISBN) 
            where book.ISBN = NEW.ISBN;
        END IF;
        RETURN NEW;
    END;
$book_stock_check$ LANGUAGE plpgsql;

-- Trigger to listen on the update action on Book and invoke book_stock_check trigger function.
CREATE or replace TRIGGER book_stock_check AFTER UPDATE ON Book
    FOR EACH ROW EXECUTE FUNCTION book_stock_check();

