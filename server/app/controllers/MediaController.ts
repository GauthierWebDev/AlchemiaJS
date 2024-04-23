import { middlewares } from '#/app/decorators';
import { Controller } from '#/core';

class TestController extends Controller {
  @middlewares('auth')
  public async image() {
    this.sendResponse({ message: 'Image' });
  }
}

export default TestController;
