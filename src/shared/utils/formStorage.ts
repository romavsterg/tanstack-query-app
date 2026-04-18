type FormValues = Record<string, unknown>;

const getStorageKey = (formName: string) => `form:${formName}`;

const stripIgnoredFields = (
	values: FormValues,
	ignoreFields: string[] = [],
) => {
	const result: FormValues = {};
	const ignore = new Set(ignoreFields);

	Object.entries(values).forEach(([key, value]) => {
		if (ignore.has(key)) {
			return;
		}
		if (value === undefined) {
			return;
		}
		result[key] = value;
	});

	return result;
};

export const saveFormDraft = (
	formName: string,
	values: FormValues,
	ignoreFields: string[] = [],
) => {
	try {
		const sanitized = stripIgnoredFields(values, ignoreFields);
		localStorage.setItem(getStorageKey(formName), JSON.stringify(sanitized));
	} catch {
		void 0;
	}
};

export const loadFormDraft = <T>(formName: string) => {
	try {
		const raw = localStorage.getItem(getStorageKey(formName));
		if (!raw) {
			return null;
		}
		return JSON.parse(raw) as T;
	} catch {
		return null;
	}
};

export const clearFormDraft = (formName: string) => {
	try {
		localStorage.removeItem(getStorageKey(formName));
	} catch {
		// Ignore storage errors.
	}
};
