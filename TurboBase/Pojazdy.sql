CREATE TABLE [dbo].[Pojazdy]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Rodzaj] VARCHAR(50) NULL, 
    [Marka] VARCHAR(50) NULL, 
    [Numer_rejestracyjny] VARCHAR(50) NULL, 
    [Pojemnosc] VARCHAR(50) NULL, 
    [Wlasciciel_id] INT NULL
)
