import fs from "fs";
import path from "path";
import { cyan, red } from "chalk";
import symbols from "log-symbols";
import shelljs from "shelljs";
import ora from "ora";
import figlet from "figlet";
//
import { ConsoleMessage } from "./module/console-message";
import { ROOT_PATH } from './CONST';

const packageFilename = "package.json";
const packagePath = path.resolve(process.cwd(), packageFilename);

/**
 * 写入文件
 * @param content
 * @param filePath 文件路径
 */
export const writeFile = (fileName: string, content:string, filePath: string = ROOT_PATH) => {
    const resolvePath = path.resolve(filePath, fileName);
    try {
        fs.writeFileSync(resolvePath, content);
    } catch (error) {
        console.log(symbols.error, red(`${fileName}文件写入出错`));
        shelljs.exit();
    }
}

/**
 * 获取Package.json信息
 *
 */
export const getPackageInfo = () => {
    try {
        const packageInfo = fs.readFileSync(packagePath, {
            encoding: "utf-8",
        });
        // packageInfo = JSON.parse(packageInfo);
        return JSON.parse(packageInfo);
    } catch (error) {
        console.log(symbols.error, red(`${packageFilename}文件不存在`));
        shelljs.exit();
    }
};

/**
 * 设置Package.json信息
 *
 */
export const setPackageInfo = (packageInfo: object) => {
    const content = JSON.stringify(packageInfo, null, 4);
    writeFile(packageFilename, content);
    // try {
    //     fs.writeFileSync(packagePath, JSON.stringify(packageInfo, null, 4));
    // } catch (error) {
    //     console.log(symbols.error, red(`${packageFilename}文件写入出错`));
    //     shelljs.exit();
    // }
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
    cmdStr = "",
    message = "运行",
    loadingMessage = "正在加载",
}) => {
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
};

/**
 * 显示标题
 */
export const showTitileAndBanner = () => {
    console.log(
        cyan(
            figlet.textSync(ConsoleMessage.TITLE, { horizontalLayout: "full" })
        )
    );
    console.info(cyan(ConsoleMessage.BANNER));
};
