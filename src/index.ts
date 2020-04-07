#!/usr/bin/env node
import chalk from 'chalk';
import figlet from 'figlet';
import clear from 'clear';
import commander from 'commander';

//
clear();
console.log(
    chalk.red(
        figlet.textSync('fe-cli', { horizontalLayout: 'full' })
    )
)

commander
    .version('0.0.1')
    .description('An fe cli for improve development efficiency')
    .option('-l, --list', 'List')
    .parse(process.argv)

if (!commander.args.length) {
    commander.help();
}
