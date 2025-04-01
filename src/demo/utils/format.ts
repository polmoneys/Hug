export const formatDate = (date: Date, locale = 'es-ES') =>
    new Intl.DateTimeFormat(locale).format(new Date(date));

export const formatTimeString = (
    date: Date,
    showSeconds = false,
    useHour12 = false
): string =>
    date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined,
        hour12: useHour12,
    });

export const yesterday = (): string => {
    const t = new Date();
    t.setDate(t.getDate() - 1);
    // YYYY-MM-DD
    return t.toISOString().split('T')[0];
};

export const relativeTime = ({
    amount,
    unit,
}: {
    amount: number;
    unit: 'day' | 'hour' | 'month' | 'year';
}): string => {
    const rtf = new Intl.RelativeTimeFormat('en', {
        numeric: 'auto',
    });
    return rtf.format(amount, unit);
};

export const formatNumber = (num: number, locale?: string) =>
    new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(num);

/*
const pluralizePost = pluralize('post')
console.log(pluralizePost(1)) // 'post'
console.log(pluralizePost(2)) // 'posts'
const pluralizeMouse = pluralize('mouse', 'mice')
*/

export const pluralize =
    (singular: string, plural = `${singular}s`) =>
    (quantity: number) =>
        Math.abs(quantity) === 1 ? singular : plural;

const customLog = console.log.bind(document);
export const OMG = (input: string) => customLog('======>', input, '<======');
