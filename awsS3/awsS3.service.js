import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from '../config';

const s3Client = new S3Client({
    region: config.region,
    credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
    },
});

// URL for getting an object
const getObjectUrl = async (key: string) => {
    const command = new GetObjectCommand({
        Bucket: config.bucket,
        Key: key,
    });

    // Creating a presigned URL
    const url = await getSignedUrl(s3Client, command);
    return url;
}

// URL for putting an object
const putObjectUrl = async (size: string, contentType: string, folderName: string, index: number, purpose: string) => {
    const key = `uploads/${purpose}/${folderName}/${purpose}-${index}.${contentType}`;
    const command = new PutObjectCommand({
        Bucket: config.bucket,
        Key: key,
        ContentType: contentType,
    });

    // Creating a presigned URL
    const url = await getSignedUrl(s3Client, command);
    return url;
}
export default {
    getObjectUrl,
    putObjectUrl,
};
