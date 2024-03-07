import {exec} from "child_process"
import path from "path"
import fsp from "fs/promises"
import {publishLog} from "./utils/publishLog";
import {logger} from "./utils/logger";
import {detectFramework} from "./utils/detectFramework";
import {uploadToS3} from "./utils/uploadToS3";
import {buildOutputDir} from "./constants";
import {FRAMEWORKS} from "./types";

const PROJECT_ID = process.env.PROJECT_ID as string

async function main() {
    if(!PROJECT_ID) throw Error("PROJECT_ID not found")
    const outputDir = path.join(__dirname, 'source-code')

    const p = exec(`cd ${outputDir} && npm i && npm run build`)
    const framework = await detectFramework(outputDir);


    p?.stdin?.on('data', function (data) {
        publishLog(data.toString(), PROJECT_ID)
        logger.log({message: data.toString(), level: 'info'})

    })

    p.stdout?.on('error', function (data) {
        publishLog(data.toString(), PROJECT_ID)
        logger.log({message: data.toString(), level: 'info'})

    })

    p.on('close', async () => {
        publishLog('Build Complete, uploading to S3', PROJECT_ID)
        logger.log({message: 'Build Complete, uploading to S3', level: 'info'})

        const distDirPath = path.join(outputDir, buildOutputDir[framework])
        await recursivelyParseFiles(distDirPath, framework)

        publishLog('Build successful', PROJECT_ID)
        logger.log({message: 'Build successful', level: 'info'})
        process.exit(0)
    })
}

async function recursivelyParseFiles(dirPath: string, framework: FRAMEWORKS) {
    const distContents = await fsp.readdir(dirPath, { withFileTypes: true });
    for (const distContent of distContents) {
        const filePath = path.join(dirPath, distContent.name)
        const stats = await fsp.lstat(filePath)

        // Remove '/home/app/source-code/dist' so that the files are uploaded with their respective parent directory names
        // Example: /_astro/index.css
        const dirname = dirPath.replace(
            dirPath.includes(`/home/app/source-code/${buildOutputDir[framework]}/`)
            ? `/home/app/source-code/${buildOutputDir[framework]}/`
            : `/home/app/source-code/${buildOutputDir[framework]}`
            , ""
        )

        if(stats.isDirectory()) {
            await recursivelyParseFiles(filePath, framework);
        } else {
            await uploadToS3(dirname ? `${dirname}/${distContent.name}` : distContent.name, filePath, PROJECT_ID)
        }
    }
}

main()

