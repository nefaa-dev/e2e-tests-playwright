@test-organization
Feature: Download CSV

	Download CSV file from different pages


	Background:
	   Given a logged user with "Owner" role



	Scenario Outline: [Case_ID_55] User should be able to download CSV file from the dashboard page
		Given  User Click On Create Load
		And   <DefaultMode> Transportation Mode Is Selected By Default
		When   User Select The Transportation Mode <Mode>
		And    the user selects a CSV file <File>
		And    User Set Load Name
		And    User Save Load
		And    User Should Be Redirected To Dashboard Page
		And    Load Should Be Saved
		And    Type Of Shipment Should Be As Expected According To <Mode>
		When   User Click On Vertical Ellipsis
		And    User Click On Download Csv Option
		Then   Csv File Should Be Downloaded
		And    CSV File Content Should Be As Expected <File>


		Examples:
			| File                               | DefaultMode           | Mode                  |
			| "test-data/upToDateCSV_sea_LP.csv" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/upToDateCSV_sea_UP.csv" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/upToDateCSV_air.csv"    | "Land & Sea shipment" | "Air shipment"        |


	Scenario Outline: [Case_ID_2621] User should be able to download CSV file from Run Details Page
		Given  User Click On Create Load
		And   <DefaultMode> Transportation Mode Is Selected By Default
		When   User Select The Transportation Mode <Mode>
		And    the user selects a CSV file <File>
		And    User Set Load Name
		And    User Save Load
		And    User Should Be Redirected To Dashboard Page
		And    Load Should Be Saved
		And    Type Of Shipment Should Be As Expected According To <Mode>
		And    User Click On The Load
		And    User Click On The Vertical Ellipsis
		When   User Click On Download CSV Option In Run Page
		Then   Csv File Should Be Downloaded
		And    CSV File Content Should Be As Expected <File>


		Examples:
			| File                               | DefaultMode           | Mode                  |
			| "test-data/upToDateCSV_sea_LP.csv" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/upToDateCSV_sea_UP.csv" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/upToDateCSV_air.csv"    | "Land & Sea shipment" | "Air shipment"        |



	Scenario Outline: [Case_ID_2622] User should be able to download CSV file from Results Preview page
		Given User Click On Create Load
		And   User Select The Transportation Mode <Mode>
		And   the user selects a CSV file <File>
		And   User Set Load Name
		And   User Click On Save and Run Button
		And   User Should Be Redirected To Create Run Page
		And   Container Volume Minimization Is Selected By default
		And   User select container category as <Container_Type>
		And   User select container name as <Container_Name>
		And   User Click On Next Button
		And   User Select <Run_Type>
		And   User Set Run Name
		And   User Click On Run Button
		And   Run Should Be Created
		And   Run Should succeed
		When  User Click On The Run
		And   User Click On The Vertical Ellipsis In Previews Page
		And   User Click On Download CSV Option In Previews Page
		Then  Csv File Should Be Downloaded
		And   CSV File Content Should Be As Expected <File>


		Examples:
			| File                               | DefaultMode           | Mode                  | Container_Name | Container_Type   | Run_Type  |
			| "test-data/upToDateCSV_sea_UP.csv" | "Land & Sea shipment" | "Land & Sea shipment" | "20 Standard"  | "Sea Containers" | "Instant" |
			| "test-data/upToDateCSV_air.csv"    | "Land & Sea shipment" | "Air shipment"        | "PMC Q7"       | "Air Pallet"     | "Instant" |
#| "test-data/upToDateCSV_sea_LP.csv" | "Land & Sea shipment" | "Land & Sea shipment" | "20 Standard"  |
