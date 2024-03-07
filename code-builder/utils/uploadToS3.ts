import {publishLog} from "./publishLog";
import {logger} from "./logger";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import mime from "mime-types";
import {s3} from "../provider/s3";
import fs from "fs"

export async function uploadToS3(file: string, filePath: string, PROJECT_ID: string) {
    publishLog(`Uploading ${filePath}`, PROJECT_ID)
    logger.log({message: `Uploading ${filePath}`, level: 'info'})
    const command = new PutObjectCommand({
        Bucket: "percel",
        Key: `${PROJECT_ID}/${file}`,
        Body: fs.createReadStream(filePath),
        ContentType: mime.lookup(filePath) as string
    });

    return s3.send(command)
}
