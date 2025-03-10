@test-organization
Feature: Download PDF


	Background:

		Given a logged user with "Owner" role
		And   User Click On Create Load


	@smoke
	Scenario Outline:  [Case_ID_2536] User Should Be Able To Generate PDF File

		Given <DefaultMode> Transportation Mode Is Selected By Default
		When User Select The Transportation Mode <Mode>
		And the user selects a CSV file <File>
		And  User Set Load Name
		And  User Click On Save and Run Button
		And  Container Volume Minimization Is Selected By default
		And  User select container category as <Container_Type>
		And  User select container name as <Container_Name>
		And  User Click On Next Button
		And  User Select <Run_Type>
		And  User Set Run Name
		And  User Click On Run Button
		Then Run Should Be Created
		And  Run Should succeed
		When User Click On Results Button
		Then User Should Be Redirected To Results Page
		When User Click On Generate PDF Button
		Then PDf Should Be Generated





		Examples:
			| File                        | Container_Type   | Container_Name | Run_Type  | Mode                  | DefaultMode           |
			| "test-data/downloadPdf.csv" | "Sea Containers" | "20 Standard"  | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |