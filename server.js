const express = require('express');
const { join }  = require('path');
const chalk = require('chalk');

const port = 8080;
const app = express();
const line = '\n----------------------------------------\n';

app.use('/', express.static(join(__dirname, '/')));

app.get('/', (req, res) => {
  console.log('hi');
  console.log(
    chalk.yellow(line),
    chalk.green(`request: ${req.path}\n`),
    chalk.gray(`${JSON.stringify(req.headers, null, 2)}`)
  );
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(port, () => {
  // process.stdout.write('\033c');
  console.log(
    chalk.gray(line),
    chalk.cyan(`  Now listening on port: ${port}`),
    chalk.gray(line)
  );
});
