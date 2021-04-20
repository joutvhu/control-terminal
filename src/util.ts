export function validColors(...colors: number[]): number[] {
    return colors.map(value => value < 0 ? 0 : value > 255 ? 255 : value);
}

export function hexToRgb(hex: string): number[] {
    const matches = /(?<color>[a-f\d]{6}|[a-f\d]{3})/i.exec((hex as any).toString(16));

    if (!matches)
        return [0, 0, 0];
    let {color}: any = matches.groups;
    if (color.length === 3)
        color = color.split('').map((char: string) => char + char).join('');
    const integer = Number.parseInt(color, 16);

    return [(integer >> 16) & 0xFF, (integer >> 8) & 0xFF, integer & 0xFF];
}
