Feature: Mention

  When the @botuser is mentioned in a Slack channel,
  respond by saying Hi!

  Scenario: @someUser mentions @botUser
    Given @botUser has joined a slack channel
    When @someUser mentions @botUser
    Then @botUser should respond with 'Hi <@someUser>'
