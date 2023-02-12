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
            console.log(str);

            return acc.length > 0 ? `${acc},${str}` : `${str}`;
        }, '');
    try {
        console.log(`{${res}}`[25], `{${res}}`);
        return JSON.parse(`{${res}}`.replaceAll('""', '"'));
    } catch (error) {
        console.log(error);
    }
};
