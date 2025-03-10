@test-organization
Feature: Check Previews Details


    Background:

        Given  a logged user with "Owner" role
        And    User Click On Create Load
        And    "Land & Sea shipment" Transportation Mode Is Selected By Default
        And    the user selects a CSV file "test-data/RunDetails.csv"
        And    User Set Load Name
        And    User Click On Save and Run Button
        And    Container Volume Minimization Is Selected By default
        And    User select container category as "Sea Containers"
        And    User select container name as "20 Standard"
        And    User Click On Next Button
        And    User Select "Instant"
        And    User Set Run Name
        And    User Click On Run Button
        And    Run Should Be Created
        And    Run Should succeed


    
    Scenario: [Case_ID_6980] Run Previews should be displayed correctly


        When User Click On The Run
        Then User Should Be Redirected To Previews Page
        When User Check Used Containers
        Then Used Containers Should Be As Expected
        When User Check Total Number Of Containers Info
        Then Total Number Of Containers Should Be As Expected
        When User Check Volume Utilization Info
        Then Volume Utilization Should Be Correct
        When User Check Weight Utilization Info
        Then Weight Utilization Should Be Correct
        When User Check Total Packed Items Info
        Then Total Packed Items Should Be Correct