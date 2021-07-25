# Contribution guidelines

Here you will find all the necessary information regarding how to create file, write and structure code for this project. Developers are always welcome to contribute to these guidelines with clear examples.

## General guidelines
- Avoid hard-coding values instead create constant variables
- Use absolute paths for `import` statements
- Avoid using negative conditions
- Avoid using nested ternary, instead use `if`-`else` blocks
- Leave wide spaces in codes

## Next.js 
- Wherever possible create Static Side Generated Pages for better performance. [Static Generation (Recommended)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)
- Avoid using client side rendering, instead use server side rendering. [Server Side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering)
- When the initial loading needs to be fast and there is more static content, prefer using server side rendering.
- When the page has large and dynamic data and the focus is a rich page with a large number of users, prefer client side rendering.

## Git and Github

- Avoid making large pull requests so that code review gets easier
- Add appropriate documentation with your changes
- Follow [How to create a Pull Request](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) to create a new *draft* PR. Don't forget to assign the PR to yourself.
- Once the PR is ready for review convert it to a normal PR from draft PR and add the reviewer. 

## Commit messages

- Our commit messages follow the [conventional commits spec](https://www.conventionalcommits.org/en/v1.0.0/).
- You can also use [commitizen cli](https://commitizen.github.io/cz-cli/) to create / check your commit messages.

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

- Lowercase is preferred for folder and file names.
- One exception is, files which represent React components, for which PascalCace is preferred. Here are [some examples](https://github.com/vercel/next.js/tree/canary/examples).

## Routing

Please refer to the [Next.js routing documentation](https://nextjs.org/docs/routing/introduction)

## Styles

- The `components` folder will contain reusable UI component for eg. `Button`, `Input` etc.
- If a style is specific only to the component, and cannot be used anywhere else, use styled-components to style the same.
- All CSS should be used with styled-components. 

## Testing

- Write unit tests using jest in the __test__ folder.
- Write integration test using cypress in cypress/integration folder. If you're unfamiliar with cypress, the "[writing your first test](https://docs.cypress.io/guides/getting-started/writing-your-first-test#Add-a-test-file)" guide is a good place to start.
- The project imposes a minimum coverage of 50%.
- You can generate "test coverage" for modified files using the `npm run test:coverage` command.
- You can check if your test coverage meets the required test coverage by `npm run coverage:report` command.  


