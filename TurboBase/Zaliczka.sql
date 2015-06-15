CREATE TABLE [dbo].[Zaliczka]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Data_wystawienia] DATETIME NOT NULL, 
    [Id_uzytkownika] INT NOT NULL, 
    [Id_wniosku] INT NOT NULL, 
    [Diety] VARCHAR(50) NOT NULL, 
    [Hotele] VARCHAR(50) NOT NULL, 
    [Dieta_dojazdowa] VARCHAR(50) NOT NULL, 
    [Ryczalt] VARCHAR(50) NOT NULL, 
    [Oplata_rejestracyjna] VARCHAR(50) NOT NULL, 
    [Bilety kolejowe] VARCHAR(50) NOT NULL, 
    [Waluta] VARCHAR(50) NOT NULL, 
    [Zrodlo] VARCHAR(50) NOT NULL, 
    [Kurs] FLOAT NOT NULL,
	CONSTRAINT [Id21] FOREIGN KEY ([Id_uzytkownika]) REFERENCES [Uzytkownicy]([Id]),
	CONSTRAINT [Id22] FOREIGN KEY ([Id_wniosku]) REFERENCES [ZgodaWniosekWyjazdowy]([Id])

)
