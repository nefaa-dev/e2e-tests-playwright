@active
Feature: Create Load

    Background:

        Given a logged user with "Owner" role
        And   User Click On Create Load





    @myriad360
    Scenario Outline: [Case_ID_2291][Case_ID_2294] Check Load Threshold For Myriad Client

        Given <DefaultMode> Transportation Mode Is Selected By Default
        And   the user selects a CSV file <File>
        And   User Set Load Name
        And   User Save Load
        Then  Notification Should Pop-Up <Message>
        And   User Should Still at Create Load page

        Examples:
            | File                      | Mode                  | DefaultMode           | Message                                                           |
            | "test-data/51UP_500Q.csv" | "Land & Sea shipment" | "Land & Sea shipment" | "You exceeded the maximum number of unique products per load"     |
            | "test-data/50UP_501Q.csv" | "Land & Sea shipment" | "Land & Sea shipment" | "You exceeded the maximum number of total items allowed per load" |


    @myriad360
    Scenario Outline: [Case_ID_2292+2295][Case_ID_2296][Case_ID_2293] Check Load Threshold For Myriad Client

        Given <DefaultMode> Transportation Mode Is Selected By Default
        And   the user selects a CSV file <File>
        And   User Set Load Name
        And   User Save Load
        Then  User Should Be Redirected To Dashboard Page
        And   Load Should Be Saved
        And   Type Of Shipment Should Be As Expected According To <DefaultMode>


        Examples:
            | File                      | Mode                  | DefaultMode           |
            | "test-data/50UP_500Q.csv" | "Land & Sea shipment" | "Land & Sea shipment" |
            | "test-data/50UP_499Q.csv" | "Land & Sea shipment" | "Land & Sea shipment" |
            | "test-data/49UP_500Q.csv" | "Land & Sea shipment" | "Land & Sea shipment" |



    #@ups
    Scenario Outline: [Case_ID_2291][Case_ID_2294] Check Load Threshold For UPS Client

        Given <DefaultMode> Transportation Mode Is Selected By Default
        And   the user selects a CSV file <File>
        And   User Set Load Name
        And   User Save Load
        Then  Notification Should Pop-Up <Message>
        And   User Should Still at Create Load page


        Examples:
            | File                      | Mode                  | DefaultMode    | Message                                                           |
            | "test-data/61UP_101Q.csv" | "Land & Sea shipment" | "air shipment" | "You exceeded the maximum number of unique products per load"     |
            | "test-data/60UP_201Q.csv" | "Land & Sea shipment" | "air shipment" | "You exceeded the maximum number of total items allowed per load" |



    #@ups
    Scenario Outline: [Case_ID_2292+2295][Case_ID_2296][Case_ID_2293] Check Load Threshold For UPS Client

        Given <DefaultMode> Transportation Mode Is Selected By Default
        And   the user selects a CSV file <File>
        And   User Set Load Name
        And   User Save Load
        Then  User Should Be Redirected To Dashboard Page
        And   Load Should Be Saved
        And   Type Of Shipment Should Be As Expected According To <DefaultMode>


        Examples:
            | File                      | Mode                  | DefaultMode    |
            | "test-data/60UP_200Q.csv" | "Land & Sea shipment" | "air shipment" |
            | "test-data/59UP_199Q.csv" | "Land & Sea shipment" | "air shipment" |
            | "test-data/59UP_200Q.csv" | "Land & Sea shipment" | "air shipment" |
