#!/usr/bin/env node
import clear from 'clear';
import program from 'commander';
//
import { showTitileAndBanner } from './utils';
import { ConsoleMessage } from './module/console-message';
import { commit } from './actions';


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




// parse
program.parse(process.argv);
// help
if (!program.args.length) {
    program.outputHelp();
}
