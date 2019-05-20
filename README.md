# ATYWT

**BIG WIP**

_About Time You Wrote Tests_

Generates Test files from `/src`. Currently supports React, Jest, and React Testing Library. This is really a one off scaffolder since you should have wrote tests at the beginning of the project but you are here now and everything is okay (Even I made this mistake with this project).

### Install as a package dependency?

Unless you plan on nuking your tests, I doubt it. Just install it globally

**Repository Consistency is key for this to work**
Example folder structure (For now)

```
folder/
  - index.ts // IMPORTANT
  - fileToBeTested.tsx
```

Inside `index.tsx`

```
export * from './fileName'
```

The scaffolder will look inside the index.ts and will scan the file it exports for properties to plug in

### Road Map

- [x] Create functionality to read file and return properties
- [x] Create functionality to recursively read directories and return files to be tested
- [x] Create functionality to write file
- [ ] Create ability to write props into tests
- [ ] Write Tests because this is a testing scaffolding tool
- [ ] Create a config reader
- [ ] Implement a debug flag
- [ ] Write support code for non baralled repos
- [ ] Write code for non tsx support
- [ ] Write code for Vue Support
- [ ] Create the ability to overwrite existing test files
- [ ] Fix linting and pretty-fy
