import { method, route } from '@/decorators';
import { Controller } from '@/core';

class MediaController extends Controller {
  @method('get')
  @route('/images/:filePath')
  public async image() {
    this.sendResponse({ message: 'Image' });
  }
}

export default MediaController;
