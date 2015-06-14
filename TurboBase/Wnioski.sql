CREATE TABLE [dbo].[Wnioski]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Typ] VARCHAR(50) NULL, 
    [Id_uzytkownika] VARCHAR(50) NULL, 
    [Id_wniosku] VARCHAR(50) NULL, 
    [Sciezka] VARCHAR(50) NULL, 
    [Data] DATETIME NULL, 
    [Stan] INT NULL
)
