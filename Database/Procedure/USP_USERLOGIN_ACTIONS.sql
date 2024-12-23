	
	ALTER PROCEDURE [dbo].[USP_USERLOGIN_ACTIONS]
	--DECLARE
	@email VARCHAR(MAX) = NULL,
	@password VARCHAR(MAX) = NULL,
	@confirmPassword VARCHAR(MAX) = NULL,
	@actionFlg VARCHAR(MAX) = NULL

	AS
	BEGIN		
		IF ISNULL(@actionFlg, '') = 'GETUSERLOGIN'
		BEGIN
			SELECT
			userLoginInfo.userName,
			userLoginInfo.password,
			userLoginInfo.confirmPassword,
			'isLogin' AS [result]
			FROM UserLoginTable userLoginInfo WITH (NOLOCK)
			INNER JOIN CustomerTable custInfo WITH (NOLOCK) ON custInfo.customerId = userLoginInfo.customerId
			WHERE userName = @email
			AND custInfo.isActive = 1
			AND userLoginInfo.isActive = 1
		END

		ELSE IF ISNULL(@actionFlg, '') = 'UPDTPASS'
		BEGIN			
			IF EXISTS (SELECT 1 FROM UserLoginTable WHERE customerId =
			(SELECT TOP 1 customerId FROM CustomerTable WHERE email = @email ORDER BY customerId DESC))
			BEGIN
			DECLARE @CustId INT
			SET @CustId = (SELECT TOP 1 customerId FROM CustomerTable WHERE email = @email ORDER BY customerId DESC)
				UPDATE userLoginInfo
				SET userLoginInfo.password = @password,
				userLoginInfo.confirmPassword = @confirmPassword,
				userLoginInfo.updatedDate = GETDATE()
				FROM UserLoginTable userLoginInfo WITH (NOLOCK)
				INNER JOIN CustomerTable custInfo WITH (NOLOCK) ON custInfo.customerId = userLoginInfo.customerId
				WHERE userLoginInfo.customerId = @CustId
				AND custInfo.isActive = 1
				AND userLoginInfo.isActive = 1

				SELECT
				userLoginInfo.userName,
				userLoginInfo.password,
				userLoginInfo.confirmPassword,
				'isResPass' AS [result]
				FROM UserLoginTable userLoginInfo WITH (NOLOCK)
				INNER JOIN CustomerTable custInfo WITH (NOLOCK) ON custInfo.customerId = userLoginInfo.customerId
				WHERE userName = @email
				AND custInfo.isActive = 1
				AND userLoginInfo.isActive = 1
			END			
		END
	END
