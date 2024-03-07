import fs from "fs"
import path from "path"
import {FRAMEWORKS} from "../types"

export async function detectFramework(outputDir: string): Promise<FRAMEWORKS> {
    // Mapping of frameworks to their potential config files
    const frameworkConfigFiles: { [key in FRAMEWORKS]: string[] } = {
        nextjs: ['next.config.js', 'next.config.mjs', 'next.config.ts'],
        vite: ['vite.config.js', 'vite.config.ts'],
        astro: ['astro.config.mjs', 'astro.config.js'],
    };

    for (const [framework, configFiles] of Object.entries(frameworkConfigFiles)) {
        if (configFiles.some(file => fs.existsSync(path.join(outputDir, file)))) {
            return framework as FRAMEWORKS;
        }
    }

    throw new Error("Framework could not be detected");
}