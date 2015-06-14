CREATE TABLE [dbo].[Uzytkownicy]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [UsosLogin] INT NULL, 
    [UsosPass] VARCHAR(50) NULL, 
    [Ranga] VARCHAR(50) NULL, 
    [Podpis] VARCHAR(50) NULL
)
