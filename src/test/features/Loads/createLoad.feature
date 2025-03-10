@test-organization
Feature: Create Load

	Background:

		Given a logged user with "Owner" role
		And   User Click On Create Load





	@smoke
	Scenario Outline: [Case_ID_14] User Should Be Able To Create a Load with Valid Shipment
		Given  <DefaultMode> Transportation Mode Is Selected By Default
		And    User Select The Transportation Mode <Mode>
		And    User Set Load Name
		When   User Click On Add Shipment Button
		Then   Default Products Quantity Input Should Be 1
		When   User Set Shipment Name
		And    User Click On Add Product Button
		Then   The Added Rows Should Be As Equal As <productsQuantityInput>
		When   User Fill in the product properties <Shape>, <Height>, <Diameter>, <Length>, <crushingLimit>, <Width>, <Weight> And <Quantity>
		And    User Save Load
		Then   User Should Be Redirected To Dashboard Page
		And    Load Should Be Saved
		And    Type Of Shipment Should Be As Expected According To <Mode>


		Examples:
			| Shape | Height  | Diameter | Length | Width  | Weight | Quantity | crushingLimit | Mode                  | DefaultMode           | productsQuantityInput |
			| "box" | 700.111 |          | 80.111 | 50.111 | 2.111  | 6        | 1             | "Land & Sea shipment" | "Land & Sea shipment" | 1                     |


	Scenario Outline: [Group_ID_731] Positive Testing
		Given  <DefaultMode> Transportation Mode Is Selected By Default
		And    User Set Load Name
		When   User Click On Add Shipment Button
		Then   Default Products Quantity Input Should Be 1
		When   User Set Shipment Name
		And    User Click On Add Product Button
		Then   The Added Rows Should Be As Equal As <productsQuantityInput>
		When   User Fill in the product properties <Shape>, <Height>, <Diameter>, <Length>, <crushingLimit>, <Width>, <Weight> And <Quantity>
		And    User Save Load
		Then   User Should Be Redirected To Dashboard Page
		And    Load Should Be Saved
		And    Type Of Shipment Should Be As Expected According To <DefaultMode>


		Examples:
			| Shape | Height  | Diameter | Length | Width  | Weight | Quantity | crushingLimit | DefaultMode           | productsQuantityInput |
			| "box" | 700     |          | 80     | 50     | 0      | 1        | 1             | "Land & Sea shipment" | 1                     |
			| "box" | 700     |          | 80     | 50     | 1      | 1        |               | "Land & Sea shipment" | 1                     |
			| "box" | 700.111 |          | 80.111 | 50.111 | 2.111  | 6        | 1             | "Land & Sea shipment" | 1                     |
	#| "cylinder" | 700     | 100      | 80     | 50     | 1      | 1        |               | "Land & Sea shipment" | 1                     |
	#| "cylinder" | 700     | 100      | 80     | 50     | 0      | 1        |               | "Land & Sea shipment" | 1                     |
	#| "cylinder" | 700.111 | 100      | 80     | 50     | 1      | 1        |               | "Land & Sea shipment" | 1                     |
	#| "cylinder" | 700     | 100.111  | 80     | 50     | 1      | 1        |               | "Land & Sea shipment" | 1                     |
	#| "cylinder" | 700     | 100      | 80     | 50     | 1.111  | 1        |               | "Land & Sea shipment" | 1                     |






	@smoke
	Scenario Outline: [Case_ID_12] Create a Load with a valid CSV
		Given <DefaultMode> Transportation Mode Is Selected By Default
		When  User Select The Transportation Mode <Mode>
		And   the user selects a CSV file <File>
		And   User Set Load Name
		And   User Save Load
		Then  User Should Be Redirected To Dashboard Page
		And   Load Should Be Saved
		And   Type Of Shipment Should Be As Expected According To <DefaultMode>

		Examples:
			| File                      | Mode                  | DefaultMode           |
			| "test-data/valid_csv.csv" | "Land & Sea shipment" | "Land & Sea shipment" |


	Scenario Outline: [Group_ID_755] Create Load Using Different shapes
		Given <DefaultMode> Transportation Mode Is Selected By Default
		And   the user selects a CSV file <File>
		And   User Set Load Name
		And   User Save Load
		Then  User Should Be Redirected To Dashboard Page
		And   Load Should Be Saved
		And   Type Of Shipment Should Be As Expected According To <DefaultMode>

		Examples:
			| File                      | DefaultMode           |
			| "test-data/onlyBoxes.csv" | "Land & Sea shipment" |
	#| "test-data/onlyCylinders.csv" | "Land & Sea shipment" |
	#| "test-data/mixedShapes.csv"   | "Land & Sea shipment" |



	Scenario Outline: [Group_ID_732] Negative Testing
		Given  <DefaultMode> Transportation Mode Is Selected By Default
		And    User Set Load Name
		When   User Click On Add Shipment Button
		Then   Default Products Quantity Input Should Be 1
		When   User Set Shipment Name
		And    User Click On Add Product Button
		Then   The Added Rows Should Be As Equal As <productsQuantityInput>
		When   User Fill in the product properties <Shape>, <Height>, <Diameter>, <Length>, <crushingLimit>, <Width>, <Weight> And <Quantity>
		And    User Save Load
		Then   Invalid Product Message Should Be Displayed
		And    User Should Still at Create Load page


		Examples:
			| Shape | Height  | Diameter | Length | Width  | Weight | Quantity | crushingLimit | DefaultMode           | productsQuantityInput |
			#| "cylinder" | 100     | -1       | 0      | 0      | 2      | 6        | 1             | "Land & Sea shipment" | 1                     |
			#| "cylinder" | 100     | 0        | 0      | 0      | 2      | 6        | 1             | "Land & Sea shipment" | 1                     |
			#| "cylinder" | -1      | 1        | 0      | 0      | 2      | 6        | 1             | "Land & Sea shipment" | 1                     |
			#| "cylinder" | 0       | 1        | 0      | 0      | 2      | 6        | 1             | "Land & Sea shipment" | 1                     |
			#| "cylinder" | 100     | 1        | 0      | 0      | 2      | -1       | 1             | "Land & Sea shipment" | 1                     |
			#| "cylinder" | 100     | 1        | 0      | 0      | 2      | 0        | 1             | "Land & Sea shipment" | 1                     |
			#| "cylinder" | 100     | 1        | 0      | 0      | -1     | 1        | 1             | "Land & Sea shipment" | 1                     |
			#| "cylinder" | 100     | 1        | 0      | 0      | 1      | 1        | -1            | "Land & Sea shipment" | 1                     |
			#| "cylinder" | 0.99    | 1        | 0      | 0      | 1      | 1        | 1             | "Land & Sea shipment" | 1                     |
			#| "cylinder" | 1       | 0.99     | 0      | 0      | 1      | 1        | 1             | "Land & Sea shipment" | 1                     |
			#| "cylinder" | 1       | 1        | 0      | 0      | 1      | 1.1      | 1             | "Land & Sea shipment" | 1                     |
			#| "cylinder" | 700     | 100      |        |        | 1      | 1        | 0             | "Land & Sea shipment" | 1                     |
			| "box" | 700.111 |          | 80.111 | 50.111 | 2.111  | -6       | 1             | "Land & Sea shipment" | 1                     |
			| "box" | 700.111 |          | 80.111 | 50.111 | 2.111  | 0        | 1             | "Land & Sea shipment" | 1                     |
			| "box" | -1      |          | 80.111 | 50.111 | 2.111  | 6        | 1             | "Land & Sea shipment" | 1                     |
			| "box" | 0       |          | 80     | 50     | 2      | 6        | 1             | "Land & Sea shipment" | 1                     |
			| "box" | 100     |          | -1     | 50     | 2      | 6        | 1             | "Land & Sea shipment" | 1                     |
			| "box" | 100     |          | 0      | 50     | 2      | 6        | 1             | "Land & Sea shipment" | 1                     |
			| "box" | 100     |          | 100    | 0      | 2      | 6        | 1             | "Land & Sea shipment" | 1                     |
			| "box" | 100     |          | 100    | -1     | 2      | 6        | 1             | "Land & Sea shipment" | 1                     |
			| "box" | 100     |          | 100    | 1      | -1     | 6        | 1             | "Land & Sea shipment" | 1                     |
			| "box" | 100     |          | 100    | 1      | 1      | 1.1      | 1             | "Land & Sea shipment" | 1                     |
			| "box" | 0.99    |          | 100    | 1      | 1      | 1        | 1             | "Land & Sea shipment" | 1                     |
			| "box" | 1       |          | 0.99   | 1      | 1      | 1        | 1             | "Land & Sea shipment" | 1                     |
			| "box" | 1       |          | 1      | 0.99   | 1      | 1        | 1             | "Land & Sea shipment" | 1                     |
			| "box" | 1       |          | 1      | 1      | 1      | 1        | -1            | "Land & Sea shipment" | 1                     |
			| "box" | 700     |          | 80     | 50     | 1      | 1        | 0             | "Land & Sea shipment" | 1                     |




	Scenario Outline: [Case_ID_3156] User Should Not Be Able To Save Load with an Empty Name
		Given  <DefaultMode> Transportation Mode Is Selected By Default
		When the user selects a CSV file <File>
		And  User Set Load Name
		And  User Clear The Load Name Field
		And  User Save Load
		Then User Should Still at Create Load page
		When User Hover Mouse On Load Name Field
		Then Relevant Message should appear <message>




		Examples:
			| File                      | message                    | DefaultMode           |
			| "test-data/valid_csv.csv" | "name is a required field" | "Land & Sea shipment" |


	Scenario Outline: [Group_ID_2458] Unloading Priority Validations
		Given <DefaultMode> Transportation Mode Is Selected By Default
		When  the user selects a CSV file <File>
		And   User Set Load Name
		And   User Enter <unloadingPriority>
		And   User Save Load
		Then  Invalid Product Message Should Be Displayed
		Then  User Should Still at Create Load page


		Examples:
			| File                     | unloadingPriority | DefaultMode           |
			| "test-data/boxForUP.csv" | 1.1               | "Land & Sea shipment" |
			| "test-data/boxForUP.csv" | 0                 | "Land & Sea shipment" |
			| "test-data/boxForUP.csv" | -1                | "Land & Sea shipment" |
#| "test-data/cylinderUP.csv" | 1.1               | "Land & Sea shipment" |
#| "test-data/cylinderUP.csv" | 0                 | "Land & Sea shipment" |
#| "test-data/cylinderUP.csv" | -1                | "Land & Sea shipment" |



