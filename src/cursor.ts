class TerminalCursor {
    public escape(command: string): TerminalCursor {
        process.stdout.write(`\x1b${command}`);
        return this;
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

    public hide(): TerminalCursor {
        process.stdout.write('\x1b[?25l');
        return this;
    }

    public clearScreen(): TerminalCursor {
        process.stdout.write('\x1b[2J');
        return this;
    }

    public reset(): TerminalCursor {
        process.stdout.write('\x1bc');
        return this;
    }

    public eraseToEndLine(): TerminalCursor {
        process.stdout.write('\x1b[K');
        return this;
    }

    public eraseToEndScreen(): TerminalCursor {
        process.stdout.write('\x1b[J');
        return this;
    }

    public eraseCurrentLine(): TerminalCursor {
        process.stdout.write('\r\x1b[K');
        return this;
    }

    public erasePreviousLine(line: number = 1): TerminalCursor {
        if (typeof line === 'number' && line > 0)
            process.stdout.write(`\x1b[${line}A\r\x1b[K`);
        return this;
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
