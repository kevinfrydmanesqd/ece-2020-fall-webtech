# Common errors

Here is a list of common errors:

1. Poorly organized README.md   

  - Use markdown syntax (inline code, code blocks, headers etc.) - https://guides.github.com/features/mastering-markdown/
  - Write a good README with - https://dev.to/scottydocs/how-to-write-a-kickass-readme-5af9

2. Bad naming (files, functions, variables)

  - Use camelCase, kebab-case etc.
  - Chose right names. Read naming convention - https://en.wikipedia.org/wiki/Naming_convention_(programming)
  
3. Dirty package.json

  - Fill the package.json with the required info
  - Use `scripts` object to define scripts which run your app.
  - Clean unnecessary dependencies
  - Read package.json documentation - https://docs.npmjs.com/files/package.json

4. Clean up your GitHub repository

  - Use .gitignore (exclude node_modules, .DS_Store, etc.)
  - Remove all unused files (bootstrap-reboot.css, …)

# Administrative issues

1. Put all the projects into one GitHub repository

The structure could be like:

```markdown
- lab-1-hello
  - src
  - README.md
  - package.json
  - ...
- lab-2-express
  - src
  - README.md
  - package.json
  - ...
- lab-2-typescript
  - src
  - README.md
  - package.json
  - ...
- ...
README.md
.gitignore
```

2. Emails to sergei@adaltas.com

  - Email subject format: “ECE, NodeJS, Lab X, Gr X, LASTNAME Firstname, LASTNAME Firstname, …”
  - Email body:
    - a link to repository
    - list of contributors

3. Make sure your repository is public or send me an invitation. My GitHub page - https://github.com/sergkudinov
