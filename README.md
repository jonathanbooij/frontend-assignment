# Assignment Rabobank

Rabobank’s software is mainly used to get insights on customer transactions. Within this assignment there is some backend software created to spin up a NodeJS service which serves a transactions file. Create an Angular application where a user can see their transactions in in list (timeline).

The requirements are:

- All transactions should be shown
- All transactions should be showed grouped based on date and ordered (newest on top)
- The information in the timeline should only show `otherParty.name` and the `amount` in EUR. (Be aware there is some USD as well, need to convert it based on the rate)
- When clicking on a transaction you should navigate to a detail page showing the more in-depth details
- It would be nice if there is some sort of styling (scss)

In addition to the code, consider other matters that you consider as part of your work.

## Thats it, happy 💻!

# Additions / explanation

- Used a domain driven approach, where the data layer is now using angulars http client but could easily be swapped
- Repository is using the data layer and doing now all the work of mapping the data to a usable format for the frontend
- Added some buttons to improve accessibility and keyboard navigation, navigation should work using only tab and enter keys
- Used server side rendering installation of angular, it also caches the transaction request (304 Not Modified)
- Added prettier and linting command (npm run format)

## Further improvements possible:

- Due to time constraints and the focus of this assignment on the functionality and architecture of the app, unit tests have not been included. This app is structured in a modular and testable way, so unit tests could easily be added later.
- Used semantic commit messages, further validation could have been added using e.g. husky
- Constructing repeated UI components inside shared/components, I found it not necessary for the small scope of this app
- If more complex logic, the sorting or mapping logic of the repository could have been moved to another mapper/format service, but since it was not much logic and for simplicity left it like this

## Later update!
- Misread the assignment, should be grouped by date, it is now.