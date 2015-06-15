CREATE TABLE [dbo].[UmowaAuto]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Data_wystawienia] DATETIME NOT NULL, 
    [Id_reprezentant] INT NULL, 
    [Id_uzytkownik] INT NOT NULL, 
    [Id_pojazdu] INT NOT NULL, 
    [Id_wniosku] INT NOT NULL, 
    [Stawka] FLOAT NOT NULL, 
    [Data_od] DATETIME NOT NULL, 
    [Data_do] DATETIME NOT NULL,
	[Stan] INT NOT NULL, 
    CONSTRAINT [Id11] FOREIGN KEY ([Id_reprezentant]) REFERENCES [Uzytkownicy]([Id]),
	CONSTRAINT [Id12] FOREIGN KEY ([Id_uzytkownik]) REFERENCES [Uzytkownicy]([Id]),
	CONSTRAINT [Id13] FOREIGN KEY ([Id_pojazdu]) REFERENCES [Pojazdy]([Id]),
	CONSTRAINT [Id14] FOREIGN KEY ([Id_wniosku]) REFERENCES [ZgodaWniosekWyjazdowy]([Id])
)
