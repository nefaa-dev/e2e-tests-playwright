@active
Feature: Create Run


    Background:

        Given a logged user with "Owner" role
        And   User Click On Create Load


    @ups @experiment
    Scenario Outline:  [Case_ID_18565][Case_ID_18564] Create Run Using Container Volume Minimization
        Given <DefaultMode> Transportation Mode Is Selected By Default
        And  the user selects a CSV file <File>
        And  User Set Load Name
        And  User Click On Save and Run Button
        Then User Should Be Redirected To Create Run Page
        And  Shipment Maximization Is Selected By default
        When User Select Container Volume Minimization
        And  User select container category as <Container_Type>
        And  User select container name as <Container_Name>
        Then The Other Container Categories Should Be Disabled According To Selected <Container_Type>
        When User Set Winged Contours According To <WingedContourFlags>
        And  User Click On Next Button
        And  User Select <Run_Type>
        And  User Set Run Name
        And  User Click On Run Button
        Then Run Should Be Created
        And  Run Should succeed



        Examples:
            | File                      | Container_Type  | Container_Name     | Run_Type  | DefaultMode    | WingedContourFlags |
            #Using winged contour feature
        #   | "test-data/airPallet.csv" | "Air Pallet"    | "PMC Q5"           | "Instant" | "Air shipment" | "true"             | [ (Q5-F) trigger same snapshot of Q5: pmcq5_]
        #   | "test-data/airPallet.csv" | "Air Pallet"    | "PMC Q7"           | "Instant" | "Air shipment" | "true"             | [ (Q7-F) trigger same snapshot of Q7: pmcq7_]
        #   | "test-data/airPallet.csv" | "Air Pallet"    | "PMC Q6"           | "Instant" | "Air shipment" | "true"             | [ (Q6-F) trigger same snapshot of Q6: pmcq6_or_ldp_]
        #   | "test-data/airPallet.csv" | "Air Pallet"    | "PMC LD P"         | "Instant" | "Air shipment" | "true"             | [ (LDP-F) trigger same snapshot of Q5: pmcq6_or_ldp_]
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC Q7, PMC Q5"   | "Instant" | "Air shipment" | "true, false"      |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC Q7, PMC Q6"   | "Instant" | "Air shipment" | "false, true"      |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC Q6, PMC Q5"   | "Instant" | "Air shipment" | "false, true"      |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC LD P, PLA LD" | "Instant" | "Air shipment" | ""                 |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC LD P, PAG"    | "Instant" | "Air shipment" | ""                 |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC LD P, PMC Q6" | "Instant" | "Air shipment" | ""                 |
            #Without using winged contour feature
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC Q5"           | "Instant" | "Air shipment" | ""                 |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC Q7"           | "Instant" | "Air shipment" | ""                 |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC Q6"           | "Instant" | "Air shipment" | ""                 |
        #   | "test-data/airPallet.csv" | "Air Pallet"    | "PMC LD P"         | "Instant" | "Air shipment" | ""                 |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PLA LD"           | "Instant" | "Air shipment" | ""                 |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PAG"              | "Instant" | "Air shipment" | ""                 |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC Q7, PMC Q5"   | "Instant" | "Air shipment" | ""                 |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC Q7, PMC Q6"   | "Instant" | "Air shipment" | ""                 |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC Q6, PMC Q5"   | "Instant" | "Air shipment" | ""                 |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC LD P, PLA LD" | "Instant" | "Air shipment" | ""                 |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PMC LD P, PAG"    | "Instant" | "Air shipment" | ""                 |
            | "test-data/airPallet.csv" | "Air Pallet"   | "PLA LD, PAG"      | "Instant" | "Air shipment" | ""                 |
        #   | "test-data/valid_csv.csv" | "Uld Container" | "M1H AMD"          | "Instant" | "air shipment" | ""                 |
           # | "test-data/valid_csv.csv" | "Uld Container" | "LD3 AKE"          | "Instant" | "air shipment" | ""                 |
           # | "test-data/valid_csv.csv" | "Uld Container" | "LD6 ALF"          | "Instant" | "air shipment" | ""                 |
           # | "test-data/valid_csv.csv" | "Uld Container" | "M1H AMD, LD3 AKE" | "Instant" | "air shipment" | ""                 |
           # | "test-data/valid_csv.csv" | "Uld Container" | "M1H AMD, LD6 ALF" | "Instant" | "air shipment" | ""                 |
           # | "test-data/valid_csv.csv" | "Uld Container" | "LD6 ALF, LD3 AKE" | "Instant" | "air shipment" | ""                 |







    @ups
    Scenario Outline:  [Case_ID_18568][Case_ID_18567] Create Run Using Shipment Maximization

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
        And  User Set Winged Contours According To <WingedContourFlags>
        And  User Click On Next Button
        And  User Select <Run_Type>
        And  User Set Run Name
        And  User Click On Run Button
        Then Run Should Be Created
        And  Run Should succeed



        Examples:
            | File                      | Container_Type | Container_Name     | Container_Count | Run_Type  | DefaultMode    | WingedContourFlags |
        #  Using winged contour feature
        #   | "test-data/valid_csv.csv" | "Air Pallet"    | "PMC Q7"           | "2"             | "Instant" | "Air shipment" | "true"             |   [ (Q7-F) trigger same snapshot of Q7: pmcq7_]
        #   | "test-data/valid_csv.csv" | "Air Pallet"    | "PMC Q6"           | "2"             | "Instant" | "Air shipment" | "true"             |   [ (Q6-F) trigger same snapshot of Q6: pmcq6_or_ldp_]
        #   | "test-data/valid_csv.csv" | "Air Pallet"    | "PMC Q5"           | "2"             | "Instant" | "Air shipment" | "true"             |   [ (Q5-F) trigger same snapshot of Q5: pmcq5_]
        #   | "test-data/valid_csv.csv" | "Air Pallet"    | "PMC LD P"         | "2"             | "Instant" | "Air shipment" | "true"             |   [ (LDP-F) trigger same snapshot of Q5: pmcq6_or_ldp_]
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PMC Q7, PMC Q5"   | "2,2"           | "Instant" | "Air shipment" | "true, false"      |
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PMC Q7, PMC Q6"   | "2,2"           | "Instant" | "Air shipment" | "false, true"      |
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PMC Q6, PMC Q5"   | "2,2"           | "Instant" | "Air shipment" | "false, true"      |
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PMC LD P, PLA LD" | "2,2"           | "Instant" | "Air shipment" | ""                 |
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PMC LD P, PAG"    | "2,2"           | "Instant" | "Air shipment" | ""                 |
            # Without using winged contour feature
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PMC Q7"           | "2"             | "Instant" | "Air shipment" | ""                 |
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PMC Q6"           | "2"             | "Instant" | "Air shipment" | ""                 |
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PMC Q5"           | "2"             | "Instant" | "Air shipment" | ""                 |
        #   | "test-data/valid_csv.csv" | "Air Pallet"    | "PMC LD P"         | "2"             | "Instant" | "Air shipment" | ""                 |   [ trigger same snapshot of Q6: pmcq6_or_ldp_]
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PLA LD"           | "2"             | "Instant" | "Air shipment" | ""                 |
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PAG"              | "2"             | "Instant" | "Air shipment" | ""                 |
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PMC Q7, PMC Q5"   | "2,2"           | "Instant" | "Air shipment" | ""                 |
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PMC Q7, PMC Q6"   | "2,2"           | "Instant" | "Air shipment" | ""                 |
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PMC Q6, PMC Q5"   | "2,2"           | "Instant" | "Air shipment" | ""                 |
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PMC LD P, PLA LD" | "2,2"           | "Instant" | "Air shipment" | ""                 |
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PMC LD P, PAG"    | "2,2"           | "Instant" | "Air shipment" | ""                 |
            | "test-data/valid_csv.csv" | "Air Pallet"   | "PLA LD, PAG"      | "2,2"           | "Instant" | "Air shipment" | ""                 |
        #   | "test-data/valid_csv.csv" | "Uld Container" | "M1H AMD"          | "3"             | "Instant" | "air shipment" | ""                 |   [ trigger same snapshot of Q7: pmcq7_]
           # | "test-data/valid_csv.csv" | "Uld Container" | "LD3 AKE"          | "3"             | "Instant" | "air shipment" | ""                 |
           # | "test-data/valid_csv.csv" | "Uld Container" | "LD6 ALF"          | "3"             | "Instant" | "air shipment" | ""                 |
           # | "test-data/valid_csv.csv" | "Uld Container" | "M1H AMD, LD3 AKE" | "3,3"           | "Instant" | "air shipment" | ""                 |
           # | "test-data/valid_csv.csv" | "Uld Container" | "M1H AMD, LD6 ALF" | "3,3"           | "Instant" | "air shipment" | ""                 |
           # | "test-data/valid_csv.csv" | "Uld Container" | "LD6 ALF, LD3 AKE" | "3,3"           | "Instant" | "air shipment" | ""                 |


    @ups
    Scenario Outline:  [Case_ID_18570][Case_ID_18571] Create Run Using load contains invalid product through Container Volume Minimization

        Given There is Already Created <Container_Type>
        And  <DefaultMode> Transportation Mode Is Selected By Default
        And  the user selects a CSV file <File>
        And  User Set Load Name
        And  User Click On Save and Run Button
        Then User Should Be Redirected To Create Run Page
        And  Shipment Maximization Is Selected By default
        When User Select Container Volume Minimization
        And  User select container category as <Container_Type>
        And  User select container name as <Container_Name>
        Then The Other Container Categories Should Be Disabled According To Selected <Container_Type>
        When User Click On Next Button
        And  User Select <Run_Type>
        And  User Set Run Name
        And  User Click On Run Button
        Then Modal Should Be Displayed
        And  Modal Should Contain The Invalid Products
        When User Click On Proceed Button
        Then Run Should Be Created
        And  Run Should succeed



        Examples:
            | File                                   | Container_Type | Container_Name | Run_Type  | DefaultMode    |
            | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"   | "PMC Q7"       | "Instant" | "Air shipment" |
    # These tests could be skipped for now since products validation happens at the BE level (just kept one test to make sure that BE treats these kind of scenarios as expected)
    # | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC Q6"           | "Instant" | "Air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC Q5"           | "Instant" | "Air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC LD P"         | "Instant" | "Air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PLA LD"           | "Instant" | "Air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PAG"              | "Instant" | "Air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC Q7, PMC Q5"   | "Instant" | "Air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC Q7, PMC Q6"   | "Instant" | "Air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC Q6, PMC Q5"   | "Instant" | "Air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC LD P, PLA LD" | "Instant" | "Air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC LD P, PAG"    | "Instant" | "Air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PLA LD, PAG"      | "Instant" | "Air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Uld Container" | "M1H AMD"          | "Instant" | "air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Uld Container" | "LD3 AKE"          | "Instant" | "air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Uld Container" | "LD6 ALF"          | "Instant" | "air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Uld Container" | "M1H AMD, LD3 AKE" | "Instant" | "air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Uld Container" | "M1H AMD, LD6 ALF" | "Instant" | "air shipment" |
    # | "test-data/loadWithInvalidProduct.csv" | "Uld Container" | "LD6 ALF, LD3 AKE" | "Instant" | "air shipment" |

    @ups
    Scenario Outline:  [Case_ID_18572][Case_ID_18573] Create Run Using load contains invalid product through Shipment Maximization

        Given There is Already Created <Container_Type>
        And  <DefaultMode> Transportation Mode Is Selected By Default
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
        Then Modal Should Be Displayed
        And  Modal Should Contain The Invalid Products
        When User Click On Proceed Button
        Then Run Should Be Created
        And  Run Should succeed


        Examples:
            | File                                   | Container_Type | Container_Name | Container_Count | Run_Type  | DefaultMode    |
            | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"   | "PMC Q7"       | "2"             | "Instant" | "Air shipment" |
# These tests could be skipped for now since products validation happens at the BE level (just kept one test to make sure that BE treats these kind of scenarios as expected)
# | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"   | "PMC Q6"       | "2"             | "Instant" | "Air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC Q5"           | "2"             | "Instant" | "Air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC LD P"         | "2"             | "Instant" | "Air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PLA LD"           | "2"             | "Instant" | "Air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PAG"              | "2"             | "Instant" | "Air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC Q7, PMC Q5"   | "2,2"           | "Instant" | "Air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC Q7, PMC Q6"   | "2,2"           | "Instant" | "Air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC Q6, PMC Q5"   | "2,2"           | "Instant" | "Air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC LD P, PLA LD" | "2,2"           | "Instant" | "Air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PMC LD P, PAG"    | "2,2"           | "Instant" | "Air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Air Pallet"    | "PLA LD, PAG"      | "2,2"           | "Instant" | "Air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Uld Container" | "M1H AMD"          | "2"             | "Instant" | "air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Uld Container" | "LD6 ALF"          | "2"             | "Instant" | "air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Uld Container" | "LD3 AKE"          | "2"             | "Instant" | "air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Uld Container" | "M1H AMD, LD3 AKE" | "2,2"           | "Instant" | "air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Uld Container" | "M1H AMD, LD6 ALF" | "2,2"           | "Instant" | "air shipment" |
# | "test-data/loadWithInvalidProduct.csv" | "Uld Container" | "LD6 ALF, LD3 AKE" | "2,2"           | "Instant" | "air shipment" |

    @ups
    Scenario Outline: [case_id 31679] User uploads a CSV file, selects containers, and validates the 3D View page and dropdown

        Given the user selects a CSV file <File>
        And  User Set Load Name
        And  User Click On Save and Run Button
        Then User Should Be Redirected To Create Run Page
        When  User select container category as <Container_Type>
        And User select container name as <Container_Name>
        And User Set Winged Contours According To <WingedContourFlags>
        And  User Click On Next Button
        And  User Select <Run_Type>
        And  User Set Run Name
        And  User Click On Run Button
        Then Run Should Be Created
        And  Run Should succeed
        When  User Click On Results Button
        Then  User Should Be Redirected To Results Page
        And the variants dropdown should show <container_used>


        Examples:
            | File                         | Container_Type | Container_Name     | WingedContourFlags | container_used | Run_Type  |
            | "test-data/load_ldp.csv"     | "Air Pallet"   | "PMC LD P, PMC Q5" | "true"             | "PMC LD P"     | "Instant" |
            | "test-data/load_ldp.csv"     | "Air Pallet"   | "PMC LD P, PMC Q6" | "true"             | "PMC LD P"     | "Instant" |
            | "test-data/load_ldp.csv"     | "Air Pallet"   | "PMC LD P, PMC Q7" | "true"             | "PMC LD P"     | "Instant" |
            | "test-data/load_ldp_f.csv"   | "Air Pallet"   | "PMC LD P, PMC Q5" | "true"             | "PMC LD P-F"   | "Instant" |
            | "test-data/load_ldp_f.csv"   | "Air Pallet"   | "PMC LD P, PMC Q6" | "true"             | "PMC LD P-F"   | "Instant" |
            | "test-data/load_ldp_f.csv"   | "Air Pallet"   | "PMC LD P, PMC Q7" | "true"             | "PMC LD P-F"   | "Instant" |
            | "test-data/load_ldp_max.csv" | "Air Pallet"   | "PMC LD P, PMC Q5" | "true"             | "PMC LD P-MAX" | "Instant" |
            | "test-data/load_ldp_max.csv" | "Air Pallet"   | "PMC LD P, PMC Q6" | "true"             | "PMC LD P-MAX" | "Instant" |
            | "test-data/load_ldp_max.csv" | "Air Pallet"   | "PMC LD P, PMC Q7" | "true"             | "PMC LD P-MAX" | "Instant" |