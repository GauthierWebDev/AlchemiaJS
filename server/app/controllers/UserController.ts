import { route } from '#/app/decorators';
import { Controller } from '#/core';

class UserController extends Controller {
  @route({ method: 'get', path: '/users' })
  public async index() {
    const users = await this.prisma.user.findMany();

    return this.sendResponse({ users });
  }

  @route({ method: 'get', path: '/users/:userId' })
  public async find() {
    const { userId } = this.request.params as { userId: string };
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) return this.sendNotFound();
    return this.sendResponse({ user });
  }
}

export default UserController;
