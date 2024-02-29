import {redis} from "../provider/redis";

export const publishLog = (log: string, projectId: string) => {
    redis.publish(`logs:${projectId}`, JSON.stringify({ log }))
}