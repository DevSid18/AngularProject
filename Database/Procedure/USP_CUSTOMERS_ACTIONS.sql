
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
			
			IF NOT EXISTS (SELECT 1 FROM UserLoginTable WHERE customerId = 
						  (SELECT TOP 1 customerId FROM CustomerTable WHERE email = @email ORDER BY customerId DESC))			
			BEGIN		
			DECLARE @CustId INT 
			SET @CustId = (SELECT TOP 1 customerId FROM CustomerTable WHERE email = @email ORDER BY customerId DESC)
				IF ISNULL(@CustId, 0) <> 0
					BEGIN
						INSERT INTO UserLoginTable (userName, password, confirmPassword,createdDate,isActive,customerId)
					    VALUES (@email, @password, @confirmPassword,GETDATE(),1,@CustId)
					    PRINT 'USER added successfully'					    
					END
				ELSE
					BEGIN
						PRINT 'USER not added, @CustId is NULL or 0'
					END
			END
			ELSE
			BEGIN
			    PRINT 'USER not added'
			END
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

		IF EXISTS (SELECT 1 FROM UserLoginTable WHERE customerId = (SELECT TOP 1 customerId FROM CustomerTable WHERE email = @email ORDER BY customerId DESC))
			BEGIN
			SET @CustId = (SELECT TOP 1 customerId FROM CustomerTable WHERE email = @email ORDER BY customerId DESC)
				UPDATE UserLoginTable
				SET 
					password = @password
					,confirmPassword = @confirmPassword
					,updatedDate = GETDATE()
				WHERE
				customerId = @CustId
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
