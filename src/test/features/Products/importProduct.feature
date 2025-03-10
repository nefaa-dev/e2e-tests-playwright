@test-organization
Feature: Import Products

    User should be able to import products to create and save loads

    Background:
        Given a logged user with "Owner" role
        And   User Click On Library Button
        And   User Created Product
        And   User Click On Loads
        And   User Click On Create Load
        And   User Set Load Name
        And   User Click On Add Shipment Button
        And   User Set Shipment Name

    
    Scenario: [Case_ID_6652] User should be able to import products

       When User Click On Import Product Button
       Then Modal Should Be Displayed 
       When User Select All Products 
       And  User Click On Add Products Button
       Then Products Should Be Imported As Expected

