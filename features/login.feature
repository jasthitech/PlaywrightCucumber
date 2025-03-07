Feature: Login Functionality

  @smoke
  Scenario: Successful Login
    Given I open the login page
    When I enter valid credentials
    Then I should be redirected to the homepage

  @regression
  Scenario: Login with invalid credentials
    Given I open the login page
    When I enter invalid credentials
    Then I should see an error message
