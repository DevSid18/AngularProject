IF OBJECT_ID('dbo.UserLoginTable', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.UserLoginTable;
END
GO

CREATE TABLE [dbo].[UserLoginTable](
	[userLoginId] [int] IDENTITY(1,1) NOT NULL,
	[userName] [varchar](200) NOT NULL,
	[password] [varchar](200) NOT NULL,
	[confirmPassword] [varchar](200) NOT NULL,
	[createdDate] [datetime] NULL,
	[updatedDate] [datetime] NULL,
	[isActive] [bit] NULL,
	[customerId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[userLoginId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserLoginTable]  WITH CHECK ADD  CONSTRAINT [FK__UserLogin__custo__7D439ABD] FOREIGN KEY([userLoginId])
REFERENCES [dbo].[CustomerTable] ([customerId])
GO

ALTER TABLE [dbo].[UserLoginTable] CHECK CONSTRAINT [FK__UserLogin__custo__7D439ABD]
GO