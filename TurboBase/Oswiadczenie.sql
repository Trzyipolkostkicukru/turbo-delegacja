CREATE TABLE [dbo].[Oswiadczenie]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Id_uzytkownika] INT NOT NULL, 
    [Jednostka] VARCHAR(50) NOT NULL, 
    [Jednostka_numer] VARCHAR(50) NOT NULL, 
    [Id_wniosek] INT NOT NULL, 
    [Data_wystawienia] DATETIME NOT NULL,
	[Stan] INT NOT NULL, 
    CONSTRAINT [Id9] FOREIGN KEY ([Id_uzytkownika]) REFERENCES [Uzytkownicy]([Id]),
	CONSTRAINT [Id10] FOREIGN KEY ([Id_wniosek]) REFERENCES [ZgodaWniosekWyjazdowy]([Id])
)
