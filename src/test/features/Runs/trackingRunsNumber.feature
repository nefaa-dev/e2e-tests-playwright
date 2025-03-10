@test-organization
Feature: Tracking Number Of Runs


	Background:
		Given a logged user with "Owner" role
		And   There Is Created Load "test-data/upToDateCSV_sea_LP.csv" With "Land & Sea shipment" As Type Of Shipment


	Scenario Outline:  [Case_ID_560] Number Of Available Runs Should Be Decremented By One

		When User Click On The Load
		And  User Get The Number Of Available Runs
		And  User Click On New Run Button
		And  User select container category as <Container_Type>
		And  User select container name as <Container_Name>
		And  User Click On Next Button
		And  User Select <Run_Type>
		And  User Set Run Name
		And  User Click On Run Button
		And  Run Should Be Created
		And  Run Should succeed
		Then Number Of Available Runs Should Be Decremented By One

		Examples:
			| Container_Type   | Container_Name             | Run_Type  |
			| "Sea Containers" | "40 Standard, 20 Standard" | "Instant" |