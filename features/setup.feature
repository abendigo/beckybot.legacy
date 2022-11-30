Feature: Application Setup

  For the application to run properly, a Slack App must be created,
  and some environment variables (SLACK_???_ID, SLACK_???_SECRET)
  need to be passed in.

  Scenario: One or more envrinment variables are not set
    Given missing setup
    When Adam loads the application
    Then Adam should see some setup instructions

  Scenario: All required environment variables are set
    Given complete setup
    When Betty loads the application
    Then Betty should see the home page
