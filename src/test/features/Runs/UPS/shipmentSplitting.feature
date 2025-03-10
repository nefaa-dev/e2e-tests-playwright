@active
Feature: Shipment Splitting


    Background:

        Given a logged user with "Owner" role
        And   User Click On Create Load


    #@ups [shipment splitting will be allowed from now on (ticket id:3934)]
    Scenario Outline:  [Case_ID_17654] No Shipment Splitting Using Shipment maximization

        Given <DefaultMode> Transportation Mode Is Selected By Default
        And  the user selects a CSV file <File>
        And  User Set Load Name
        And  User Click On Save and Run Button
        Then User Should Be Redirected To Create Run Page
        And  Shipment Maximization Is Selected By default
        When User select container category as <Container_Type>
        And  User select container name as <Container_Name>
        Then The Other Container Categories Should Be Disabled According To Selected <Container_Type>
        When User set container count as <Container_Count>
        And  User Click On Next Button
        And  User Select <Run_Type>
        And  User Set Run Name
        And  User Click On Run Button
        Then Run Should Be Created
        And  Run Should succeed
        And  Run Should Be <packedAsExpected> Packed
        When User Click On Results Button
        Then User Should Be Redirected To Results Page
        And  Products With <indexes> Should Be As Expected In <expectedPacked>
        When User Click On Remaining Products Button
        Then Remaning Products Should Be As Expected In <expectedRemaining>




        Examples:
            | File                        | Container_Type  | Container_Name | Container_Count | Run_Type  | DefaultMode    | packedAsExpected   | indexes | expectedPacked                         | expectedRemaining                         |
            | "test-data/NoShipSplit.csv" | "Uld Container" | "LD6 ALF"      | "2"             | "Instant" | "air shipment" | "Partially Packed" | "1,2"   | "test-data/expectedPackedProducts.csv" | "test-data/expectedRemainingProducts.csv" |



    #@ups
    Scenario Outline:  [Case_ID_17656][Case_ID_19613] The Whole Load Should remain as unpacked in case no shipment can be packed without shipment splitting
        Given <DefaultMode> Transportation Mode Is Selected By Default
        And the user selects a CSV file <File>
        And  User Set Load Name
        And  User Click On Save and Run Button
        Then User Should Be Redirected To Create Run Page
        And  Shipment Maximization Is Selected By default
        When User select container category as <Container_Type>
        And  User select container name as <Container_Name>
        Then The Other Container Categories Should Be Disabled According To Selected <Container_Type>
        When User set container count as <Container_Count>
        And  User Click On Next Button
        And  User Select <Run_Type>
        And  User Set Run Name
        And  User Click On Run Button
        Then Run Should Be Created
        And  Run Should succeed
        And  Run Should Be <packedAsExpected> Packed
        And  Results Button Should Be Hidden
        And  Results Previews Should Be Inaccessible
        When User Click On Vertical Ellipsis Of The Run
        And  User Click On Unpacked Products Option
        Then Remaning Products Should Be As Expected In <expectedRemaining>


        Examples:
            | File                         | Container_Type  | Container_Name | Container_Count | Run_Type  | DefaultMode    | packedAsExpected | expectedRemaining                           |
            | "test-data/unpackedLoad.csv" | "Uld Container" | "LD6 ALF"      | "1"             | "Instant" | "air shipment" | "Unpacked"       | "test-data/remainingListOfUnpackedLoad.csv" |




