// release-it-wrangler-plugin.js
import { exec } from 'node:child_process';
import util from 'node:util';
import { Plugin } from 'release-it';

const execPromise = util.promisify(exec);

class WranglerPublishPlugin extends Plugin {
  async beforeRelease() {
    console.log('Starting Wrangler publish process...');

    try {
      const { stderr, stdout } = await execPromise('wrangler publish');

      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.warn(stderr);
      }

      console.log('Wrangler publish completed successfully.');
    } catch (error) {
        console.error('Wrangler publish failed.');
      throw error; // This will stop the release process if wrangler publish fails
    }
  }
}

export default WranglerPublishPlugin;