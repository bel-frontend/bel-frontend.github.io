export const parseMeta = (str: string) => {
    const res = str
        .split('\n')
        .filter((i) => i)
        .reduce((acc, item) => {
            const str = item
                .split(':')
                .map(
                    (i) =>
                        `"${i
                            .replaceAll('\n', '')
                            .replaceAll("'", '')
                            .trim()}"`,
                )
                .join(':');

            return acc.length > 0 ? `${acc},${str}` : `${str}`;
        }, '');
    try {
        return JSON.parse(`{${res}}`.replaceAll('""', '"'));
    } catch (error) {
        console.log(error);
    }
};
