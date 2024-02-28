import { IsUrl, Matches } from 'class-validator';

export class CreateDeploymentDto {
  @IsUrl({}, { message: 'Not a valid URL' })
  @Matches(/(https?:\/\/)?(www\.)?(github\.com|gitlab\.com)\/.+/, {
    message: 'URL must be from github.com or gitlab.com',
  })
  gitUrl: string;
}
