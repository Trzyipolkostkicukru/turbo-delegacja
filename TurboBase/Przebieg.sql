CREATE TABLE [dbo].[Przebiegi]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Id_uzytkownika] INT NOT NULL, 
    [Id_wniosku] INT NOT NULL, 
    [Jednostka_organizacyjna] VARCHAR(50) NOT NULL, 
    [Id_pracodawcy] INT NOT NULL, 
    [Tabela] VARCHAR(500) NOT NULL,
	CONSTRAINT [Id15] FOREIGN KEY ([Id_uzytkownika]) REFERENCES [Uzytkownicy]([Id]),
	CONSTRAINT [Id16] FOREIGN KEY ([Id_wniosku]) REFERENCES [ZgodaWniosekWyjazdowy]([Id]),
	CONSTRAINT [Id17] FOREIGN KEY ([Id_pracodawcy]) REFERENCES [Uzytkownicy]([Id])
)
