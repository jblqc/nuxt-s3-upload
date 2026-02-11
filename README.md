# Image Upload Demo

An image upload demo using **secure, direct browser-to-cloud uploads** using AWS best practices.

This project demonstrates how to upload images from the browser using pre-signed URLs, a private S3 bucket, and CloudFront for delivery.

---

## Features

- Drag & drop or select multiple images
- Direct uploads to **private Amazon S3** using **pre-signed URLs**
- Images served via **CloudFront CDN**
- Built with Nuxt 3

---

## Architecture Overview

- **Frontend & API**: Hosted on Vercel
- **Uploads**: Private S3 bucket
- **Delivery**: CloudFront
- **Security**: Temporary, scoped upload access via pre-signed URLs

---

## Tech Stack

- **Nuxt 3**
- **AWS S3**
- **AWS CloudFront**
- **AWS SDK (pre-signed URLs)**
- **Vercel (hosting & serverless API)**

---

## Environment Variables

The following environment variables are required for the server-side API:

```env
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=YOUR_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET
S3_BUCKET_NAME=your-private-bucket
CLOUDFRONT_DOMAIN=your-cloudfront-domain
```

---

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

App will be available at:

```
http://localhost:3000
```

---

## License

This project is for demonstration and learning purposes.

```

```
