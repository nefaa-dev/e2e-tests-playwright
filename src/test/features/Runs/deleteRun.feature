@test-organization
Feature: Delete Run

    Background:
        
        Given a logged user with "Owner" role
        And   User Click On Create Load
        And   User Select The Transportation Mode "Land & Sea shipment"
        And   the user selects a CSV file "test-data/valid_csv.csv"
        And   User Set Load Name
        And   User Click On Save and Run Button
        And   User Should Be Redirected To Create Run Page
        And   Container Volume Minimization Is Selected By default
        And   User select container category as "Sea Containers"
        And   User select container name as "20 Standard"
        And   User Click On Next Button
        And   User Select "Instant"
        And   User Set Run Name
        And   User Click On Run Button
        And   Run Should Be Created
        And   Run Should succeed





    Scenario Outline: [Case_ID_65] User Should Be Able To Delete a Single Run

        When User Click On Vertical Ellipsis Of The Run
        And  User Click On Delete Option Of The Run
        And  User Click On Delete Button Of The Run
        Then Run Should Be Deleted



