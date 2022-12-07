Insert initial Publishers
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