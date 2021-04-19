class TerminalCursor {
    public gotoStart(): void {
        process.stdout.write(`\x1b[H`);
    }

    public goTo(line: number, column: number): void {
        if (typeof line === 'number' && line > 0 && typeof column === 'number' && column > 0)
            process.stdout.write(`\x1b[${line};${line}H`);
    }

    public up(line: number = 1): void {
        if (typeof line === 'number' && line > 0)
            process.stdout.write(`\x1b[${line}A`);
    }

    public down(line: number = 1): void {
        if (typeof line === 'number' && line > 0)
            process.stdout.write(`\x1b[${line}B`);
    }

    public forward(column: number = 1): void {
        if (typeof column === 'number' && column > 0)
            process.stdout.write(`\x1b[${column}C`);
    }

    public backward(column: number = 1): void {
        if (typeof column === 'number' && column > 0)
            process.stdout.write(`\x1b[${column}D`);
    }

    public previousLine() {
        process.stdout.write('\x1b[F');
    }

    public hide() {
        process.stdout.write('\x1b[?25l');
    }

    public clearScreen() {
        process.stdout.write('\x1b[2J');
    }

    public reset() {
        process.stdout.write('\x1bc');
    }

    public eraseToEndLine() {
        process.stdout.write('\x1b[K');
    }

    public eraseToEndScreen() {
        process.stdout.write('\x1b[J');
    }

    public eraseCurrentLine() {
        process.stdout.write('\r\x1b[K');
    }

    public erasePreviousLine(line: number = 1) {
        if (typeof line === 'number' && line > 0)
            process.stdout.write(`\x1b[${line}A\r\x1b[K`);
    }

    public save() {
        process.stdout.write('\x1b[s');
    }

    public restore() {
        process.stdout.write('\x1b[u');
    }
}

export const cursor: TerminalCursor = new TerminalCursor();
