import getAllInfo from './core/getAllInfo.js';
import inquirer from 'inquirer';

const main = async (task) => {
  try {
    const question = await inquirer.prompt([
      {
        name: 'url',
        type: 'input',
        message: 'Insert your url',
      },
      {
        name: 'hasPass',
        type: 'confirm',
        message: 'If url has password ?',
      },
    ]);
    const { hasPass, url } = question;

    if (task == 'Get all info') {
      if (hasPass == false) {
        const data = await getAllInfo(url);
        console.log(data);
      }
    }
  } catch (error) {
    console.log(`error at main.js : ${error}`);
  }
};
export default main;
