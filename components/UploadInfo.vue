<template>
	<section class="upload-intro">
		<h1 class="intro-title">Image Upload Demo</h1>

		<p class="intro-description">
			This app is a simple image upload built to demonstrate AWS signed urls.
			Images are uploaded using pre-signed URLs to a private Amazon S3 bucket,
			providing temporary, scoped upload access, and are delivered through
			CloudFront to ensure secure access, improved performance, and that AWS
			credentials are never exposed to the client.
		</p>

		<ul class="intro-features">
			<li>
				<span class="dot"></span>
				Drag & drop or select multiple images
			</li>
			<li>
				<span class="dot"></span>
				Direct uploads to s3 bucket using pre-signed URLs
			</li>
			<li>
				<span class="dot"></span>
				Images served via CDN for fast global access
			</li>
			<li>
				<span class="dot"></span>
				Clean UI with previews, loaders, and results
			</li>
		</ul>

		<div class="intro-tech">
			<span>Nuxt 3</span>
			<span>S3 (Pre-signed Uploads)</span>
			<span>CloudFront CDN</span>
		</div>
	</section>
</template>
