@test-organization
Feature: View Load Info

	User should be able to check load info

	Background:
		Given a logged user with "Owner" role




	Scenario Outline: [Case_ID_2259] User should be able to view load info from dashboard page

		Given  User Get CSV Info <File>
		And    There Is Created Load <File> With <Shipment_Type> As Type Of Shipment
		When   User Click On Vertical Ellipsis
		And    User Click On Load Info Option
		And    User Get Load Info According To <Shipment_Type>
		Then   Load Info Should Match CSV Info

		Examples:
			| File                            | Shipment_Type         |
			| "test-data/loadInfo_air.csv"    | "Air shipment"        |
			| "test-data/loadInfo_sea_LP.csv" | "Land & Sea shipment" |
			| "test-data/loadInfo_sea_UP.csv" | "Land & Sea shipment" |



	Scenario: [Case_ID_2258] User should be able to view load info from Run-Details page

		Given  User Get CSV Info <File>
		And    There Is Created Load <File> With <Shipment_Type> As Type Of Shipment
		When   User Click On The Load
		And    User Click On The Vertical Ellipsis
		When   User Click On Load Info
		And    User Get Load Info According To <Shipment_Type>
		Then   Load Info Should Match CSV Info

		Examples:
			| File                            | Shipment_Type         |
			| "test-data/loadInfo_air.csv"    | "Air shipment"        |
			| "test-data/loadInfo_sea_LP.csv" | "Land & Sea shipment" |
			| "test-data/loadInfo_sea_UP.csv" | "Land & Sea shipment" |


	Scenario: [Case_ID_57] User should be able to view load info from results page

		Given  User Get CSV Info <File>
		And    There Is Created Load <File> With <Shipment_Type> As Type Of Shipment
		When User Click On The Load
		And  User Click On New Run Button
		And  User select container category as <Container_Type>
		And  User select container name as <Container_Name>
		And  User Click On Next Button
		And  User Select <Run_Type>
		And  User Set Run Name
		And  User Click On Run Button
		And  Run Should Be Created
		And  Run Should succeed
		And  User Click On Results Button
		And  User Should Be Redirected To Results Page
		When User Click On Load Info Button
		And  User Get Load Info According To <Shipment_Type>
		Then Load Info Should Match CSV Info

		Examples:
			| Container_Type   | Container_Name             | Run_Type  | File                            | Shipment_Type         |
			| "Air Pallet"     | "PMC Q7, PMC Q5"           | "Instant" | "test-data/loadInfo_air.csv"    | "Air shipment"        |
			| "Sea Containers" | "40 Standard, 20 Standard" | "Instant" | "test-data/loadInfo_sea_LP.csv" | "Land & Sea shipment" |
			| "Sea Containers" | "40 Standard, 20 Standard" | "Instant" | "test-data/loadInfo_sea_UP.csv" | "Land & Sea shipment" |


	Scenario: [Case_ID_3096] User should be able to view load info from Results preview page

		Given  User Get CSV Info <File>
		And    There Is Created Load <File> With <Shipment_Type> As Type Of Shipment
		When User Click On The Load
		And  User Click On New Run Button
		And  User select container category as <Container_Type>
		And  User select container name as <Container_Name>
		And  User Click On Next Button
		And  User Select <Run_Type>
		And  User Set Run Name
		And  User Click On Run Button
		And  Run Should Be Created
		And  Run Should succeed
		And  User Click On The Run
		And  User Click On The Vertical Ellipsis In Previews Page
		When User Click On Load Info
		And  User Get Load Info According To <Shipment_Type>
		Then Load Info Should Match CSV Info

		Examples:
			| Container_Type   | Container_Name             | Run_Type  | File                            | Shipment_Type         |
			| "Air Pallet"     | "PMC Q7, PMC Q5"           | "Instant" | "test-data/loadInfo_air.csv"    | "Air shipment"        |
			| "Sea Containers" | "40 Standard, 20 Standard" | "Instant" | "test-data/loadInfo_sea_LP.csv" | "Land & Sea shipment" |
			| "Sea Containers" | "40 Standard, 20 Standard" | "Instant" | "test-data/loadInfo_sea_UP.csv" | "Land & Sea shipment" |
