@test-organization
Feature: Delete Container



	Background:

		Given a logged user with "Owner" role




	Scenario Outline: [Case_ID_64][Case_ID_721][Case_ID_3076] Delete unused container

		Given  User Created Container Of Type <containerCategory>
		When   User Click On Library Button
		And    User Select Container Category as <containerCategory>
		And    User Click On Bin Icon
		And    User Click On Delete Button
		Then   Container Should Be Deleted


		Examples:
			| containerCategory |
			| "sea container"   |
			| "box"             |
			| "ground pallet"   |
	Scenario Outline: [Case_ID_6657][Case_ID_6656][Case_ID_722] Delete used container


		Given  User Created Container Of Type <containerCategory>
		And    User Created Load Using "test-data/valid_csv.csv" In Transportation Mode "Land & Sea shipment"
		And    User Created Run Using The Created Container
		When   User Click On Library Button
		And    User Select Container Category as <containerCategory>
		Then   Container Is Not Deletable
		When   User Click On Loads
		And    User Delete The Load
		And    User Click On Library Button
		And    User Select Container Category as <containerCategory>
		Then   Container Should Be Deletable



		Examples:
			| containerCategory |
			| "sea container"   |
			| "box"             |
			| "ground pallet"   |