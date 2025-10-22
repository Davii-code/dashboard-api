export function isValidISODate(d: string): boolean {
    // aceita YYYY-MM-DD
    return /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(new Date(d).getTime());
}

export function toStartOfDay(dateISO: string): Date {
    const d = new Date(dateISO + 'T00:00:00.000Z');
    return d;
}

export function toEndOfDay(dateISO: string): Date {
    const d = new Date(dateISO + 'T23:59:59.999Z');
    return d;
}
