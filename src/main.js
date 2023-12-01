import getAllInfo from './core/getAllInfo.js';
import inquirer from 'inquirer';
import processItemRecursively from './core/processItemRecursive.js';
import getDownloadUrl from './core/getDownloadUrl.js';
import fs from 'fs';

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
    } else if (task == 'Get download url') {
      const info = await getAllInfo(url);
      const allResults = [];
      const shortCode = url.trimEnd('/').split('/').pop();
      info?.list.forEach((item) => {
        const result = processItemRecursively(item);
        allResults.push(...result);
      });
      const getDownloadPromises = allResults.map(async (e) => {
        const res = await getDownloadUrl(
          info.shareid,
          info.uk,
          info.sign,
          info.timestamp,
          e.fs_id
        );
        if (res.ok == true) {
          const { downloadLink } = res;
          const object = {
            ...e,
            downloadLink,
          };
          return object;
        } else {
          console.log('\nFailed when get download url\n');
          throw res;
          return;
        }
      });
      const a = await Promise.all(getDownloadPromises);
      console.log(a);
    }
  } catch (error) {
    console.log(error);
  }
};
export default main;
