# Contribution guidelines

Here you will find all the necessary information regarding how to create file, write and structure code for this project. Developers are always welcome to contribute to these guidelines with clear examples.

## General guidelines
- Avoid hard-coding values instead create constant variables
- Use absolute paths for `import` statements
- Avoid using negative conditions
- Avoid using nested ternary, instead use `if`-`else` blocks
- Leave wide spaces in codes

## Next.js 
- Wherever possible create Static Side Generated Pages for better performance.(Reference: https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering)
- Avoid using client side rendering, instead use server side rendering. (Reference : https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering)
    - When the initial loading needs to be fast and there is more static content, prefer using server side rendering.
    - When the page has large and dynamic data and the focus is a rich page with a large number of users, prefer client side rendering.

## Git and Github

- Avoid making large pull requests so that code review gets easier
- Add appropriate documentation with your changes

## Commit messages

Commit messages should adhere to the following guidelines:

- Should be in active case
- Should be divided into a subject line and a body
- The subject summarizes the code changes in commit
- Use the body to explain what and why vs. How
- Separate subject from body with a blank line
- Use the imperative mood in the subject line
- Do not end the subject line with a period
- Limit the subject line to 50 characters
- Capitalize the subject line
- Wrap the body at 72 characters

Reference: [how to write good commits](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13
 https://chris.beams.io/posts/git-commit)

## Directory structure

Every feature should have a separate folder in the pages directory, all the routes related to the feature should be in that folder.  

```

  └── __tests__
        └── HomeTest.js
  
  └── components
        ├── Sidenav.js
        ├── Button.js
        └── Loader.js
  
  └── cypress
        └── components
               └── home.spec.js
        
  └── helpers
        ├── withAuth.js
        ├── withoutAuth.js
        ├── edittemplate.js
        └── activelink.js
        
  └── pages
       	├── Auth
        |  		├── login.js
        |  		└── signup.js
        | 
       	├── Dashboard
        |  		├── statistics.js
        |  		├── paymentlogs.js
        |  		├── orderlogs.js
        |  		├── restaurantprofile.js
        |  		└── fooditems.js
        |
        ├── Template
        |  		├── chooseTemplate.js
        |  		├── templateone.js
        |  		└── templatetwo.js
        |
        ├── Restaurant
        |  		└── [restaurant].js (Dynamic Route)
        |      
        ├── End Customer
        |     ├── login.js
        |     ├── signup.js
        |     └── checkkout.js
        |
        ├── _app.js
        ├── _document.js
        └── index.js
  
  └── public
        └── image.png        

  └── services
        └── firebase.js

  └── styles
        └── global.js         

```          	

## Naming

Lowercase is preferred for folder and file names, one exception to this is Files which represent the React components, for which Capitalized is preferred. (References : https://nextjs.org/docs/routing/introduction)

## Styles

- `components` will contain reusable UI component for eg. `Button`, `Input` etc.
- If a style is specific only to the component, and cannot be used anywhere else, use inline styling using styled-components.
- All CSS should be used with styled-components and bootstrap. 

## Testing

- Write unit tests using jest in the __test__ folder.
- Write integration test using cypress in cypress/integration folder.
- Make sure you cover at least 50% of the test-case scenario.
- You can generate "test coverage" for modified files using the `npm run test:coverage` command.



