Feature: Happy Friday!

  When a channelUser says "Happy Friday", respond with
  a link to the Rebecca Black Friday video on YouTube

  Scenario: Happy Friday!
    Given @botUser has joined a slack channel
    When @channelUser says 'Happy Friday'
    Then @botUser should respond with a YouTube link

  Scenario: Happy Humpday!
    Given @botUser has joined a slack channel
    When @channelUser says 'Happy Humpday'
    Then @botUser should respond with a GIF
