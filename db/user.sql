
CREATE TABLE USER(
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    birthday DATE,
    address_mail VARCHAR(70) NOT NULL,
    city VARCHAR(30) NOT NULL,
    postal_code VARCHAR(30) NOT NULL,
    country VARCHAR(30) NOT NULL,
    address VARCHAR(70) NOT NULL,
    password VARCHAR(150) NOT NULL,
    UNIQUE(address_mail)
);
