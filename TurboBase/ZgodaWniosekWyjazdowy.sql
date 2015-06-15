CREATE TABLE [dbo].[ZgodaWniosekWyjazdowy]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Id_wniosek] INT NOT NULL, 
    [Numer] INT NOT NULL, 
    [Polecenie_wyjazdu] BIT NOT NULL, 
    [Podnoszenie_kwalifikacji] BIT NOT NULL, 
    [Stan] INT NOT NULL, 
    [Data_wystawienia] DATETIME NOT NULL, 
    [Id_upowaznionej] INT NOT NULL, 
    [Data_dzial] DATE NOT NULL, 
    [Podpis_dzial] VARCHAR(50) NOT NULL, 
    [Id_podpis_zaliczka] INT NULL, 
    [Data_zaliczka] DATETIME NULL, 
    CONSTRAINT [Id2] FOREIGN KEY ([Id_wniosek]) REFERENCES [WniosekWyjazdowy]([Id]),
	CONSTRAINT [Id3] FOREIGN KEY ([Id_upowaznionej]) REFERENCES [Uzytkownicy]([Id]),
	CONSTRAINT [Id8] FOREIGN KEY ([Id_podpis_zaliczka]) REFERENCES [Uzytkownicy]([Id])
)
