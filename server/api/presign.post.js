import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default defineEventHandler(async event => {
	const body = await readBody(event);
	const { fileName, fileType } = body;

	if (!fileName || !fileType) {
		throw createError({ statusCode: 400, statusMessage: 'Missing file data' });
	}

	if (!ALLOWED_TYPES.includes(fileType)) {
		throw createError({ statusCode: 400, statusMessage: 'Invalid file type' });
	}

	const s3 = new S3Client({
		region: process.env.AWS_REGION,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		},
	});

	const key = `${crypto.randomUUID()}-${fileName}`;

	const command = new PutObjectCommand({
		Bucket: process.env.AWS_S3_BUCKET,
		Key: key,
		ContentType: fileType,
	});

	const url = await getSignedUrl(s3, command, { expiresIn: 60 });

	return {
		uploadUrl: url,
		fileUrl: `https://${process.env.CLOUDFRONT_DOMAIN}/${key}`,
	};
});
