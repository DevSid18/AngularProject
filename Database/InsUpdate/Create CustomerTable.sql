DROP TABLE CustomerTable

USE [StoreManagementDb]
GO

/****** Object:  Table [dbo].[CustomerTable]    Script Date: 11-11-2024 00:22:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CustomerTable](
	[customerId] [int] IDENTITY(1,1) NOT NULL,
	[firstName] [varchar](200) NULL,
	[middleName] [varchar](200) NULL,
	[lastName] [varchar](200) NULL,
	[country] [varchar](100) NOT NULL,
	[state] [varchar](200) NOT NULL,
	[district] [varchar](200) NOT NULL,
	[phyAddress] [varchar](max) NULL,
	[email] [varchar](200) NULL,
	[contact] [varchar](15) NULL,
	[gender] [varchar](100) NOT NULL,
	[password] [varchar](200) NOT NULL,
	[confirmPassword] [varchar](200) NOT NULL,
	[createdDate] [datetime] NULL,
	[updatedDate] [datetime] NULL,
	[isActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[customerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[CustomerTable] ADD  DEFAULT ('') FOR [country]
GO

ALTER TABLE [dbo].[CustomerTable] ADD  DEFAULT ('') FOR [state]
GO

ALTER TABLE [dbo].[CustomerTable] ADD  DEFAULT ('') FOR [district]
GO

ALTER TABLE [dbo].[CustomerTable] ADD  DEFAULT ('Unknown') FOR [gender]
GO

ALTER TABLE [dbo].[CustomerTable] ADD  DEFAULT ('') FOR [password]
GO

ALTER TABLE [dbo].[CustomerTable] ADD  DEFAULT ('') FOR [confirmPassword]
GO


