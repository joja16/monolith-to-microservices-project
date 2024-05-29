import AWS = require('aws-sdk');
import {config} from './config/config';


// Configure AWS
const credentials = new AWS.SharedIniFileCredentials({profile: config.aws_profile});
console.debug("Initialize Configure AWS..."+config.aws_media_bucket);
AWS.config.credentials = credentials;
AWS.config.update({ region: config.aws_region });

console.debug("AWS Credentials: ", credentials);
console.debug("AWS Region: ", AWS.config.region);
console.debug("AWS profile: ", config.aws_profile);

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: config.aws_region,
  params: {Bucket: config.aws_media_bucket},
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('getObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('putObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}
