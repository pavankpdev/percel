import {exec} from "child_process"
import path from "path"
import fsp from "fs/promises"
import fs from "fs"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime-types"

const s3 =  new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "AKIAZV3G4GUJGISC4SDJ",
        secretAccessKey: "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"
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

            // TODO: upload directories inside `dist`
            if(stats.isDirectory()) {
                continue;
            };

            console.log('Uploading now')

            await uploadToS3(file, filePath)
        }

        console.log("Build successful")

    })
}

async function uploadToS3(file: string, filePath: string) {
    console.log(`Uploading ${filePath}`)

    const command = new PutObjectCommand({
        Bucket: "percel",
        Key: `${PROJECT_ID}/${file}`,
        Body: fs.createReadStream(filePath),
        ContentType: mime.lookup(filePath) as string
    });

    return s3.send(command)
}

main()

