// release-it-wrangler-plugin.js
import { exec } from "node:child_process"
import util from "node:util"
import { Plugin } from "release-it"

const execPromise = util.promisify(exec)

class WranglerPublishPlugin extends Plugin {
  async beforeRelease() {
    console.log("Starting Wrangler publish process...")

    try {
      const { stderr, stdout } = await execPromise("wrangler publish")

      if (stdout) {
       // console.log(stdout)
        this.stdout = stdout
      }
      if (stderr) {
        console.warn(stderr)
      }

      console.log("Wrangler publish completed successfully.")
      this.isReleased = true
      
    } catch (error) {
      console.error("Wrangler publish failed.")
      throw error // This will stop the release process if wrangler publish fails
    }
  }
  getDeploymentID(stdout) {
    let lines = stdout.split("\n")
    let lineWeNeed = lines.find((line) => line.includes("Current Version ID:"))
    return lineWeNeed.split(":")[1].trim()
  }
  afterRelease() {
    let deploymentID = this.getDeploymentID(this.stdout)
    console.log(`Deployment ID: ${deploymentID}`)
    if (this.isReleased) {
      const name = this.getPackageName();
      const { version } = this.getContext();
      this.log.log(`🔗 https://registry.example.org/${name}/${version}`);
    }
    console.log(this.stdout)
  }
}

export default WranglerPublishPlugin
