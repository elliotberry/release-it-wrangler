// release-it-wrangler-plugin.js
import { exec } from "node:child_process"
import util from "node:util"
import { Plugin } from "release-it"

const execPromise = util.promisify(exec)

class WranglerPublishPlugin extends Plugin {
  async beforeRelease() {
    console.log("Starting Wrangler publish process...")

    try {
      const { stderr, stdout } = await execPromise("wrangler deploy")

      if (stdout) {
        this.stdout = stdout
      }
      if (stderr) {
        console.warn(stderr)
      }

      console.log("Wrangler deploy completed successfully.")
      this.isReleased = true
      
    } catch (error) {
      console.error("Wrangler publish failed.")
      throw error // This will stop the release process if wrangler publish fails
    }
  }

  getDeploymentID(stdout) {
    let lines = stdout.split("\n")
    let lineWeNeed = lines.find((line) => line.includes("Current Version ID:"))
    return lineWeNeed ? lineWeNeed.split(":")[1].trim() : null
  }

  async afterRelease() {
    const deploymentID = this.getDeploymentID(this.stdout)
    console.log(`Deployment ID: ${deploymentID}`)
    
    if (this.isReleased && deploymentID) {
      try {
        // Tag the release with the deployment ID in Git
        await execPromise(`git tag -a ${deploymentID} -m "Wrangler Deployment, ID ${deploymentID}"`)
        await execPromise("git push origin --tags")
        console.log(`Successfully tagged release with Wrangler Deployment ID: ${deploymentID}`)
      } catch (error) {
        console.error("Failed to tag release in Git.", error)
      }
    }
  }
}

export default WranglerPublishPlugin