class TerminalCursor {
    public escape(command: string): void {
        process.stdout.write(`\x1b${command}`);
    }

    public goTo(line: number, column: number): TerminalCursor {
        if (typeof line === 'number' && line > 0 && typeof column === 'number' && column > 0)
            process.stdout.write(`\x1b[${line};${line}H`);
        return this;
    }

    public gotoStart(): TerminalCursor {
        process.stdout.write(`\x1b[H`);
        return this;
    }

    public carriageReturn(): TerminalCursor {
        process.stdout.write(`\r`);
        return this;
    }

    public up(line: number = 1): TerminalCursor {
        if (typeof line === 'number' && line > 0)
            process.stdout.write(`\x1b[${line}A`);
        return this;
    }

    public down(line: number = 1): TerminalCursor {
        if (typeof line === 'number' && line > 0)
            process.stdout.write(`\x1b[${line}B`);
        return this;
    }

    public forward(column: number = 1): TerminalCursor {
        if (typeof column === 'number' && column > 0)
            process.stdout.write(`\x1b[${column}C`);
        return this;
    }

    public backward(column: number = 1): TerminalCursor {
        if (typeof column === 'number' && column > 0)
            process.stdout.write(`\x1b[${column}D`);
        return this;
    }

    public previousLine(): TerminalCursor {
        process.stdout.write('\x1b[F');
        return this;
    }

    public hide(): void {
        process.stdout.write('\x1b[?25l');
    }

    public clearScreen(): void {
        process.stdout.write('\x1b[2J');
    }

    public reset(): void {
        process.stdout.write('\x1bc');
    }

    public eraseToEndLine(): void {
        process.stdout.write('\x1b[K');
    }

    public eraseToEndScreen(): void {
        process.stdout.write('\x1b[J');
    }

    public eraseCurrentLine(): void {
        process.stdout.write('\r\x1b[K');
    }

    public erasePreviousLine(line: number = 1): void {
        if (typeof line === 'number' && line > 0)
            process.stdout.write(`\x1b[${line}A\r\x1b[K`);
    }

    public save(): TerminalCursor {
        process.stdout.write('\x1b[s');
        return this;
    }

    public restore(): TerminalCursor {
        process.stdout.write('\x1b[u');
        return this;
    }
}

export const cursor: TerminalCursor = new TerminalCursor();
