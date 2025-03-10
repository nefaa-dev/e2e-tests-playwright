@test-organization
Feature: Create Product

	Background:

		Given a logged user with "Owner" role


	@smoke
	Scenario Outline: [Case_ID_542] Owner Should Be Able To Create Products with decimal values

		When  User Click On Library Button
		And   User Click On Add Product
		And   User Fill in the product properties <Shape>, <Height>, <Diameter>, <Length>, <crushingLimit>, <Width>, And <Weight>
		And   User Click On Save and Close Button
		Then  Product Should Be Created



		Examples:
			| Shape | Height  | Diameter | Length | Width  | Weight | crushingLimit |
			| "box" | 700.111 | 0.0      | 80.111 | 50.111 | 2.111  |               |




	Scenario Outline: [Group_ID_2456] Products With decimal dimensions should be saved

		When  User Click On Library Button
		And   User Click On Add Product
		And   User Fill in the product properties <Shape>, <Height>, <Diameter>, <Length>, <crushingLimit>, <Width>, And <Weight>
		And   User Click On Save and Close Button
		Then  Product Should Be Created



		Examples:
			| Shape      | Height  | Diameter | Length | Width | Weight | crushingLimit |
			#| "cylinder" | 700.111 | 100.111  | 0      | 0     | 2.111  |               |
			#| "cylinder" | 700     | 100      | 0      | 0     | 0      |               |
			#| "cylinder" | 700     | 100      | 0      | 0     | 1      |               |
			#| "cylinder" | 700     | 100      | 0      | 0     | 1      | 1.111         |
			| "box"      | 700     | 0.0      | 80     | 50    | 0      |               |
			| "box"      | 700     | 0.0      | 80     | 50    | 0      |               |
			| "box"      | 700     | 0.0      | 80     | 50    | 0      | 1.111         |


	
	Scenario Outline: [Group_ID_2457] Products with Ivalid dimensions should not be saved

		When  User Click On Library Button
		And   User Click On Add Product
		And   User Fill in the product properties <Shape>, <Height>, <Diameter>, <Length>, <crushingLimit>, <Width>, And <Weight>
		And   User Click On Save and Close Button
		And   User Click On Cancel Button
		Then  Product Should Not Be Saved



		Examples:
			| Shape      | Height | Diameter | Length | Width | Weight | crushingLimit |
			#| "cylinder" | 0      | 100      | 0      | 0     | 2      |               |
			#| "cylinder" | 700    | 0        | 0      | 0     | 1      |               |
			#| "cylinder" | -1     | 1        | 0      | 0     | 1      |               |
			#| "cylinder" | 700    | -1       | 0      | 0     | 1      |               |
			#| "cylinder" | 1      | 1        | 0      | 0     | -1     |               |
			#| "cylinder" | 1      | 1        | 0      | 0     | 1      | -1            |
			#| "cylinder" | 1      | 0.99     | 0      | 0     | 1      | -1            |
			#| "cylinder" | 0.99   | 1        | 0      | 0     | 1      | -1            |
			#| "cylinder" | 700    | 100      | 0      | 0     | 1      | 0             |
			| "box"      | 0      | 0.0      | 80     | 50    | 2      |               |
			| "box"      | 700    | 0.0      | 0      | 50    | 2      |               |
			| "box"      | 700    | 0.0      | 80     | 0     | 2      |               |
			| "box"      | -1     | 0.0      | 10     | 10    | 1      | 1             |
			| "box"      | 700    | 0.0      | -1     | 10    | 1      | 1             |
			| "box"      | 700    | 0.0      | 10     | -1    | 1      | 1             |
			| "box"      | 700    | 0.0      | 10     | 10    | -1     | 1             |
			| "box"      | 700    | 0.0      | 10     | 10    | 1      | -1            |
			| "box"      | 0.99   | 0.0      | 10     | 10    | 1      | 1             |
			| "box"      | 1      | 0.0      | 0.99   | 10    | 1      | 1             |
			| "box"      | 1      | 0.0      | 1      | 0.99  | 1      | 1             |
			| "box"      | 700    | 0.0      | 80     | 50    | 1      | 0             |





	Scenario Outline: [Group_ID_308] Restrictions On dimensions with inch Unit

		Given User Set Length Measurement Unit To <Unit>
		When  User Click On Library Button
		And   User Click On Add Product
		And   User Fill in the product properties <Shape>, <Height>, <Diameter>, <Length>, <crushingLimit>, <Width>, And <Weight>
		And   User Click On Save and Close Button
		And   User Click On Cancel Button
		Then  Product Should Not Be Saved



		Examples:
			| Shape      | Height    | Diameter  | Length    | Width     | Weight | crushingLimit | Unit   |
			#| "cylinder" | 0.0393700 | 100       | 0         | 0         | 2      |               | "inch" |
			#| "cylinder" | 700       | 0.0393700 | 0         | 0         | 1      |               | "inch" |
			| "box"      | 0.0393700 | 0.0       | 80        | 50        | 0      | 1.111         | "inch" |
			| "box"      | 700       | 0.0       | 0.0393700 | 50        | 0      | 1.111         | "inch" |
			| "box"      | 700       | 0.0       | 80        | 0.0393700 | 0      | 1.111         | "inch" |




	Scenario Outline: [Case_ID_6969] 101-charcter-Name Products Should Not Be Saved

		When  User Click On Library Button
		And   User Click On Add Product
		And   User Fill in the product properties <Shape>, <Height>, <Diameter>, <Length>, <crushingLimit>, <Width>, And <Weight>
		And   User Set Product Name As <Name>
		And   User Click On Save and Close Button
		And   User Click On Cancel Button
		Then  Product Should Not Be Saved



		Examples:
			| Shape | Height  | Diameter | Length | Width  | Weight | crushingLimit | Name                                                                                                    |
			| "box" | 700.111 | 0.0      | 80.111 | 50.111 | 2.111  |               | "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvw" |





	Scenario Outline: [Case_ID_9794] 100-charcter-Name Products Should Be Saved

		When  User Click On Library Button
		And   User Click On Add Product
		And   User Fill in the product properties <Shape>, <Height>, <Diameter>, <Length>, <crushingLimit>, <Width>, And <Weight>
		And   User Set Product Name As <Name>
		And   User Click On Save and Close Button
		Then  Product Should Be Created



		Examples:
			| Shape | Height  | Diameter | Length | Width  | Weight | crushingLimit | Name                                                                                                   |
			| "box" | 700.111 | 0.0      | 80.111 | 50.111 | 2.111  |               | "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv" |
