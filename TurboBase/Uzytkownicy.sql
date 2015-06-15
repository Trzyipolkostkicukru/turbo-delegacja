CREATE TABLE [dbo].[Uzytkownicy]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [UsosLogin] INT NOT NULL, 
    [UsosPass] VARCHAR(50) NOT NULL, 
    [Ranga] VARCHAR(50) NOT NULL, 
    [Podpis] VARCHAR(50) NOT NULL, 
    [Imie] VARCHAR(50) NOT NULL, 
    [Nazwisko] VARCHAR(50) NOT NULL, 
    [Stopien] VARCHAR(50) NOT NULL, 
    [Kontakt] VARCHAR(50) NOT NULL, 
    [Zatrudnienie] VARCHAR(50) NOT NULL, 
    [Stanowisko] VARCHAR(50) NOT NULL
)
