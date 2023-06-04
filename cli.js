const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os');

const questions = [
  {
    type: 'list',
    name: 'os',
    message: chalk.green('Welches Betriebsystem benutzt du?'),
    choices: [os.platform()],
  },
  {
    type: 'message',
    name: 'windowsVersion',
    message: chalk.magenta('Gute Entscheidung! Windows ftw'),
    when: answers => answers.os === 'win32',
  },// BEFEHL WINDOWS
  {
    type: 'message',
    name: 'MacVersion',
    message: chalk.magenta('WIESO NUR?!!! Da hat jemand eindeutig zu viel Geld.'),
    when: answers => answers.os === 'darwin',
  },// BEFEHL MAC
  {
    type: 'message',
    name: 'LinuxVersion',
    message: chalk.magenta('Besser als MAc aufjedenfall :D'),
    when: answers => answers.os === 'linux',
  },// BEFEHL Linux
  {
    type: 'input',
    name: 'name',
    message: chalk.green("Wie ist dein Name?"),
  },
  {
    type: 'list',
    name: 'Pizzabelag',
    message: chalk.green('Was ist dein Lieblings Pizza belag?'),
    choices: ['Salami', 'Schinken', 'Pilze', 'Ananas'],
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: chalk.red('Are you sure?'),
  },
]; //question Ende




inquirer.prompt(questions).then(answers => {
  const data = `Name: ${answers.name}\nPizzabelag: ${answers.color}\nConfirmation: ${answers.confirm ? 'Yes' : 'No'}\nDein OS: ${answers.os}`;

  fs.writeFile('user_data.txt', data, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(chalk.yellow('User data has been saved successfully!'));
  });
});
