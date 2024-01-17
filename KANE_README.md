
# What was worked on during this task

I have attempted the backend section of this technical challenge. I am primarily a backend developer. I know basic web development using pure javascript,html,css, but I do not currently know React or other frameworks. It is something that I am interested in learning in the future, but I am more interested in the backend.

Therefore I have completed the core backend exercise, the peak demand section, and unit tests.

# Notes

1) I had to run `yarn upgrade --latest` to get the project to build as some of the react elements weren't playing nicely with the server elements.

2) I have left a lot of comments throughout the code explaining my thought process, and areas for improvement.

# Space Time Complexity Analysis

I explored the idea of improving space time complexity of the application when reading the CSV file in by comparing two options:

1) Read the file into memory via fs.readFile, then parse it with a CSV parser, then process the results once fully completed. This method would store the data into memory, so it could cause problems if the CSV file was huge. However, at the current data size, it's fine, and the execution times were:

```bash
loadUsage: 94.185ms
loadUsage: 72.014ms
loadUsage: 73.228ms
loadUsage: 65.321ms
loadUsage: 59.92ms
```

1) Use fs.createReadStream to stream the data in line by line, and use csv-parser to parse each line, and do all calculations on a given line. This is easier on memory, but could theoretically take longer to process as files get bigger. Execution times were:

```bash
loadUsage: 89.412ms
loadUsage: 70.955ms
loadUsage: 61.108ms
loadUsage: 57.88ms
loadUsage: 69.399ms
loadUsage: 63.864ms
```

I have decided to keep option 1 for this technical challenge as I have already implemented it.

# Unit Tests

I have used Jest to complete unit testing. They can be found in `./server/test/`.

Coverage has been implemented and can be found using `yarn test:server-coverage`. The results will print in the terminal window, or you can find them in `./server/coverage/`.

Alternatively, the results are:

```bash
--------------|---------|----------|---------|---------|-------------------
File          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------|---------|----------|---------|---------|-------------------
All files     |   92.15 |       80 |   84.61 |   94.73 |                   
 app.ts       |   69.23 |        0 |   33.33 |      75 | 25,33-36          
 loadUsage.ts |    95.5 |    84.21 |     100 |   97.59 | 303-304           
--------------|---------|----------|---------|---------|-------------------
```

I did not reach 100% coverage here as I ran out of the time I allocated for this technical test.

# How to run

## Install deps

```bash
yarn install
```

## Server

```bash
yarn start:server
```

## Tests

```bash
yarn start:tests
```

# Final Thoughts

Thanks for your time, this was a fun technical test. I learnt a lot about TypeScript, Yarn, and Jest throughout my experience.
