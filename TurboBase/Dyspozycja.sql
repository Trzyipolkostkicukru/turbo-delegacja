CREATE TABLE [dbo].[Dyspozycja]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Filia] VARCHAR(50) NOT NULL, 
    [Rachunek_zleceniodawcy] INT NOT NULL, 
    [Numer_klienta] INT NOT NULL, 
    [Na_rzecz] VARCHAR(50) NOT NULL, 
    [Kwota] FLOAT NOT NULL, 
    [Waluta] VARCHAR(50) NOT NULL, 
    [Id_uzytkownika] INT NOT NULL, 
    [Data_wystawienia] DATETIME NOT NULL, 
    [Id_zleceniodawcy] INT NOT NULL, 
    [Data_przyjecia] NCHAR(10) NULL, 
    [Podpis_pracownika] VARCHAR(50) NULL,
	[Stan] INT NOT NULL, 
    CONSTRAINT [Id18] FOREIGN KEY ([Id_uzytkownika]) REFERENCES [Uzytkownicy]([Id]),
	CONSTRAINT [Id19] FOREIGN KEY ([Id_zleceniodawcy]) REFERENCES [Uzytkownicy]([Id]),
	CONSTRAINT [Id20] FOREIGN KEY ([Id_uzytkownika]) REFERENCES [Uzytkownicy]([Id]),
)
