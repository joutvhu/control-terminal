export function rgbToRgb(r: number, g: number, b: number): number[] {
    return [
        r < 0 ? 0 : r > 255 ? 255 : r,
        g < 0 ? 0 : g > 255 ? 255 : g,
        b < 0 ? 0 : b > 255 ? 255 : b
    ];
}

export function hexToRgb(hex: string): number[] {
    const matches = /(?<color>[a-f\d]{6}|[a-f\d]{3})/i.exec((hex as any).toString(16));

    if (!matches)
        return [0, 0, 0];
    let {color}: any = matches.groups;
    if (color.length === 3)
        color = color.split('').map((character: any) => character + character).join('');
    const integer = Number.parseInt(color, 16);

    return [
        (integer >> 16) & 0xFF,
        (integer >> 8) & 0xFF,
        integer & 0xFF
    ];
}
