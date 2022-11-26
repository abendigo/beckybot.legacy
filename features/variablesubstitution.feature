Feature: Variable Substitution

  When a response contains a variable, substitute in the current value

  Scenario: dayName
    Given the response is "It's {dayName}"
    And today is Monday
    When ChannelUser triggers the response
    Then BeckyBot should respond with "It's Monday"