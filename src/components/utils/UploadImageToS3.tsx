import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';

const S3_BUCKET = import.meta.env.VITE_S3_BUCKET;
const REGION = import.meta.env.VITE_S3_REGION;
const ACCESS_KEY = import.meta.env.VITE_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = import.meta.env.VITE_S3_SECRET_KEY;

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export const uploadFilesToS3 = async (files: File[]) => {
  const urls: string[] = [];

  for (const file of files) {
    const randomPrefix = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const newFileName = `${randomPrefix}-${file.name}`;

    const params: PutObjectCommandInput = {
      Bucket: S3_BUCKET,
      Key: newFileName,
      Body: file,
      ACL: 'public-read' as ObjectCannedACL,
      ContentType: file.type,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    const url = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${newFileName}`;
    urls.push(url);
  }

  return urls;
};
