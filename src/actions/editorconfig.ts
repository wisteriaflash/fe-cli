import fs from 'fs';
import shelljs from 'shelljs';
import path from 'path';
import Mustache from 'mustache';
import chalk from "chalk";
import symbols from "log-symbols";
//
import { writeFile } from '../utils';
import { ROOT_PATH } from '../CONST';



const editorconfig = () => {
    const fileName = '.editorconfig';
    // check
    const filePath = path.resolve(ROOT_PATH, fileName);
    fs.open(filePath, 'wx', (err) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.log(symbols.error, chalk.red(`${fileName} 文件已经存在`));
              return;
            }
            throw err;
        }
        // write
        const mustacheTempPath = path.resolve(__dirname, '../templates/editorconfig.mustache');
        const mustacheTemp = fs.readFileSync(mustacheTempPath, {
            encoding: 'utf8',
        });
        const content = Mustache.render(mustacheTemp, {
            size: 4,
        })
        writeFile(fileName, content);
        console.log(symbols.success, chalk.green(`${fileName}文件写入成功`));
    });
};

export default editorconfig;
