import debug from "debug";
import chalk from "chalk";
import inquirer from "inquirer";
import { runCommand, setPackageInfo, getPackageInfo } from '../utils';


// debug init
const debugFun = debug("commit");

/*
 * 交互问题
 */
// 问题 - 覆盖执行确认
const overrideQuestions:inquirer.QuestionCollection = [
    {
        type: "confirm",
        name: "isForceCommitConfig",
        message: "是否覆盖配置：",
    }
]
// 问题 - commitizen
const commitizenQuestions:inquirer.QuestionCollection = [
    {
        type: "list",
        name: "packageManager",
        message: "包管理器：",
        choices: ['npm', 'yarn'],
    }
]


/**
 * commitizen 配置
 * @param {boolean} isForce 是否强制执行
 */
const configCommitizen = async (isForce = false, packageInfo:Partial<FE.pkgInfo> = {}) => {
    const { packageManager } = await inquirer.prompt(commitizenQuestions);
    debugFun("包管理器", packageManager);
    // clean
    if (isForce) {
        runCommand({
            cmdStr:
                "rm -rf node_modules/commitizen node_modules/cz-conventional-changelog",
            message: "整理文件",
            loadingMessage: "正在整理文件",
        });
        if(packageInfo.config){
            Reflect.deleteProperty(packageInfo.config, "commitizen");
        }
        setPackageInfo(packageInfo);
    }
    // commitizen
    let cmdStr = "npm install -g commitizen && commitizen init cz-conventional-changelog --save --save-exact";
    if (packageManager === "yarn") {
        cmdStr = "commitizen init cz-conventional-changelog --yarn --dev --exact";
    }
    runCommand({
        cmdStr,
        message: "安装",
        loadingMessage: "正在安装",
    });
};

const commit = async function() {
    const packageInfo = getPackageInfo();
    if(Reflect.has(packageInfo, 'config') && Reflect.has(packageInfo.config, 'commitizen')){
      console.log(chalk.red('提交信息，已经配置过了'));
      const { isForceCommitConfig } = await inquirer.prompt(overrideQuestions);
      if(isForceCommitConfig){
        configCommitizen(isForceCommitConfig, packageInfo);
      }
    }else{
      configCommitizen();
    }
  }

export default commit;
