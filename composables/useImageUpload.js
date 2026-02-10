import { ref } from 'vue';

export function useImageUpload() {
	const items = ref([]);
	const status = ref('idle'); // idle | uploading | done | error
	const error = ref(null);

	function addFiles(selectedFiles) {
		const newFiles = Array.from(selectedFiles);

		newFiles.forEach(file => {
			items.value.push({
				file,
				preview: URL.createObjectURL(file),
				fileUrl: null,
			});
		});
	}
	async function uploadImages() {
		if (!items.value.length) return;

		error.value = null;
		status.value = 'uploading';

		try {
			await Promise.all(
				items.value.map(async item => {
					if (!item.file.type.startsWith('image/')) {
						throw new Error('Only image files are allowed');
					}

					// 1. get permission
					const { uploadUrl, fileUrl } = await $fetch('/api/presign', {
						method: 'POST',
						body: {
							fileName: item.file.name,
							fileType: item.file.type,
						},
					});

					// 2️⃣ upload to S3
					await fetch(uploadUrl, {
						method: 'PUT',
						headers: {
							'Content-Type': item.file.type,
						},
						body: item.file,
					});

					// 3️⃣ save public URL
					item.fileUrl = fileUrl;
				}),
			);

			status.value = 'done';
		} catch (err) {
			error.value = err.message || 'Upload failed';
			status.value = 'error';
		}
	}

	/* ---------------------------
	 * Reset
	 * --------------------------- */
	function reset() {
		items.value.forEach(i => URL.revokeObjectURL(i.preview));
		items.value = [];
		status.value = 'idle';
		error.value = null;
	}

	return {
		items,
		status,
		error,
		addFiles,
		uploadImages,
		reset,
	};
}
