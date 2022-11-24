Feature: Happy Friday!

  When a channel user says "Happy Friday", respond with
  a link to the Rebecca Black Friday video on YouTube

  Scenario: Happy Friday!
    Given BeckyBot has joined a slack channel
    And today is Friday
    When ChannelUser says 'Happy Friday'
    Then BeckyBot should respond with a YouTube link

  # Scenario: Happy Humpday!
  #   Given @botUser has joined a slack channel
  #   When @channelUser says 'Happy Humpday'
  #   Then @botUser should respond with a GIF
