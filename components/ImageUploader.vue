<script setup>
	import { ref } from 'vue';
	import { useImageUpload } from '@/composables/useImageUpload';

	const isDragging = ref(false);

	const { items, status, error, addFiles, uploadImages, reset } =
		useImageUpload();

	function onDrop(e) {
		e.preventDefault();
		isDragging.value = false;
		addFiles(e.dataTransfer.files);
	}
</script>

<template>
	<section class="uploader">
		<!-- IDLE -->
		<template v-if="status === 'idle'">
			<div
				class="dropzone"
				:class="{ dragging: isDragging }"
				@dragover.prevent="isDragging = true"
				@dragleave.prevent="isDragging = false"
				@drop="onDrop">
				<input
					type="file"
					multiple
					accept="image/jpeg,image/png,image/webp"
					class="file-input"
					@change="e => addFiles(e.target.files)" />

				<div class="dropzone-content">
					<p class="title">Drag & drop images</p>
					<p class="subtitle">or click to browse</p>
				</div>
			</div>

			<div
				v-if="items.length"
				class="preview-grid">
				<img
					v-for="item in items"
					:key="item.preview"
					:src="item.preview"
					class="preview-img" />
			</div>

			<button
				class="upload-btn"
				:disabled="!items.length"
				@click="uploadImages">
				Upload images
			</button>
		</template>

		<!-- UPLOADING -->
		<template v-else-if="status === 'uploading'">
			<div class="uploading-state">
				<p class="uploading-text">Uploading your images</p>

				<!-- subtle skeleton list -->
				<ul class="upload-skeleton">
					<li
						v-for="item in items"
						:key="item.preview">
						<div class="skeleton-thumb"></div>
						<div class="skeleton-line"></div>
					</li>
				</ul>
			</div>
		</template>

		<!-- DONE -->
		<template v-else-if="status === 'done'">
			<div class="done-state">
				<h3>Upload complete </h3>

				<ul class="result-list">
					<li
						v-for="item in items"
						:key="item.fileUrl"
						class="result-item">
						<img
							:src="item.preview"
							class="result-thumb"
							alt="Uploaded image preview" />

						<div class="result-meta">
							<p class="filename">{{ item.file.name }}</p>

							<a
								:href="item.fileUrl"
								target="_blank"
								rel="noopener noreferrer"
								class="view-link">
								View image →
							</a>
						</div>
					</li>
				</ul>

				<button
					class="upload-again-btn"
					@click="reset">
					Upload more images
				</button>
			</div>
		</template>

		<!-- ERROR -->
		<template v-else-if="status === 'error'">
			<p class="error">{{ error }}</p>
			<button
				class="upload-again-btn"
				@click="reset">
				Try again
			</button>
		</template>
	</section>
</template>
