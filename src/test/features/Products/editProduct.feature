@test-organization
Feature: Edit Product

    Background:

        Given    a logged user with "Owner" role
        And      User Click On Library Button
        And      User Created Product


    
    Scenario Outline: [Case_ID_547] Owner Should Be Able To Edit Products

        When   User Click On Vertical Ellipsis Of The Product
        And    User Click On Edit Option Of The Product
        And    User Fill in the product properties <Shape>, <Height>, <Diameter>, <Length>, <crushingLimit>, <Width>, And <Weight>
        And    User Click On Update Product Button
        Then   Product Should Be Updated


        Examples:
            | Shape | Height  | Diameter | Length | Width  | Weight | crushingLimit |
            | "box" | 700.111 |          | 80.111 | 50.111 | 2.111  | 1             |