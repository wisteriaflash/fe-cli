import fs from 'fs-extra';
import shelljs from 'shelljs';
import path from 'path';
import Mustache from 'mustache';
import chalk from "chalk";
import symbols from "log-symbols";
//
import { writeFile } from '../utils';
import { ROOT_PATH } from '../CONST';



const editorconfig = (size: string = '4') => {
    const fileName = '.editorconfig';
    // check
    const filePath = path.resolve(ROOT_PATH, fileName);
    fs.pathExists(filePath)
      .then((exists) => {
         if(exists){
            console.log(symbols.error, chalk.red(`${fileName} 文件已经存在`));
            return;
         }
         // write
         const mustacheTempPath = path.resolve(__dirname, '../templates/editorconfig.mustache');
         const mustacheTemp = fs.readFileSync(mustacheTempPath, {
               encoding: 'utf8',
         });
         const content = Mustache.render(mustacheTemp, {
               size,
         })
         writeFile(fileName, content);
         console.log(symbols.success, chalk.green(`${fileName}文件写入成功`));
      })
};

export default editorconfig;
