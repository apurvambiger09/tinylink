'use client';

import { useState } from 'react';

interface LinkFormProps {
	onAdd: () => void; // callback to refresh table
}

export default function LinkForm({ onAdd }: LinkFormProps) {
	const [url, setUrl] = useState('');
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const res = await fetch('/api/links', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url: url.trim(), code: code.trim() }),
			});

			const data = await res.json();

			if (!res.ok) {
				console.error('POST error response:', data);
				setError(data.error || 'Something went wrong');
			} else {
				setUrl('');
				setCode('');
				onAdd(); // refresh table
			}
		} catch (err: unknown) {
			console.error('POST request failed:', err);

			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Failed to create link');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mb-6 space-y-2">
			<div>
				<input
					type="text"
					placeholder="Long URL"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					className="border p-2 w-full rounded"
					required
				/>
			</div>
			<div>
				<input
					type="text"
					placeholder="Short code"
					value={code}
					onChange={(e) => setCode(e.target.value)}
					className="border p-2 w-full rounded"
					required
				/>
			</div>
			{error && <p className="text-red-500">{error}</p>}
			<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
				{loading ? 'Adding...' : 'Add Link'}
			</button>
		</form>
	);
}
