export default class Times {
    static isToday(date: any) {
        const d = new Date();
        return d.toDateString() === date.toDateString();
    }

    static isYesterday(date: any) {
        let d = Date.now();
        d = d - 1000 * 60 * 60 * 24;
        return new Date(d).toDateString() === date.toDateString();
    }
}
