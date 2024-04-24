import { route } from '#/app/decorators';
import { Controller } from '#/core';

class MediaController extends Controller {
  @route({ method: 'get', path: '/image', middlewares: ['auth'] })
  public async image() {
    this.sendResponse({ message: 'Image' });
  }
}

export default MediaController;
