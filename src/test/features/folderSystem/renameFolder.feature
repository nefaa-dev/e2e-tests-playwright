@test-organization
Feature: Rename Folder

    Background:
        Given a logged user with "Owner" role
        And  User Should Be Redirected To The "Loads" Page
        And  User Already Created Folder


    Scenario: [case_id 31104] Successfully rename a folder
        When User Clicks On Folder's Actions Button
        And  User Clicks On The "rename" Button
        Then The Popup Should Be "visible"
        When User Sets The New Folder Name
        And  User Clicks On The "save" Button
        Then The Popup Should Be "hidden"
        When User Search For The New Folder
        Then The New Folder Should Be "visible" In The Search Results
        When User Search For The Folder
        Then Folder Should Be "hidden" In The Search Results




    Scenario: [case_id 31104] Verify Rename Folder Modal
        When User Clicks On Folder's Actions Button
        And  User Clicks On The "rename" Button
        Then The Popup Should Be "visible"
        And  The Popup Should Contain The Following Elements:
            | Element     |
            | Folder Name |
            | Cancel      |
            | Save        |
        And User Clicks On The "cancel" Button
    
    
    Scenario: [case_id 31104] Folder Name should be required
        When User Clicks On Folder's Actions Button
        And  User Clicks On The "rename" Button
        And  User Sets An Empty Folder Name
        And  User Clicks On The "save" Button
        Then The Popup Should Be "visible"
        When User Hover Over The Folder Name Input
        Then Tooltip "Folder name is required" Should Be Displayed
        And  User Clicks On The "cancel" Button





