// release-it-wrangler-plugin.js
import { exec } from 'node:child_process';
import util from 'node:util';
import { Plugin } from 'release-it';

const execPromise = util.promisify(exec);

class WranglerPublishPlugin extends Plugin {
  async beforeRelease() {
    this.log('Starting Wrangler publish process...');

    try {
      const { stderr, stdout } = await execPromise('wrangler publish');

      if (stdout) {
        this.log(stdout);
      }
      if (stderr) {
        this.log.warn(stderr);
      }

      this.log('Wrangler publish completed successfully.');
    } catch (error) {
      this.log.error('Wrangler publish failed.');
      throw error; // This will stop the release process if wrangler publish fails
    }
  }
}

export default WranglerPublishPlugin;