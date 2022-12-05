-- Insert initial Publishers
INSERT into Publisher 
values ('Bloomsbury Publishing', '50 Bedford Square, London', 'contact@bloomsbury.com ', '12345678909876543'), -- Haryy Potter
('Allen & Unwin', '83 Alexander StCrows Nest', 'UK@allenandunwin.com', '12345678909876544'); -- lord of the rings


Insert into PublisherPhone
values 
    ('Bloomsbury Publishing', 1234567890987), 
    ('Bloomsbury Publishing', 1234567890988), 
    ('Bloomsbury Publishing', 1234567890989), 
    ('Allen & Unwin', 1234567890990);


-- Insert initial books
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

-- insert initial users
insert into SystemUser
values
    ('user1', 'ottawa bank street', False),
    ('user2', 'ottawa Carleton University', False),
    ('admin1', 'ottawa Downtown', True);




