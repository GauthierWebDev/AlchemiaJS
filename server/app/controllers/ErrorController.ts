import { Controller } from '#/core';
import { errors } from '$/config';

class ErrorController extends Controller {
  public async notFound() {
    this.sendNotFound();
  }

  public async unauthorized() {
    this.sendUnauthorized();
  }

  public async invalidToken() {
    this.reply.code(401).send({ error: errors.AUTH.INVALID_TOKEN });
  }
}

export default ErrorController;
