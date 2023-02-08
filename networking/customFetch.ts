const defaultOptions = {
	retryCount: 4,
	retryDelay: 1000,
	defaultValue: null,
};

export const customFetch = async (
	url: string,
	options: {
		retryCount?: number;
		retryDelay?: number;
		defaultValue?: any;
	} = {}
) => {
	const resolvedOptions = { ...defaultOptions, ...options };

	for (let retry = 0; retry < resolvedOptions.retryCount; retry++) {
		try {
			console.log(`Trying to fetch from ${url} ...`);
			const response = await fetch(url);

			if (response.status >= 400) {
				console.error(
					`Request failed with status code ${response.status}`
				);
				throw new Error(`Status code ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (err: any) {
			console.error(`Fetch ${retry + 1} failed: ${err.message}`);

			if (retry + 1 < resolvedOptions.retryCount) {
				console.log(
					`Waiting ${resolvedOptions.retryDelay}ms before retrying...`
				);
				await new Promise(resolve =>
					setTimeout(resolve, resolvedOptions.retryDelay)
				);
			}
		}
	}

	return resolvedOptions.defaultValue;
};
