const defaultOptions = {
	retryCount: 4,
	defaultValue: null,
};

export const customFetch = async (
	url: string,
	options: {
		retryCount?: number;
		defaultValue?: any;
	} = {}
) => {
	const resolvedOptions = { ...defaultOptions, ...options };

	for (let retry = 0; retry < resolvedOptions.retryCount; retry++) {
		try {
			console.log(`Trying to fetch from ${url} ...`);
			const response = await fetch(url);

			if (response.status < 200 || response.status > 299)
				throw new Error();

			const data = await response.json();
			return data;
		} catch (err) {
			console.error(`Fetch ${retry + 1} failed`);
		}
	}

	return resolvedOptions.defaultValue;
};
