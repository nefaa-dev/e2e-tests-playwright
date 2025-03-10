@test-organization
Feature: Delete Loads

    Background:

        Given a logged user with "Owner" role
        And   User Created Loads "test-data/valid_csv.csv"



    Scenario Outline: [Case_ID_436] User Should Be Able To Delete multiple Loads

        When User Click On Check All box
        Then All Loads Should Be Checked
        When User Click On Delete Selection Button
        And  User Confirm Deletion
        Then Loads Should Be Deleted





