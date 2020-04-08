#!/usr/bin/env node
import clear from 'clear';
import program from 'commander';
import minimist from 'minimist';
//
import { showTitileAndBanner } from './utils';
import { ConsoleMessage } from './module/console-message';
import { commit, editorconfig } from './actions';


//
// clear();
// showTitileAndBanner();

const init = () => {
    // title
    const args = minimist(process.argv.slice(2));
    const cmd: any = args._.shift();
    if ((!cmd || cmd === 'help') && !args.h && !args.help) {
        showTitileAndBanner();
    }

    // start
    program
    .version(`${ConsoleMessage.TITLE} ${require('../package').version}`)
    .usage('<command> [options]');


    // commit
    program
    .command('commit')
    .description("git提交信息配置")
    .alias("cm")
    .action(() => {
        commit();
    })

    // editorconfig
    program
    .command('editorconfig [size]')
    .description(".editorconfig 配置")
    .alias("editorc")
    .action((size:string) => {
        editorconfig(size);
    });

    // parse
    program.parse(process.argv);

    // help
    if (!program.args.length) {
        program.outputHelp();
      }
}

// init
init();
