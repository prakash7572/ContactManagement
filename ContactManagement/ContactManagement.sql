CREATE DATABASE ContactManageMent
USE ContactManageMent

CREATE TABLE Contacts(
ID INT IDENTITY PRIMARY KEY,
FirstName VARCHAR(100),
LastName  VARCHAR(100),
UserName VARCHAR(100),
Password VARCHAR(100),
ConfirmPassword VARCHAR(100),
Email VARCHAR(100),
Address VARCHAR(MAX),
)

CREATE PROCEDURE SP_ContactManagement(
@ID			      INT,
@FirstName        VARCHAR(100),
@LastName         VARCHAR(100),
@UserName         VARCHAR(100),
@Password         VARCHAR(100),
@ConfirmPassword  VARCHAR(100),
@Email            VARCHAR(100),
@Address		  VARCHAR(MAX),
@QueryType		  VARCHAR(20)
)
AS
BEGIN
		DECLARE @STATUS  VARCHAR(10);
		DECLARE @MESSAGE VARCHAR(10);

		IF(@QueryType='INSERT')
		BEGIN
			 INSERT INTO Contacts(FirstName,LastName,UserName,Password,ConfirmPassword,Email,Address)
			 VALUES (@FirstName,@LastName,@UserName,@Password,@ConfirmPassword,@Email,@Address)

			 SET @STATUS='SUCCESS';SET @MESSAGE='Data Insert Successfully !!';
			 SELECT @STATUS,@MESSAGE
		END
		ELSE IF(@QueryType='UPDATE')
		BEGIN
		     UPDATE Contacts SET FirstName=@FirstName,LastName=@LastName,UserName=@UserName,
			 Password=@Password,ConfirmPassword=@ConfirmPassword,Email=@Email,Address=@Address

			 SET @STATUS='SUCCESS';SET @MESSAGE='Data Update Successfully !!';
			 SELECT @STATUS,@MESSAGE
		END
		ELSE IF(@QueryType='FETCH_ONE')
		BEGIN
		     SELECT  ID,FirstName,LastName,UserName,Password,ConfirmPassword,Email,Address
			 FROM Contacts
		END
		ELSE IF(@QueryType='FETCH_ALL')
		BEGIN
			  SELECT  ID,FirstName,LastName,UserName,Password,ConfirmPassword,Email,Address 
			  FROM Contacts WHERE ID=@ID
		END
END