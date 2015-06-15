﻿CREATE TABLE [dbo].[WniosekWyjazdowy]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Id_uzytkownika] INT NOT NULL, 
    [Cel] VARCHAR(50) NOT NULL, 
    [Uzasadnienie] VARCHAR(50) NOT NULL, 
    [Osrodek] VARCHAR(50) NOT NULL, 
    [Kraj] VARCHAR(50) NOT NULL, 
    [Miejscowosc] VARCHAR(50) NOT NULL, 
    [Data_wyjazdu] DATETIME NOT NULL, 
    [Data_powrotu] DATETIME NOT NULL, 
    [Srodek_lokomocji] VARCHAR(50) NOT NULL, 
    [Zrodlo_finansowania] VARCHAR(50) NOT NULL, 
    [Diety] FLOAT NOT NULL, 
    [Przejazd] FLOAT NOT NULL, 
    [Zakwaterowanie] FLOAT NOT NULL, 
    [Wyżywienie] FLOAT NOT NULL, 
    [Oplata_konferencyjna] FLOAT NOT NULL, 
    [Inne] FLOAT NOT NULL, 
    [Data_wystawienia] DATETIME NOT NULL, 
    [Id_przelozony] INT NULL, 
    [Id_kierownik_pracy] INT NULL, 
    [Id_kierownik_jednostki] INT NULL, 
    [Stan] INT NOT NULL, 
    [Id_decyzyjna] INT NULL, 
    [Krajowy] BIT NOT NULL, 
    CONSTRAINT [Id1] FOREIGN KEY ([Id_uzytkownika]) REFERENCES [Uzytkownicy]([Id]),
	CONSTRAINT [Id4] FOREIGN KEY ([Id_przelozony]) REFERENCES [Uzytkownicy]([Id]),
	CONSTRAINT [Id5] FOREIGN KEY ([Id_kierownik_pracy]) REFERENCES [Uzytkownicy]([Id]),
	CONSTRAINT [Id6] FOREIGN KEY ([Id_kierownik_jednostki]) REFERENCES [Uzytkownicy]([Id]),
	CONSTRAINT [Id7] FOREIGN KEY ([Id_decyzyjna]) REFERENCES [Uzytkownicy]([Id])
)
