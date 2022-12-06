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




