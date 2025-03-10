@test-organization
Feature: Delete Load

	Background:

		Given a logged user with "Owner" role
		And   User Click On Create Load
		And   "Land & Sea shipment" Transportation Mode Is Selected By Default
		And   the user selects a CSV file "test-data/valid_csv.csv"
		And   User Set Load Name
		And   User Save Load
		And   User Should Be Redirected To Dashboard Page
		And   Load Should Be Saved
		And   Type Of Shipment Should Be As Expected According To "Land & Sea shipment"



	Scenario Outline: [Case_ID_40] User Should Be Able To Delete a Single Load

		When   User Click On Vertical Ellipsis
		And    User Click On Delete Option
		And    User Confirm Deletion
		Then   Load Should Be Deleted




