export function formatDate(date: Date | undefined) {
	if (!date) return;
	return new Date(date).toLocaleDateString('ja-JP', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
}
