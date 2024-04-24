import type { FastifyRequest, FastifyReply } from 'fastify';
import type { PrismaInstance } from '#/services/Prisma';

import * as controllers from '#/app/controllers';

import { Prisma } from '#/services';
import { Metadata } from '#/core';
import { errors } from '$/config';
import { Logger } from '$/utils';

class Controller {
  protected start: bigint;
  protected end: bigint | null = null;
  protected request: FastifyRequest;
  protected reply: FastifyReply;
  protected statusCode: number = 200;
  protected prisma: PrismaInstance = Prisma;
  protected responseParams: { [key: string]: unknown } = {};
  protected readonly privateFields: string[] = [];

  constructor(request: FastifyRequest, reply: FastifyReply) {
    this.start = process.hrtime.bigint();
    this.request = request;
    this.reply = reply;
  }

  protected addParam(key: string, value: unknown) {
    this.responseParams[key] = value;
    return this;
  }

  protected removeParam(key: string) {
    delete this.responseParams[key];
    return this;
  }

  protected setCode(code: number) {
    this.statusCode = code;
    return this;
  }

  protected sendNotFound() {
    this.setCode(404).sendResponse({
      error: errors.GENERIC.NOT_FOUND,
    });
  }

  protected sendResponse(data: object = {}): void {
    this.reply.status(this.statusCode).send({
      ...this.responseParams,
      ...data,
    });

    this.log();
  }

  protected log(): void {
    this.end = process.hrtime.bigint();
    const arrow = '✦';

    const controllerMethods = Metadata.getInstance().getControllerRoutes(
      this.constructor as (typeof controllers)[keyof typeof controllers],
    )!;

    const controllerMethod = controllerMethods.controllerMethods.find((method) => {
      return method.path === this.request.raw.url && method.httpMethod?.toUpperCase() === this.request.method;
    });

    let message = `${arrow} [${Logger.chalk.white.bold(this.request.method)}] `;
    if (this.constructor.name && controllerMethod) {
      message += `| ${this.constructor.name}.${controllerMethod.name} `;
    }
    message += `| ${this.request.raw.url}`;

    const duration = (Number(this.end) - Number(this.start)) / 1e6;

    if (this.statusCode >= 400) {
      message += ` | ${Logger.chalk.red.bold(this.statusCode)}`;
    } else if (this.statusCode >= 300) {
      message += ` | ${Logger.chalk.yellow.bold(this.statusCode)}`;
    } else {
      message += ` | ${Logger.chalk.green.bold(this.statusCode)}`;
    }

    message += ` | ${Logger.chalk.blue.bold(`${duration.toFixed(2)}ms`)}`;

    Logger.setTitle('', 'info').addMessage(message).send();
  }

  public async sendUnauthorized() {
    this.setCode(401).sendResponse({ error: errors.GENERIC.UNAUTHORIZED });
  }

  public async sendForbidden() {
    this.setCode(403).sendResponse({ error: errors.GENERIC.FORBIDDEN });
  }

  protected sendInternalError(error: Error): void {
    Logger.setTitle('🔥 ERROR', 'error').addMessage(error?.message).send();
    this.setCode(500).sendResponse({ error: errors.GENERIC.INTERNAL });
  }
}

export default Controller;
