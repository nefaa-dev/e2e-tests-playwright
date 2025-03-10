@test-organization
Feature: Check Run Details


    Background:

        Given  a logged user with "Owner" role
        And   User Click On Create Load
        And  "Land & Sea shipment" Transportation Mode Is Selected By Default
        And  the user selects a CSV file "test-data/productsDetails.csv"
        And  User Set Load Name
        And  User Click On Save and Run Button
        And  Container Volume Minimization Is Selected By default
        And  User select container category as "Ground Pallet"
        And  User select container name as "US Pallet"
        And  The Other Container Categories Should Be Disabled According To Selected "Ground Pallet"
        And  User Click On Next Button
        And  User Select "Instant"
        And  User Set Run Name
        And  User Click On Run Button
        And  Run Should Be Created
        And  Run Should succeed
        And  User Click On Results Button
        And  User Should Be Redirected To Results Page


    Scenario: [Case_ID_2522] Products details should be displayed correctly

        When User Expand First Product Details
        Then First Product Details Should Be As Expected
