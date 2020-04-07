import fs from "fs";
import path from "path";
import chalk from "chalk";
import symbols from "log-symbols";
import shelljs from "shelljs";
import ora from 'ora';

const packageFilename = "package.json";
const packagePath = path.resolve(process.cwd(), packageFilename);

/**
 * 获取Package.json信息
 *
 */
export const getPackageInfo = () => {
    try {
        let packageInfo = fs.readFileSync(packagePath, {
            encoding: "utf-8",
        });
        packageInfo = JSON.parse(packageInfo);
        return packageInfo;
    } catch (error) {
        console.log(symbols.error, chalk.red(`${packageFilename}文件不存在`));
        shelljs.exit();
    }
};

/**
 * 设置Package.json信息
 *
 */
export const setPackageInfo = (packageInfo: object) => {
    try {
        fs.writeFileSync(packagePath, JSON.stringify(packageInfo, null, 2));
    } catch (error) {
        console.log(symbols.error, chalk.red(`${packageFilename}文件写入出错`));
        shelljs.exit();
    }
};


/**
 * 运行命令
 *
 * @param {config.cmdStr} 命令字符串
 * @param {config.message} 提示信息
 * @param {config.loadingMessage} 加载信息
 *
 */
export const runCommand = ({
    cmdStr='',
    message='运行',
    loadingMessage='正在加载'
  }) =>{
    const spinner = ora(`${loadingMessage}...\n`);
    spinner.start();
    try {
      shelljs.exec(cmdStr);
      spinner.succeed();
      console.log(symbols.success, `${message}成功`);
    } catch (error) {
      spinner.fail();
      console.log(symbols.error, `${message}失败`);
    }
  }
