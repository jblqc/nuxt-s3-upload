// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	app: {
		head: {
			title: 'Image Upload to S3',
			meta: [
				{
					name: 'description',
					content:
						'Secure image uploads using pre-signed URLs, private S3 buckets, and CloudFront.',
				},
			],
			link: [
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '96x96',
					href: '/favicon-96x96.png',
				},
				{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
				{ rel: 'manifest', href: '/site.webmanifest' },
			],
		},
	},
});
