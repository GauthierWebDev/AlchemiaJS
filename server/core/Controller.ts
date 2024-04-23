import type { FastifyRequest, FastifyReply } from 'fastify';
import type { PrismaInstance } from '#/services/Prisma';
import type { AlchemiaHttpMethod } from '$/types';

import { Logger } from '#/utils';
// import { Cookie, Logger, Prisma, Tokens, JWT } from '#/utils';
// import { findControllerMethodByPath } from '#/functions';
import { errors } from '$/config';

class Controller {
  protected start: BigInt;
  protected end: BigInt | null = null;
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

    this.log('out');
  }

  protected removePrivateFields(data: { [key: string | number]: any }): {
    [key: string | number]: any;
  } {
    const newData = { ...data };

    for (const field of this.privateFields) {
      delete newData[field];
    }

    return newData;
  }

  protected log(direction: 'in' | 'out' = 'in'): void {
    this.end = process.hrtime.bigint();
    const arrow = direction === 'in' ? '⬅️' : '➡️';

    const controllerMethod = findControllerMethodByPath(
      this.constructor.name,
      this.request.method as AlchemiaHttpMethod,
      this.request.raw.url,
    );

    let message = `${arrow} `;
    message += ` [${this.request.method}] `;
    if (this.constructor.name && controllerMethod) {
      message += `| ${this.constructor.name}.${controllerMethod} `;
    }
    message += `| ${this.request.raw.url}`;

    if (direction === 'out') {
      const duration = (Number(this.end) - Number(this.start)) / 1e6;

      if (this.statusCode >= 400) {
        message += ` | ${Logger.chalk.red.bold(this.statusCode)}`;
      } else if (this.statusCode >= 300) {
        message += ` | ${Logger.chalk.yellow.bold(this.statusCode)}`;
      } else {
        message += ` | ${Logger.chalk.green.bold(this.statusCode)}`;
      }

      message += ` | ${Logger.chalk.blue.bold(`${duration.toFixed(2)}ms`)}`;
    }

    Logger.setTitle('', 'info').addMessage(message).send();
  }

  public async updateTokens(userId?: string) {
    const { user, managedArtists } = await Tokens.buildTokens(this.prisma, userId);

    if (user) {
      this.request.session.set('user', user.user);
      Cookie.set(this.reply, 'user', JWT.sign(user));
      Cookie.set(this.reply, 'token', JWT.sign(user));
    } else {
      this.request.session.set('user', null);
      Cookie.delete(this.reply, 'user');
      Cookie.delete(this.reply, 'token');
    }

    if (managedArtists) {
      Cookie.set(this.reply, 'artists', JSON.stringify(managedArtists));
    } else Cookie.delete(this.reply, 'artists');

    return this;
  }

  public async sendUnauthorized() {
    this.setCode(401).sendResponse({ error: errors.PERMISSION.UNAUTHORIZED });
  }

  public async sendForbidden() {
    this.setCode(403).sendResponse({ error: errors.PERMISSION.UNAUTHORIZED });
  }

  protected sendInternalError(error: Error): void {
    Logger.setTitle('🔥 ERROR', 'error').addMessage(error?.message).send();
    this.setCode(500).sendResponse({ error: errors.GENERIC.INTERNAL });
  }
}

export default Controller;
