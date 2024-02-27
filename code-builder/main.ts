import {exec} from "child_process"
import path from "path"
import fs from "fs/promises"

function main() {
    const outputDir = path.join(__dirname, 'source-code')

    const p = exec(`cd ${outputDir} && npm i && npm run build`)

    p?.stdin?.on('data', function (data) {
        console.log(data.toString())
    })

    p.stdout?.on('error', function (data) {
        console.log('Error', data.toString())
    })

    p.on('close', async () => {
        console.log('Build Complete, uploading to S3')

        const distDirPath = path.join(outputDir, 'dist')
        const distDirContents = await fs.readdir(distDirPath)

        for(const file of distDirContents) {
            const filePath = path.join(distDirPath, file)
            const stats = await fs.lstat(filePath)

            if(stats.isDirectory()) continue;

            console.log('Uploading now')

            // TODO: upload to s3
            console.log(`Uploading ${filePath}`)

            console.log('uploaded')
        }

        console.log("Build successful")

    })
}

main()