@test-organization
Feature: Create Run


	Background:

		Given a logged user with "Owner" role
		And   User Click On Create Load


	@smoke @myriad360
	Scenario Outline:  [Case_ID_6648][Case_ID_6649][Case_ID_6650][Case_ID_6651] Create Run Using Container Volume Minimization
		Given <DefaultMode> Transportation Mode Is Selected By Default
		And  the user selects a CSV file <File>
		And  User Set Load Name
		And  User Click On Save and Run Button
		Then User Should Be Redirected To Create Run Page
		And  Container Volume Minimization Is Selected By default
		When User select container category as <Container_Type>
		And  User select container name as <Container_Name>
		Then The Other Container Categories Should Be Disabled According To Selected <Container_Type>
		When User Click On Next Button
		And  User Select <Run_Type>
		And  User Set Run Name
		And  User Click On Run Button
		Then Run Should Be Created
		And  Run Should succeed



		Examples:
			| File                      | Container_Type   | Container_Name             | Run_Type  | Mode                  | DefaultMode           |
			| "test-data/valid_csv.csv" | "Sea Containers" | "40 Standard, 20 Standard" | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/valid_csv.csv" | "Ground Pallet"  | "US Pallet, Euro Pallet"   | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/valid_csv.csv" | "Sea Containers" | "40 Standard"              | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/valid_csv.csv" | "Ground Pallet"  | "US Pallet"                | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |

	#| "test-data/airPallet.csv" | "Air Pallet"     | "PMC Q7, PMC Q5"           | "Instant" | "Air shipment"        | "Land & Sea shipment" |
	#| "test-data/valid_csv.csv" | "Uld Container"  | "M1H AMD, LD3 AKE"         | "Instant" | "air shipment"        | "Land & Sea shipment" |


	@myriad360
	Scenario Outline:  [Case_ID_6643][Case_ID_6647][Case_ID_6646][Case_ID_6645] Create Run Using Shipment Maximization

		Given <DefaultMode> Transportation Mode Is Selected By Default
		And  the user selects a CSV file <File>
		And  User Set Load Name
		And  User Click On Save and Run Button
		Then User Should Be Redirected To Create Run Page
		And  Container Volume Minimization Is Selected By default
		When User Select Shipment Maximization
		And  User select container category as <Container_Type>
		And  User select container name as <Container_Name>
		Then The Other Container Categories Should Be Disabled According To Selected <Container_Type>
		When User set container count as <Container_Count>
		And  User Click On Next Button
		And  User Select <Run_Type>
		And  User Set Run Name
		And  User Click On Run Button
		Then Run Should Be Created
		And  Run Should succeed



		Examples:
			| File                      | Container_Type   | Container_Name             | Container_Count | Run_Type  | Mode                  | DefaultMode           |
			| "test-data/valid_csv.csv" | "Sea Containers" | "40 Standard, 20 Standard" | "2,2"           | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/valid_csv.csv" | "Ground Pallet"  | "Euro Pallet, US Pallet"   | "2,2"           | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/valid_csv.csv" | "Ground Pallet"  | "US Pallet"                | "2"             | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/valid_csv.csv" | "Sea Containers" | "40 Standard"              | "2"             | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |

	#| "test-data/valid_csv.csv" | "Air Pallet"    | "PMC Q7, PMC Q5"   | "2,2" | "Instant" | "Air shipment" | "Land & Sea shipment" |
	#| "test-data/valid_csv.csv" | "Uld Container" | "M1H AMD, LD3 AKE" | "2,2" | "Instant" | "air shipment" | "Land & Sea shipment" |



	@myriad360
	Scenario Outline:  [Group_ID_1786] Create Run Using load contains invalid product through Container Volume Minimization

		Given There is Already Created <Container_Type>
		And <DefaultMode> Transportation Mode Is Selected By Default
		And  the user selects a CSV file <File>
		And  User Set Load Name
		And  User Click On Save and Run Button
		Then User Should Be Redirected To Create Run Page
		And  Container Volume Minimization Is Selected By default
		When User select container category as <Container_Type>
		And  User select container name as <Container_Name>
		Then The Other Container Categories Should Be Disabled According To Selected <Container_Type>
		When User Click On Next Button
		And  User Select <Run_Type>
		And  User Set Run Name
		And  User Click On Run Button
		Then Modal Should Be Displayed
		And  Modal Should Contain The Invalid Products
		When User Click On Proceed Button
		Then Run Should Be Created
		And  Run Should succeed



		Examples:
			| File                                   | Container_Type   | Container_Name             | Run_Type  | Mode                  | DefaultMode           |
			| "test-data/loadWithInvalidProduct.csv" | "Sea Containers" | "40 Standard, 20 Standard" | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/loadWithInvalidProduct.csv" | "Ground Pallet"  | "US Pallet, Euro Pallet"   | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/loadWithInvalidProduct.csv" | "boxes"          | ""                         | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/loadWithInvalidProduct.csv" | "Ground Pallet"  | "US Pallet"                | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/loadWithInvalidProduct.csv" | "Sea Containers" | "40 Standard"              | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |

	#| "test-data/loadWithInvalidProduct.csv" | "Uld Container"  | "M1H AMD, LD3 AKE"         | "Instant" | "air shipment"        | "Land & Sea shipment" |
	#| "test-data/loadWithInvalidProduct.csv" | "Air Pallet"     | "PMC Q7, PMC Q5"           | "Instant" | "Air shipment"        | "Land & Sea shipment" |





	@myriad360
	Scenario Outline:  [Group_ID_1787] Create Run Using load contains invalid product through Shipment Maximization

		Given There is Already Created <Container_Type>
		And <DefaultMode> Transportation Mode Is Selected By Default
		And  the user selects a CSV file <File>
		And  User Set Load Name
		And  User Click On Save and Run Button
		Then User Should Be Redirected To Create Run Page
		And  Container Volume Minimization Is Selected By default
		When User Select Shipment Maximization
		And  User select container category as <Container_Type>
		And  User select container name as <Container_Name>
		Then The Other Container Categories Should Be Disabled According To Selected <Container_Type>
		When User set container count as <Container_Count>
		And  User Click On Next Button
		And  User Select <Run_Type>
		And  User Set Run Name
		And  User Click On Run Button
		Then Modal Should Be Displayed
		And  Modal Should Contain The Invalid Products
		When User Click On Proceed Button
		Then Run Should Be Created
		And  Run Should succeed



		Examples:
			| File                                   | Container_Type   | Container_Name             | Container_Count | Run_Type  | Mode                  | DefaultMode           |
			| "test-data/loadWithInvalidProduct.csv" | "Sea Containers" | "40 Standard, 20 Standard" | "2,3"           | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/loadWithInvalidProduct.csv" | "Ground Pallet"  | "Euro Pallet, US Pallet"   | "2,3"           | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/loadWithInvalidProduct.csv" | "boxes"          | ""                         | "2"             | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/loadWithInvalidProduct.csv" | "Ground Pallet"  | "US Pallet"                | "2"             | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/loadWithInvalidProduct.csv" | "Sea Containers" | "40 Standard"              | "2"             | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |

	#| "test-data/loadWithInvalidProduct.csv" | "Uld Container"  | "M1H AMD, LD3 AKE"         | "2,2"           | "Instant" | "air shipment"        | "Land & Sea shipment" |
	#| "test-data/loadWithInvalidProduct.csv" | "Air Pallet"     | "PMC Q7, PMC Q5"           | "2,2"           | "Instant" | "Air shipment"        | "Land & Sea shipment" |





    @para
	Scenario Outline:  [Group_ID_1716][Group_ID_1718] Create Run Using Container Volume Minimization using load contains specific product dimensions

		Given <DefaultMode> Transportation Mode Is Selected By Default
		When User Select The Transportation Mode <Mode>
		And  the user selects a CSV file <File>
		And  User Set Load Name
		And  User Click On Save and Run Button
		Then User Should Be Redirected To Create Run Page
		And  Container Volume Minimization Is Selected By default
		When User select container category as <Container_Type>
		And  User select container name as <Container_Name>
		Then The Other Container Categories Should Be Disabled According To Selected <Container_Type>
		When User Click On Next Button
		And  User Select <Run_Type>
		And  User Set Run Name
		And  User Click On Run Button
		Then Run Should Be Created
		And  Run Should succeed



		Examples:
			| File                                                       | Container_Type   | Container_Name | Run_Type  | Mode                  | DefaultMode           |
			#| "test-data/EqualHeightSeaCon.csv"                          | "Sea Containers" | "40 Standard"  | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/EqualLengthSeaCon.csv"                          | "Sea Containers" | "40 Standard"  | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/EqualWeightSeaCon.csv"                          | "Sea Containers" | "40 Standard"  | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/EqualWeightSC_cy.csv"                           | "Sea Containers" | "40 Standard"  | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			#| "test-data/EqualHeightSeaCon_cy.csv"                       | "Sea Containers" | "40 Standard"  | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			#| "test-data/DiameterEqualToSC.csv"                          | "Sea Containers" | "40 Standard"  | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/EqualWidth_GP.csv"                              | "Ground Pallet"  | "US Pallet"    | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/EqualLength_GP.csv"                             | "Ground Pallet"  | "US Pallet"    | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/EqualHeight.csv"                                | "Ground Pallet"  | "US Pallet"    | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/EqualWeight_GP.csv"                             | "Ground Pallet"  | "US Pallet"    | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			#| "test-data/EqualWeight_GP_cy.csv"                          | "Ground Pallet"  | "US Pallet"    | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			#| "test-data/DiameterEqualToWidth.csv"                       | "Ground Pallet"  | "US Pallet"    | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			| "test-data/heightBoxBetweenEmptyAndMaximumheight.csv"      | "Ground Pallet"  | "US Pallet"    | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |
			#| "test-data/heightCylinderBetweenEmptyAndMaximumheight.csv" | "Ground Pallet"  | "US Pallet"    | "Instant" | "Land & Sea shipment" | "Land & Sea shipment" |


