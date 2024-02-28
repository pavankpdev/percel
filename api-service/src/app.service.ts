import { Injectable } from '@nestjs/common';
import { RunTaskCommand } from '@aws-sdk/client-ecs';
import { generateSlug } from 'random-word-slugs';
import { ecsClient } from './provider/ecs';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async createDeployment({ gitUrl }: { gitUrl: string }) {
    // TODO: add validation

    const projectSlug = generateSlug();
    const command = new RunTaskCommand({
      cluster: process.env.ECS_CLUSTER_ARN,
      count: 1,
      launchType: 'FARGATE',
      taskDefinition: process.env.ECS_TASK_DEFINITION_ARN,
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets: [
            'subnet-0e6c611f1da188308',
            'subnet-0d2df0273f2afc183',
            'subnet-053d53fe444bada9e',
          ],
          securityGroups: ['sg-081c1ce7674d49d86'],
          assignPublicIp: 'ENABLED',
        },
      },
      overrides: {
        containerOverrides: [
          {
            name: process.env.ECS_CONTAINER_NAME,
            environment: [
              { name: 'GET_REPO', value: gitUrl },
              { name: 'PROJECT_ID', value: projectSlug },
            ],
          },
        ],
      },
    });

    await ecsClient.send(command);

    return {
      status: 'queued',
      data: { projectSlug, url: `http://${projectSlug}.localhost:8000` },
    };
  }
}
