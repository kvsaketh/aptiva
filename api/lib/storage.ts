import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";

// OCI Object Storage through its S3-compatible API (Customer Secret Key).
const ns = process.env.OCI_S3_NAMESPACE ?? "";
const region = process.env.OCI_S3_REGION ?? "ap-hyderabad-1";
export const bucket = process.env.OCI_S3_BUCKET ?? "";

export const storageReady = !!(ns && bucket && process.env.OCI_S3_ACCESS_KEY && process.env.OCI_S3_SECRET_KEY);

const s3 = new S3Client({
  region,
  endpoint: `https://${ns}.compat.objectstorage.${region}.oraclecloud.com`,
  forcePathStyle: true,
  credentials: { accessKeyId: process.env.OCI_S3_ACCESS_KEY ?? "", secretAccessKey: process.env.OCI_S3_SECRET_KEY ?? "" },
  // OCI's S3 API rejects the SDK's default extra checksum headers.
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});

export const putObject = (key: string, body: Uint8Array, contentType: string) =>
  s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType }));

export const getObject = (key: string) => s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));

export const deleteObjects = (keys: string[]) =>
  s3.send(new DeleteObjectsCommand({ Bucket: bucket, Delete: { Objects: keys.map((Key) => ({ Key })) } }));
