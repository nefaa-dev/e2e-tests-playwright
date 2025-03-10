@test-organization
Feature: Remaining Products List

    The remaining products list should be available for users in both load planning modes:
    - In Container volume minimization: the list must not contain remaining products
    - In shipment maximization: the list might contain remaining products


    Background:

    Given a logged user with "Owner" role



    @remain
    Scenario Outline: [Case_ID_3442][Case_ID_3443] Remaining products using Shipment Maximization/Container volume minimization

        Given User Click On Create Load
        And   User Select The Transportation Mode <Mode>
        And   the user selects a CSV file <File>
        And   User Set Load Name
        And   User Click On Save and Run Button
        And   User Should Be Redirected To Create Run Page
        And   Container Volume Minimization Is Selected By default
        And   User Select Load Planning As <loadPlanning>
        And   User select container category as <Container_Type>
        And   User select container name as <Container_Name>
        And   User Click On Next Button
        And   User Select <Run_Type>
        And   User Set Run Name
        And   User Click On Run Button
        And   Run Should Be Created
        When  Run Should succeed
        Then  Run Should Be <packedAsExpected> Packed
        When  User Click On Results Button
        Then  User Should Be Redirected To Results Page
        When  User Get The Total Items Of Each Container
        And   User Click On Remaining Products Button
        And   User Get The Total Unpacked Items
        And   User Close The Remaining Products Modal
        Then  Sum of Packed And Unpacked Items Should Be Equal To The Total Quantity


        Examples:
            | File                               | loadPlanning            | packedAsExpected   | Mode                  | Container_Type   | Container_Name | Run_Type  | 
            | "test-data/forRemainingPrdcts.csv" | "shipment maximization" | "Partially Packed" | "Land & Sea shipment" | "Sea Containers" | "20 Standard"  | "Instant" |
            | "test-data/forRemainingPrdcts.csv" | "volume minimization"   | "Fully Packed"     | "Land & Sea shipment" | "Sea Containers" | "20 Standard"  | "Instant" |



