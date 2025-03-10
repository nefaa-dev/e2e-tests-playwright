#@test-organization  [results changed after changing to new snapshots with ups hotfixes]: to be discussed and updated accordingly
Feature: Check Run Details


Background: 
    
	Given a logged user with "Owner" role
	And    User Click On Create Load 
	And    "Land & Sea shipment" Transportation Mode Is Selected By Default
	And    the user selects a CSV file "test-data/RunDetails.csv"
	And    User Set Load Name
	And    User Click On Save and Run Button
	And    Container Volume Minimization Is Selected By default
	And    User select container category as "Ground Pallet" 
	And    User select container name as "US Pallet"
	And    User Click On Next Button
	And    User Select "Instant"
	And    User Set Run Name
    And    User Click On Run Button
    And    Run Should Be Created 
    And    Run Should succeed
	And    User Click On Results Button
    And    User Should Be Redirected To Results Page 


Scenario: [Case_ID_3471] Run details should be displayed correctly

	
	When User Check Total Products info 
	Then Total Products should be correct 
	When User Check Total Items info 
	Then Total Items should be correct 
	When User Check Filled volume info 
	Then Filled volume should be correct
	When User Check Filled weight info 
	Then Filled weight should be correct
	When User Check Total weight info 
	Then Total weight should be correct
	When User Check Achieved height info 
	Then Achieved height should be correct
	When User Check Weight percentage info 
	Then Weight percentage should be correct
	When User Check Volume percentage info 
	Then Volume percentage should be correct