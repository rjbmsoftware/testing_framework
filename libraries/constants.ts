import path from "node:path";

export function getComputerImageFixturePath(): string {
    return path.join(process.cwd(), 'images', 'computer.jpg');
}
