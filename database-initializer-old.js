//import postgreSql module from npm
import pg from 'pg' //library for define/modify Tabele
import pgtools from "pgtools";

const Client = pg.Client
//an object about the database configuration
const config = {
  user: "postgres",
  password: "107499538", //type your own database passoword here
  port: 5432,
  host: "localhost",
};

//drop the table do not use it (I use it for test)
// pgtools.dropdb(config, "bookstore", function (err, res) {
//   if (err) {
//     console.error(err);
//   }
//   console.log(res);
// });

// made a client object for establish connection
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "107499538", //type your own database passoword here
  database: "bookstore",
});
//defind drop the table query
let dropTable = `
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
let createTable = `create table SystemUser
	(UserName		CHARACTER VARYING(15) NOT NULL UNIQUE,
	 Address		CHARACTER VARYING(50),
	 isAdmin		Bool NOT NULL,
	 primary key (UserName)
	);

create table SystemOrder
	(OrderNumber		numeric(10) NOT NULL UNIQUE,
	 Date				Date NOT NULL,
	 ShippingAddress	CHARACTER VARYING(25) NOT NULL,
	 UserName			CHARACTER VARYING(15) NOT NULL,
	 primary key (OrderNumber),
	 foreign key (UserName) references SystemUser(UserName)
	);

create table OrderBook
	(OrderNumber		numeric(10) NOT NULL,
	 ISBN				numeric(13) NOT NULL,
	 Quantity			INT NOT NULL,
	 primary key (OrderNumber,ISBN),
	 foreign key (OrderNumber) references SystemOrder(OrderNumber)
	);

create table Book
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

create table BookGenre
	(ISBN				numeric(13) NOT NULL,
	 Genre				CHARACTER VARYING(25) NOT NULL,
	 primary key (ISBN, Genre),
	 foreign key (ISBN) references Book(ISBN)
	);

create table BookAuthor
	(ISBN				numeric(13) NOT NULL UNIQUE,
	 Author				CHARACTER VARYING(25) NOT NULL,
	 primary key (ISBN,Author),
	 foreign key (ISBN) references Book(ISBN)
	);

create table BookPublisher
	(ISBN				numeric(13) NOT NULL,
	 PublisherName	 	CHARACTER VARYING(25) NOT NULL,
	 Percentage			float(2) NOT NULL,
	 primary key (ISBN,PublisherName),
	 foreign key (ISBN) references Book(ISBN)
	);

create table Publisher
	(PublisherName		CHARACTER VARYING(25) NOT NULL UNIQUE,
	 Address			CHARACTER VARYING(25) NOT NULL UNIQUE,
	 Email				CHARACTER VARYING(25) NOT NULL UNIQUE,
	 BankAccount		numeric(17) NOT NULL UNIQUE,
	 primary key (PublisherName)
	);

alter table BookPublisher
add foreign key (PublisherName) references Publisher(PublisherName);

create table PublisherPhone
	(
		PublisherName	CHARACTER VARYING(25) NOT NULL,
		PhoneNumber		numeric(13) NOT NULL UNIQUE,
		primary key (PublisherName, PhoneNumber),
		foreign key (PublisherName) references Publisher(PublisherName)
	);

create or replace view lastMonthSell AS
	with lastMonthDate (lastMonthDate) AS (
		select current_date - 30
	)

	select ISBN, sum(Quantity) as sellAmount from (OrderBook o Join SystemOrder s on o.orderNumber = s.orderNumber)as combinedtable
		where combinedtable.date <= current_date AND combinedtable.date > (select lastMonthDate from lastMonthDate)
		GROUP by ISBN

  `;

//define insert data query
let insertDataQuery = `INSERT into Publisher
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
    (9780747532743, 'Adventure'),
    (9780747532743, 'Fantasy'),
    (9780747532743, 'Narrative'),
    (9780747538486, 'Children'),
    (9780747538486, 'Adventure'),
    (9780747538486, 'Fantasy'),
    (9780747538486, 'Narrative'),
    (9780747542155, 'Children'),
    (9780747542155, 'Adventure'),
    (9780747542155, 'Fantasy'),
    (9780747542155, 'Narrative'),
    (9780747546245, 'Children'),
    (9780747546245, 'Adventure'),
    (9780747546245, 'Fantasy'),
    (9780747546245, 'Narrative'),
    (9780747551003, 'Children'),
    (9780747551003, 'Adventure'),
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
//try to connect
client.connect((err) => {
  //for no book store database (fail to connect)
  if (err) {
    //for no database condition
    //now define the new database with name: bookstore
    pgtools.createdb(config, "bookstore", function (err, res) {
      if (err) {
        console.error(err);
      }
      //then try to connect again
      client.connect();
    });
  } else {
    console.log("connected");
  }
});
//drop old table
client.query(dropTable, (err, res) => {
  if (err) console.log(err);
  else console.log(res.rows);
});
//create new table
client.query(createTable, (err, res) => {
  if (err) console.log(err);
  else console.log(res.rows);
});
// insert data to the table
client.query(insertDataQuery, (err, res) => {
  if (err) console.log(err);
  else console.log(res.rows);
  client.end(); //end the connection, otherwise this script will not be ended
});
