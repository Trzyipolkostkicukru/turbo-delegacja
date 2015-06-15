CREATE TABLE [dbo].[OswiadczeniePozaGranica]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Id_uzytkownika] INT NOT NULL, 
    [Jednostka] INT NOT NULL, 
    [Id_wniosek] INT NOT NULL, 
    [Wyzywienie_pelne] BIT NOT NULL, 
	[Wyzywienie_czesciowe] BIT NOT NULL, 
    [Sniadanie] INT NOT NULL,
	[Obiad] INT NOT NULL,
	[Kolacja] INT NOT NULL, 
    [Noclegi] BIT NOT NULL, 
    [Wyzywienie_hotel] BIT NOT NULL, 
    [Liczba_miejscowosci] INT NOT NULL, 
    [Organizator_przejazd] BIT NOT NULL, 
    [Uzytkownik_przejazd] BIT NOT NULL, 
    [Uzytkownik_przejazd_opis] VARCHAR(50) NULL, 
    [Koszt_dojazd] BIT NOT NULL, 
    [Uwagi] VARCHAR(100) NULL,
	CONSTRAINT [Id25] FOREIGN KEY ([Id_uzytkownika]) REFERENCES [Uzytkownicy]([Id]),
	CONSTRAINT [Id26] FOREIGN KEY ([Id_wniosek]) REFERENCES [WniosekWyjazdowy]([Id])
)
