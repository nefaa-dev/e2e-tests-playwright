@test-organization
Feature: Create Container

	Background:


		Given a logged user with "Owner" role



	@smoke @cont
	Scenario Outline: [Case_ID_63][Case_ID_785][Case_ID_786] User Should Be Able To Create valid container
		When  User Click On Library Button
		And   User Select Container Category as <containerCategory>
		And   User Click On Add Container Button
		And   User Fill in the container properties <Height> , <Length> , <Width> ,<MaxCargo>, <maxHeight> And <EmptyWeight>
		And   User Save Container
		And   User Click On Close Button
		Then  Container Should Be Created

		Examples:
			| containerCategory | Height | Length | Width | MaxCargo | EmptyWeight | maxHeight |
			| "sea container"   | 700    | 800    | 989   | 50       | 10          | ""        |
			| "ground pallet"   | 100    | 100    | 800   | 700      | 50          | "1000"    |
			| "box"             | 100    | 100    | 100   | 5        | 1           | ""        |




	Scenario Outline: [Case_ID_785+786][Case_ID_787+788] User Should Be Able To Create container with some decimal dimensions
		When  User Click On Library Button
		And   User Select Container Category as <containerCategory>
		And   User Click On Add Container Button
		And   User Fill in the container properties <Height> , <Length> , <Width> ,<MaxCargo>, <maxHeight> And <EmptyWeight>
		And   User Save Container
		And   User Click On Close Button
		Then  Container Should Be Created

		Examples:
			| containerCategory | Height | Length | Width | MaxCargo  | EmptyWeight | maxHeight |
			| "sea container"   | 700    | 800    | 989   | 50.11111  | 10.11111    | ""        |
			| "ground pallet"   | 100    | 100    | 800   | 700.11111 | 50.11111    | "1000"    |








	Scenario Outline: [Group_ID_312][Group_ID_313][Group_ID_898] User Should Not Be Able To Create Invalid container

		When  User Click On Library Button
		And   User Select Container Category as <containerCategory>
		And   User Click On Add Container Button
		And   User Fill in the container properties <Height> , <Length> , <Width> ,<MaxCargo>, <maxHeight> And <EmptyWeight>
		And   User Save Container
		And   User Click On Close Button
		Then  Container Should Not Be Saved

		Examples:
			| containerCategory | Height | Length | Width | MaxCargo    | EmptyWeight | maxHeight |
			| "sea container"   | 0      | 800    | 1000  | 50          | 50          | ""        |
			| "sea container"   | -1     | 800    | 1000  | 50          | 50          | ""        |
			| "sea container"   | 100    | 0      | 1000  | 50          | 50          | ""        |
			| "sea container"   | 100    | -1     | 1000  | 50          | 50          | ""        |
			| "sea container"   | 100    | 800    | -1    | 50          | 50          | ""        |
			| "sea container"   | 100    | 800    | 0     | 50          | 50          | ""        |
			| "sea container"   | 100    | 800    | 100   | -1          | 50          | ""        |
			| "sea container"   | 100    | 800    | 100   | 0           | 50          | ""        |
			| "sea container"   | 100    | 800    | 100   | 50          | -1          | ""        |
			| "sea container"   | 100    | 800    | 100   | 501         | 0           | ""        |
			| "sea container"   | 700    | 800    | 989   | 50          | 10.111111   | ""        |
			| "sea container"   | 700    | 800    | 989   | 50.111111   | 10          | ""        |
			| "box"             | 0      | 800    | 1000  | 50          | 50          | ""        |
			| "box"             | -1     | 800    | 1000  | 50          | 50          | ""        |
			| "box"             | 100    | 0      | 1000  | 50          | 50          | ""        |
			| "box"             | 100    | -1     | 1000  | 50          | 50          | ""        |
			| "box"             | 100    | 800    | -1    | 50          | 50          | ""        |
			| "box"             | 100    | 800    | 0     | 50          | 50          | ""        |
			| "box"             | 100    | 800    | 100   | -1          | 50          | ""        |
			| "box"             | 100    | 800    | 100   | 0           | 50          | ""        |
			| "box"             | 100    | 800    | 100   | 50          | -1          | ""        |
			| "box"             | 100    | 800    | 100   | 501         | 0           | ""        |
			| "ground pallet"   | 0      | 800    | 1000  | 50          | 2           | "200"     |
			| "ground pallet"   | -1     | 800    | 1000  | 50          | 1           | "200"     |
			| "ground pallet"   | 100    | 0      | 1000  | 50          | 1           | "200"     |
			| "ground pallet"   | 100    | -1     | 1000  | 50          | 1           | "200"     |
			| "ground pallet"   | 100    | -1     | 1000  | 50          | 1           | "200"     |
			| "ground pallet"   | 100    | 800    | -1    | 50          | 1           | "200"     |
			| "ground pallet"   | 100    | 800    | 0     | 50          | 1           | "200"     |
			| "ground pallet"   | 100    | 800    | 100   | -1          | 1           | "200"     |
			| "ground pallet"   | 100    | 800    | 100   | 0           | 1           | "200"     |
			| "ground pallet"   | 100    | 800    | 100   | 50          | -1          | "200"     |
			| "ground pallet"   | 100    | 800    | 100   | 50          | 0           | "200"     |
			| "ground pallet"   | 100    | 800    | 100   | 50          | 1           | "100"     |
			| "ground pallet"   | 200    | 800    | 100   | 50          | 1           | "100"     |
			| "ground pallet"   | 200    | 800    | 100   | 50          | 1           | "-1"      |
			| "ground pallet"   | 200    | 800    | 100   | 50          | 1           | "0"       |
			| "ground pallet"   | 1000   | 800    | 100   | 50          | 1000        | "999"     |
			| "ground pallet"   | 1000   | 800    | 100   | 50          | 1000        | "1000"    |
			| "ground pallet"   | 100    | 100    | 800   | 700         | 50.111111   | "1000"    |
			| "ground pallet"   | 100    | 100    | 800   | 700.1111111 | 50          | "1000"    |





	Scenario Outline: [Case_ID_458][Case_ID_9795] User Should Not Be Able To Create container with duplicate name

		When  User Click On Library Button
		And   User Select Container Category as <containerCategory>
		And   User Click On Add Container Button
		And   User Fill in the container properties <Height> , <Length> , <Width> ,<MaxCargo>, <maxHeight> And <EmptyWeight>
		And   User Set Container Name as <Name>
		And   User Save Container
		Then  Notification Should Pop-Up <message>
		And   User Click On Close Button
		Then  Container Should Not Be Saved

		Examples:
			| containerCategory | Height | Length | Width | MaxCargo  | EmptyWeight | maxHeight | Name          | message                |
			| "sea container"   | 700    | 800    | 989   | 50.11111  | 10.11111    | ""        | "20 Standard" | "Name is already used" |
			| "ground pallet"   | 100    | 100    | 800   | 700.11111 | 50.11111    | "1000"    | "US Pallet"   | "Name is already used" |




	Scenario Outline: [Case_ID_885][Case_ID_886] Internal Volume Should Be Calculated Correctly

		When  User Click On Library Button
		And   User Select Container Category as <containerCategory>
		And   User Click On Add Container Button
		And   User Fill in the container properties <Height> , <Length> , <Width> ,<MaxCargo>, <maxHeight> And <EmptyWeight>
		And   User Save Container
		And   User Click On Close Button
		Then  Container Should Be Created
		When  User Expand Container Details
		Then  Internal Volume Value Should Be As <ExpectedInternalVolume> For <containerCategory>

		Examples:
			| containerCategory | Height | Length | Width | MaxCargo | EmptyWeight | maxHeight | ExpectedInternalVolume |
			| "sea container"   | 100    | 100    | 100   | 50       | 1           | ""        | "0.001 m3"             |
			| "ground pallet"   | 10     | 100    | 100   | 7        | 1           | "100"     | "0.001 m3"             |


	@skip
	Scenario Outline: [Case_ID_575] User should not be able to create more than 30 custom containers

		Given User Click On Library Button
		And   User Has <ThresholdIncludingPredefined> Containers
		When  User Select Container Category as <containerCategory>
		And   User Click On Add Container Button
		And   User Fill in the container properties <Height> , <Length> , <Width> ,<MaxCargo>, <maxHeight> And <EmptyWeight>
		And   User Save Container
		Then  Notification Should Pop-Up <message>
		And   User Click On Close Button
		Then  Container Should Not Be Saved

		Examples:
			| containerCategory | Height | Length | Width | MaxCargo | EmptyWeight | maxHeight | ThresholdIncludingPredefined | message                                |
			| "sea container"   | 700    | 800    | 989   | 50.11111 | 10.11111    | ""        | 41                           | "Maximum containers number is reached" |