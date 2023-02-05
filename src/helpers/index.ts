export const parseMeta = (str: string) => {
    const res = str
        .split('\n')
        .filter((i) => i)
        .reduce((acc, item) => {
            const str = item
                .split(':')
                .map((i) => `"${i.replaceAll("'", '').trim()}"`)
                .join(':');
            console.log(str);

            return acc.length > 0 ? `${acc},${str}` : `${str}`;
        }, '');
    return JSON.parse(`{${res}}`);
};
