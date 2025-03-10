@test-organization
Feature: Log out

    Background: 
	  
	@smoke
	@noStorage
	Scenario Outline: [Case_ID_67] User should be able to log out from his account
		Given User Sign In As "Owner" Using Another Account
		When  User Click On Log Out
		Then  User should be logged out
