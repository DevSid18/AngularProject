USE [StoreManagementDb]
GO
/****** Object:  StoredProcedure [dbo].[USP_CUSTOMERS_ACTIONS]    Script Date: 11-11-2024 00:24:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[USP_CUSTOMERS_ACTIONS] 
	 @actionFlg VARCHAR(20)
	,@customerId INT = NULL
	,@firstName VARCHAR(300) = NULL
	,@middleName VARCHAR(300) = NULL
	,@lastName VARCHAR(300) = NULL
	,@country VARCHAR(100) = NULL
	,@state VARCHAR(200) = NULL
	,@district VARCHAR(200) = NULL
	,@phyAddress VARCHAR(300) = NULL
	,@email VARCHAR(100) = NULL
	,@contact VARCHAR(300) = NULL
	,@gender VARCHAR(100) = NULL
	,@password VARCHAR(200) = NULL
	,@confirmPassword VARCHAR(200) = NULL
	,@createdDate DATETIME = NULL
	,@updatedDate DATETIME = NULL
	,@isActive BIT
	AS
	--DECLARE
	-- @actionFlg VARCHAR(20)
	--,@customerId INT
	--,@firstName VARCHAR(300)
	--,@middleName VARCHAR(300)
	--,@lastName VARCHAR(300)
	--,@country VARCHAR(100)
	--,@state VARCHAR(200)
	--,@district VARCHAR(200)
	--,@phyAddress VARCHAR(300)
	--,@email VARCHAR(100)
	--,@contact VARCHAR(15)
	--,@gender VARCHAR(100)
	--,@password VARCHAR(200)
	--,@confirmPassword VARCHAR(200)
	--,@createdDate DATE
	--,@updatedDate DATE 
	--,@isActive BIT
	IF ISNULL(@actionFlg, '') = 'SELECT'
		BEGIN
			SELECT * FROM CustomerTable WHERE isActive = 1
		END
	ELSE IF ISNULL(@actionFlg, '') = 'INSERT'
		BEGIN
			INSERT INTO CustomerTable 
			(firstName,middleName,lastName,country,state,district,
			phyAddress,email,contact,gender,password,confirmPassword,createdDate,updatedDate,isActive)
			SELECT @firstName,@middleName,@lastName,@country,@state,@district,
			@phyAddress,@email,@contact,@gender,@password,@confirmPassword,@createdDate,NULL,1
		END
	ELSE IF ISNULL(@actionFlg, '') = 'UPDATE'
		BEGIN
			UPDATE custInfo
			SET custInfo.firstName = @firstName
				,custInfo.middleName = @middleName
				,custInfo.lastName = @lastName
				,custInfo.country = @country
				,custInfo.state = @state
				,custInfo.district = @district
				,custInfo.phyAddress = @phyAddress
				,custInfo.email = @email
				,custInfo.contact = @contact
				,custInfo.gender = @gender
				,custInfo.password = @password
				,custInfo.confirmPassword = @confirmPassword
				,custInfo.updatedDate = @updatedDate
				,custInfo.isActive = 1
			FROM CustomerTable custInfo
			WHERE customerId = @customerId;
		END
	ELSE IF ISNULL(@actionFlg, '') = 'DELETE'
		BEGIN
			UPDATE custInfo
			SET custInfo.isActive = 0
			FROM CustomerTable custInfo
			WHERE customerId = @customerId;
		END
	ELSE IF ISNULL(@actionFlg, '') = 'GETUSER'
		BEGIN
			SELECT*FROM customertable WHERE customerId=@customerId
		END