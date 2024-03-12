Feature: Login actions

    As a user of sauclabs
    I must be able to login to the App

    Scenario: Login with Valid credentials
        Given I visit the login page
        When I enter valid credentials
        Then I should see the home page