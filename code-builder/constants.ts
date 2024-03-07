import {FRAMEWORKS} from "./types";

export const buildOutputDir: Record<FRAMEWORKS, string> = {
    nextjs: '.next',
    vite: 'dist',
    astro: 'dist',
};