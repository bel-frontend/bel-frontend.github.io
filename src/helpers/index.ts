export const parseMeta = (str: string) => {
    try {
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
        return JSON.parse(`{${res}}`.replaceAll('""', '"'));
    } catch (error) {
        return [undefined, undefined];
    }
};

export const parseMD = (text: string) => {
    const meta = text.split('---').filter((i) => i);

    return text.length
        ? {
              meta: parseMeta(meta[0]),
              content: meta[1],
              id: parseMeta(meta[0])?.number?.toString(),
          }
        : null;
};
