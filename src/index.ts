#!/usr/bin/env node
import clear from 'clear';
import program from 'commander';
//
import { showTitileAndBanner } from './utils';
import { ConsoleMessage } from './module/console-message';
import { commit, editorconfig } from './actions';


//
clear();
showTitileAndBanner();

// start
program
    .version(`${ConsoleMessage.TITLE} ${require('../package').version}`)
    .usage('<command [options]');


// commit
program
    .command('commit')
    .description("git提交信息配置")
    .alias("cm")
    .action(() => {
        commit();
    });

// editorconfig
program
    .command('editorconfig')
    .description(".editorconfig 配置")
    .alias("editorc")
    .action(() => {
        editorconfig();
    });



// parse
program.parse(process.argv);
// help
if (!program.args.length) {
    program.outputHelp();
}
