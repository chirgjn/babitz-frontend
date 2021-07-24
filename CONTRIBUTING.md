# Contribution guidelines

Here you will find all the necessary information regarding how to create file, write and structure code for this project. Developers are always welcome to contribute to these guidelines with clear examples.

## General guidelines
- Avoid hard-coding values instead create constant variables
- Use absolute paths for `import` statements
- Avoid using negative conditions
- Avoid using nested ternary, instead use `if`-`else` blocks
- Leave wide spaces in codes

## Next.js 
- Wherever possible create Static Side Generated Pages for better performance. [Pre-rendering in nextjs](https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering)
- Avoid using client side rendering, instead use server side rendering. [Pre-rendering in nextjs(CSR, SSR)](https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering)
    - When the initial loading needs to be fast and there is more static content, prefer using server side rendering.
    - When the page has large and dynamic data and the focus is a rich page with a large number of users, prefer client side rendering.

## Git and Github

- Avoid making large pull requests so that code review gets easier
- Add appropriate documentation with your changes

### [How to create a Pull Request](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

- On GitHub, navigate to the main page of the repository.
- In the "Branch" menu, choose the branch that contains your commits.
- Above the list of files, click  Pull request.
- Use the base branch dropdown menu to select the branch you'd like to merge your changes into, then use the compare branch drop-down menu to choose the topic branch you made your changes in.
- Type a title and description for your pull request.
- To create a pull request that is ready for review, click Create Pull Request. To create a draft pull request, use the drop-down and select Create Draft Pull Request, then click Draft Pull Request.
- When the pull request is ready for review add a reviewer.
- And then assign the pull request to yourself to follow up.


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
- You can also use commitizen cli to check your commit messages. [Commitizen](https://commitizen.github.io/cz-cli/)
Reference: [how to write good commits](https://www.conventionalcommits.org/en/v1.0.0/)

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
        |   ├── login.js
        |   └── signup.js
        | 
       	├── Dashboard
        |  	  ├── statistics.js
        |  	  ├── paymentlogs.js
        |  	  ├── orderlogs.js
        |  	  ├── restaurantprofile.js
        |  	  └── fooditems.js
        |
        ├── Template
        |  	  ├── chooseTemplate.js
        |  	  ├── templateone.js
        |  	  └── templatetwo.js
        |
        ├── Restaurant
        |  	  └── [restaurant].js (Dynamic Route)
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

Lowercase is preferred for folder and file names, one exception to this is Files which represent the React components, for which Capitalized is preferred. [Examples for Naming Coventions](https://github.com/vercel/next.js/tree/canary/examples) 

## Routing in Nextjs

You can refer this link to better understand routing in nextjs. [Routing](https://nextjs.org/docs/routing/introduction)

## Styles

- `components` will contain reusable UI component for eg. `Button`, `Input` etc.
- If a style is specific only to the component, and cannot be used anywhere else, use inline styling using styled-components.
- All CSS should be used with styled-components and bootstrap. 

## Testing

- Write unit tests using jest in the __test__ folder.
- Write integration test using cypress in cypress/integration folder. [How to write cypress tests](https://docs.cypress.io/guides/getting-started/writing-your-first-test#Add-a-test-file)
- Make sure you cover at least 50% of the test-case scenario.
- You can generate "test coverage" for modified files using the `npm run test:coverage` command.
- You can set threshold for test coverage inside jest configuration. [Jest Coverage Threshold](https://jestjs.io/docs/configuration#coveragethreshold-object)  



