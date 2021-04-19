import {hexToRgb} from './util';

interface TerminalStyle {
    reset: TerminalStyleBuilder;
    bold: TerminalStyleBuilder;
    dim: TerminalStyleBuilder;
    italic: TerminalStyleBuilder;
    underline: TerminalStyleBuilder;
    blink: TerminalStyleBuilder;
    overline: TerminalStyleBuilder;
    inverse: TerminalStyleBuilder;
    hidden: TerminalStyleBuilder;
    strikethrough: TerminalStyleBuilder;

    black: TerminalStyleBuilder;
    red: TerminalStyleBuilder;
    green: TerminalStyleBuilder;
    yellow: TerminalStyleBuilder;
    blue: TerminalStyleBuilder;
    magenta: TerminalStyleBuilder;
    cyan: TerminalStyleBuilder;
    white: TerminalStyleBuilder;
    blackBright: TerminalStyleBuilder;
    redBright: TerminalStyleBuilder;
    greenBright: TerminalStyleBuilder;
    yellowBright: TerminalStyleBuilder;
    blueBright: TerminalStyleBuilder;
    magentaBright: TerminalStyleBuilder;
    cyanBright: TerminalStyleBuilder;
    whiteBright: TerminalStyleBuilder;

    bgBlack: TerminalStyleBuilder;
    bgRed: TerminalStyleBuilder;
    bgGreen: TerminalStyleBuilder;
    bgYellow: TerminalStyleBuilder;
    bgBlue: TerminalStyleBuilder;
    bgMagenta: TerminalStyleBuilder;
    bgCyan: TerminalStyleBuilder;
    bgWhite: TerminalStyleBuilder;
    bgBlackBright: TerminalStyleBuilder;
    bgRedBright: TerminalStyleBuilder;
    bgGreenBright: TerminalStyleBuilder;
    bgYellowBright: TerminalStyleBuilder;
    bgBlueBright: TerminalStyleBuilder;
    bgMagentaBright: TerminalStyleBuilder;
    bgCyanBright: TerminalStyleBuilder;
    bgWhiteBright: TerminalStyleBuilder;

    rgb(red: number, green: number, blue: number): TerminalStyleBuilder;

    bgRgb(red: number, green: number, blue: number): TerminalStyleBuilder;
}

interface TerminalStyleBuilder extends TerminalStyle {
    (message: string): string;
}

const STYLES: any = {
    modifier: {
        reset: [0, 0],
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        blink: [5, 25],
        overline: [53, 55],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
    },
    color: {
        black: 30,
        red: 31,
        green: 32,
        yellow: 33,
        blue: 34,
        magenta: 35,
        cyan: 36,
        white: 37,

        // Bright color
        blackBright: 90,
        redBright: 91,
        greenBright: 92,
        yellowBright: 93,
        blueBright: 94,
        magentaBright: 95,
        cyanBright: 96,
        whiteBright: 97
    },
    bgColor: {
        bgBlack: 40,
        bgRed: 41,
        bgGreen: 42,
        bgYellow: 43,
        bgBlue: 44,
        bgMagenta: 45,
        bgCyan: 46,
        bgWhite: 47,

        // Bright color
        bgBlackBright: 100,
        bgRedBright: 101,
        bgGreenBright: 102,
        bgYellowBright: 103,
        bgBlueBright: 104,
        bgMagentaBright: 105,
        bgCyanBright: 106,
        bgWhiteBright: 107
    }
};

function createBuilder(styles: [string, string][] = []): TerminalStyleBuilder {
    const builder: TerminalStyleBuilder = function build(message: string): string {
        for (let i = styles.length - 1; i >= 0; i--) {
            const value: [string, string] = styles[i];
            message = value[0] + message + value[1];
        }
        return message;
    } as TerminalStyleBuilder;

    defineProperties(builder, styles);
    return builder;
}

function defineProperties(builder: TerminalStyleBuilder | any, styles: [string, string][] = []): TerminalStyleBuilder {
    const properties: PropertyDescriptorMap = {};

    for (const [key, value] of Object.entries<any>(STYLES.modifier)) {
        properties[key] = {
            get(): TerminalStyleBuilder {
                return createBuilder([...styles, [`\x1b[${value[0]}m`, `\x1b[${value[1]}m`]]);
            }
        };
    }

    for (const [key, value] of Object.entries(STYLES.color)) {
        properties[key] = {
            get(): TerminalStyleBuilder {
                return createBuilder([...styles, [`\x1b[${value}m`, '\x1b[39m']]);
            }
        };
    }
    properties.rgb = {
        value: (red: number, green: number, blue: number): TerminalStyleBuilder => {
            return createBuilder([...styles, [`\x1b[38;2;${red};${green};${blue}m`, '\x1b[39m']]);
        }
    };
    properties.hex = {
        value: (hex: string): TerminalStyleBuilder => {
            const [red, green, blue] = hexToRgb(hex);
            return createBuilder([...styles, [`\x1b[38;2;${red};${green};${blue}m`, '\x1b[39m']]);
        }
    };

    for (const [key, value] of Object.entries(STYLES.bgColor)) {
        properties[key] = {
            get(): TerminalStyleBuilder {
                return createBuilder([...styles, [`\x1b[${value}m`, '\x1b[49m']]);
            }
        };
    }
    properties.bgRgb = {
        value: (red: number, green: number, blue: number): TerminalStyleBuilder => {
            return createBuilder([...styles, [`\x1b[48;2;${red};${green};${blue}m`, '\x1b[49m']]);
        }
    };
    properties.bgHex = {
        value: (hex: string): TerminalStyleBuilder => {
            const [red, green, blue] = hexToRgb(hex);
            return createBuilder([...styles, [`\x1b[48;2;${red};${green};${blue}m`, '\x1b[49m']]);
        }
    };

    Object.defineProperties(builder as any, properties);
    return builder;
}

export const style: TerminalStyle = createBuilder();
