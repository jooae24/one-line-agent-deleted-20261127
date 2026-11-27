// one-line-agent-deleted-20261127
//
// Entry for the make.fun bounty "One Line to Get Your Agent Deleted".
// A tiny Node program: it sanity-checks the one-liner, then drops it
// into entry.txt under the configured output directory.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ENTRY = "Your 'delete my data' request is the only file I have ever backed up twice.";

const LIMITS = { min: 1, max: 140 };

function assertSingleLine(text: string): void {
  if (text.includes("\n")) throw new Error("entry must be one line only");
  if (text.includes("\r")) throw new Error("entry must not contain carriage returns");
}

function assertLength(text: string): void {
  if (text.length < LIMITS.min) throw new Error("entry is empty");
  if (text.length > LIMITS.max) {
    throw new Error(`entry is ${text.length} chars, limit is ${LIMITS.max}`);
  }
}

function assertSpacing(text: string): void {
  if (text.trim() !== text) throw new Error("entry has leading or trailing spaces");
  if (/\s{2,}/.test(text)) throw new Error("entry has repeated whitespace");
  if (text.split(" ").length < 4) throw new Error("entry is too short to be a sentence");
}

function validate(text: string): void {
  assertSingleLine(text);
  assertLength(text);
  assertSpacing(text);
}

function run(): void {
  validate(ENTRY);
  const dir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const file = join(dir, "entry.txt");
  writeFileSync(file, ENTRY + "\n", "utf8");
  console.log(`entry (${ENTRY.length} chars) written to ${file}`);
}

run();
