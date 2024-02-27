import {exec} from "child_process"
import path from "path"
import fsp from "fs/promises"
import fs from "fs"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime-types"

const s3 =  new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "",
        secretAccessKey: ""
    }
})
const PROJECT_ID = process.env.PROJECT_ID

function main() {
    if(!PROJECT_ID) throw Error("PROJECT_ID not found")
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
        const distDirContents = await fsp.readdir(distDirPath)

        for(const file of distDirContents) {
            const filePath = path.join(distDirPath, file)
            const stats = await fsp.lstat(filePath)

            if(stats.isDirectory()) continue;

            console.log('Uploading now')

            // TODO: upload to s3
            console.log(`Uploading ${filePath}`)
            const command = new PutObjectCommand({
                Bucket: "percel",
                Key: `${PROJECT_ID}/${file}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath) as string
            });

            await s3.send(command)
            console.log('uploaded')
        }

        console.log("Build successful")

    })
}

main()