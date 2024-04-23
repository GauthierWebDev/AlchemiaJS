import { middlewares, route } from '#/app/decorators';
import { Controller } from '#/core';

class MediaController extends Controller {
  @middlewares('auth')
  @route({ method: 'get', path: '/image' })
  public async image() {
    this.sendResponse({ message: 'Image' });
  }
}

export default MediaController;
