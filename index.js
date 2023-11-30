import inquirer from 'inquirer';
import main from './src/main.js';

(async () => {
  try {
    const listTask = ['Get all info'];
    const question = await inquirer.prompt([
      {
        name: 'task',
        type: 'list',
        message: 'what do you want ?',
        choices: listTask,
      },
    ]);
    await main(question.task);
  } catch (error) {
    console.log(`error at index.js : ${error}`);
  }
})();
