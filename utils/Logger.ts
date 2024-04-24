import type { LoggerType } from '$/types';

import { settings } from '$/config';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

/**
 * The Logger class provides a utility for logging messages with different log levels.
 */
class Logger {
  private static type: LoggerType = 'info';
  private static messages: string[] = [];
  private static title = '';
  public static chalk = chalk;

  /**
   * Returns the current timestamp in the format "HH:MM:SS".
   * @returns {string} The current timestamp.
   */
  private static getTimestamp(): string {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  /**
   * Returns the path for the log file based on the given date.
   * @param date - The date for which the log file path is generated.
   * @returns The path for the log file.
   */
  private static getLogPath(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return path.join(process.cwd(), 'logs', `${year}-${month}-${day}.log`);
  }

  /**
   * Appends a log entry to the log file.
   */
  private static appendLog(): void {
    const logPath = this.getLogPath(new Date());
    const logDir = path.dirname(logPath);

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logType = this.type.toUpperCase();

    fs.appendFileSync(logPath, `\n[${this.getTimestamp()}] [${logType}] ${this.raw()}`);
  }

  /**
   * Returns the Chalk color for the specified LoggerType.
   * @param type - The type of logger.
   * @param isBackground - Optional parameter to specify if the color should be used as a background color.
   * @returns The Chalk color for the specified LoggerType.
   */
  public static getColor(type: LoggerType, isBackground = false): typeof chalk {
    switch (type) {
      case 'info':
        return isBackground ? this.chalk.bgBlue : this.chalk.blue;
      case 'success':
        return isBackground ? this.chalk.bgGreen : this.chalk.green;
      case 'warning':
      case 'debug':
        return isBackground ? this.chalk.bgYellow : this.chalk.yellow;
      case 'error':
        return isBackground ? this.chalk.bgRed : this.chalk.red;
      default:
        return this.chalk;
    }
  }

  /**
   * Sets the title of the logger.
   * @param title - The title to set.
   * @param type - The type of the logger (default: "info").
   * @returns The updated Logger instance.
   */
  public static setTitle(title: string, type: LoggerType = 'info'): typeof Logger {
    this.type = type;
    this.title = this.getColor(type, true).bold(title);
    return this;
  }

  /**
   * Adds a message to the logger.
   * @param parts - The parts of the message to be joined together.
   * @returns The Logger instance.
   */
  public static addMessage(...parts: string[]): typeof Logger {
    this.messages.push(parts.join(''));
    return this;
  }

  /**
   * Logs a debug message.
   * @param parts - The parts of the debug message.
   */
  public static debug(...parts: string[]): void {
    if (settings.LOG_LEVEL !== 'debug') return;
    this.setTitle('🐛 DEBUG', 'debug')
      .addMessage(...parts)
      .send();
  }

  /**
   * Sends the logged messages to the console and appends them to the log file.
   * If there are no messages to send, the method returns early.
   */
  public static send(): void {
    if (!this.messages.length) return;

    if (this.title) console.log(this.title);
    this.messages.forEach((message) => console.log(message));

    this.appendLog();

    this.messages = [];
    this.title = '';
  }

  /**
   * Returns the raw log messages as a single string, without any ANSI escape codes.
   * @returns The raw log messages.
   */
  public static raw() {
    // eslint-disable-next-line no-control-regex
    return this.messages.join(' ').replace(/\u001b\[\d+m/g, '');
  }
}

export default Logger;
