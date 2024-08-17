import chalk from 'chalk';

export class Logger {
    public log(message: string): void {
        console.log(chalk.green(message));
    }

    public error(message: string): void {
        console.log(chalk.red(message));
    }

    public warning(message: string): void {
        console.log(chalk.yellow(message));
    }

    public info(message: string): void {
        const purple = chalk.hex('#8A2BE2');
        console.log(purple(message));
    }
}