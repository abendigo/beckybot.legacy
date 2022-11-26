Feature: Mention

  If BeckyBot is mentioned in a Slack channel, respond by saying Hi!

  Scenario: A user mentions BeckyBot
    When David mentions @BeckyBot
    Then BeckyBot should respond with 'Hi <@David>'
