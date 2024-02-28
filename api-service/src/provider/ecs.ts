import { ECSClient, RunTaskCommand } from '@aws-sdk/client-ecs';

export const ecsClient = new ECSClient({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
