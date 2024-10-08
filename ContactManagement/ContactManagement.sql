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
IsFavourite BIT
)


CREATE PROCEDURE SP_ContactManagement(
@ID			      INT=0,
@FirstName        VARCHAR(100)=NULL,
@LastName         VARCHAR(100)=NULL,
@UserName         VARCHAR(100)=NULL,
@Password         VARCHAR(100)=NULL,
@ConfirmPassword  VARCHAR(100)=NULL,
@Email            VARCHAR(100)=NULL,
@Address		  VARCHAR(MAX)=NULL,
@IsFavourite      BIT=0,
@QueryType		  VARCHAR(20)=NULL
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
			 SELECT @STATUS AS STATUS,@MESSAGE AS MESSAGE
		END
		ELSE IF(@QueryType='UPDATE')
		BEGIN
		     UPDATE Contacts SET FirstName=@FirstName,LastName=@LastName,UserName=@UserName,
			 Password=@Password,ConfirmPassword=@ConfirmPassword,Email=@Email,Address=@Address
			 WHERE ID=@ID 

			 SET @STATUS='SUCCESS';SET @MESSAGE='Data Update Successfully !!';
			 SELECT @STATUS AS STATUS,@MESSAGE AS MESSAGE
		END
		ELSE IF(@QueryType='FETCH_ONE')
		BEGIN
		     SELECT  ID,FirstName,LastName,UserName,Password,ConfirmPassword,Email,Address,IsFavourite
			 FROM Contacts WHERE ID=@ID
		END
		ELSE IF(@QueryType='FETCH_ALL')
		BEGIN
			  SELECT  ID,FirstName,LastName,UserName,Password,ConfirmPassword,Email,Address,IsFavourite 
			  FROM Contacts 
		END
		ELSE IF(@QueryType='DELETE')
		BEGIN
			 DELETE FROM Contacts  WHERE ID=@ID
			  SET @STATUS='SUCCESS';SET @MESSAGE='Data Delete Successfully !!';
			 SELECT @STATUS AS STATUS,@MESSAGE AS MESSAGE
		END
		IF(@QueryType='FAVOURITE')
		BEGIN
		      UPDATE Contacts SET IsFavourite=@IsFavourite WHERE ID=@ID 
			  SET @STATUS='SUCCESS';SET @MESSAGE='Add favourite Successfully !!';
			  SELECT @STATUS AS STATUS,@MESSAGE AS MESSAGE
		END
END

SELECT * FROM Contacts 

	
