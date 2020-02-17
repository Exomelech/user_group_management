# Courses and user managment system

## Tech-stack
ReactJS - main tech\
Redux - for providing data in to components and minimizing request to db ( in our case localStorage )\
SCSS - for styling\
Babelrc - for compatibility with older browser\
Webpack - to build light-weight bundle

## Usage

U can add groups, users.
Create user directly in group, add existing user to the group
Add user to the specified group when create user
Remove user from group, delete user\group

All user fullnames and groups titles are clickable

Also creation windows have a regexp pattern test, so user first name and last name input fields must have first capital letter, email input field must have ```@``` sig, and all field should consist at least 3 character to pass validation. Same pattern used in group creatation, except first capital letter.