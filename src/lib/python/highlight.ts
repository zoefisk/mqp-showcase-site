function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

const KEYWORDS = new Set([
    "False", "None", "True",
    "and", "as", "assert", "async", "await",
    "break", "class", "continue", "def", "del",
    "elif", "else", "except", "finally", "for",
    "from", "global", "if", "import", "in",
    "is", "lambda", "nonlocal", "not", "or",
    "pass", "raise", "return", "try", "while",
    "with", "yield",
]);

const BUILTINS = new Set([
    "abs", "all", "any", "ascii", "bin", "bool", "breakpoint",
    "bytearray", "bytes", "callable", "chr", "classmethod",
    "compile", "complex", "delattr", "dict", "dir", "divmod",
    "enumerate", "eval", "exec", "filter", "float", "format",
    "frozenset", "getattr", "globals", "hasattr", "hash", "help",
    "hex", "id", "input", "int", "isinstance", "issubclass", "iter",
    "len", "list", "locals", "map", "max", "memoryview", "min",
    "next", "object", "oct", "open", "ord", "pow", "print",
    "property", "range", "repr", "reversed", "round", "set",
    "setattr", "slice", "sorted", "staticmethod", "str", "sum",
    "super", "tuple", "type", "vars", "zip",
    "Exception", "ValueError", "TypeError", "KeyError", "IndexError",
    "AttributeError", "RuntimeError", "StopIteration", "NameError",
    "IOError", "OSError", "FileNotFoundError", "NotImplementedError",
    "ZeroDivisionError", "OverflowError", "ImportError",
    "ModuleNotFoundError", "PermissionError", "ArithmeticError",
    "LookupError", "SystemError", "SystemExit", "BaseException",
    "KeyboardInterrupt", "Warning", "UserWarning", "DeprecationWarning",
    "SyntaxWarning", "RuntimeWarning", "GeneratorExit",
]);

const CONSTANTS = new Set(["True", "False", "None"]);

// Token regex — order matters: most specific patterns first
// Groups:
//  1: comment
//  2: triple-double-quoted string (with optional prefix)
//  3: triple-single-quoted string (with optional prefix)
//  4: double-quoted string (with optional prefix)
//  5: single-quoted string (with optional prefix)
//  6: decorator
//  7: number (int, float, hex, octal, binary, complex)
//  8: identifier (keyword / builtin / name)
const TOKEN_REGEX =
    /(#[^\n]*)|([fFrRbBuU]{0,2}"""[\s\S]*?""")|([fFrRbBuU]{0,2}'''[\s\S]*?''')|([fFrRbBuU]?"(?:[^"\\]|\\.)*")|([fFrRbBuU]?'(?:[^'\\]|\\.)*')|(@[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)|(-?(?:0[xXoObB][0-9A-Fa-f_]+|(?:\d[\d_]*(?:\.\d[\d_]*)?|\.\d[\d_]*)(?:[eE][+-]?\d[\d_]*)?)[jJ]?)|([A-Za-z_]\w*)/g;

export function highlightPython(code: string): string {
    let result = "";
    let lastIndex = 0;

    // Track whether the last identifier token was "def" or "class"
    // so the next identifier can be styled as a function/class name.
    let afterDef = false;
    let afterClass = false;

    for (const match of code.matchAll(TOKEN_REGEX)) {
        const index = match.index ?? 0;
        const full = match[0];
        const [, comment, tripleDouble, tripleSingle, dblString, sglString, decorator, number, identifier] = match;

        // Append any unmatched text (operators, punctuation, whitespace) as-is
        result += escapeHtml(code.slice(lastIndex, index));

        if (comment) {
            result += `<span class="py-comment">${escapeHtml(full)}</span>`;
            afterDef = false;
            afterClass = false;
        } else if (tripleDouble || tripleSingle || dblString || sglString) {
            result += `<span class="py-string">${escapeHtml(full)}</span>`;
            afterDef = false;
            afterClass = false;
        } else if (decorator) {
            result += `<span class="py-decorator">${escapeHtml(full)}</span>`;
            afterDef = false;
            afterClass = false;
        } else if (number !== undefined) {
            result += `<span class="py-number">${escapeHtml(full)}</span>`;
            afterDef = false;
            afterClass = false;
        } else if (identifier) {
            if (afterDef) {
                result += `<span class="py-funcname">${escapeHtml(full)}</span>`;
                afterDef = false;
                afterClass = false;
            } else if (afterClass) {
                result += `<span class="py-classname">${escapeHtml(full)}</span>`;
                afterDef = false;
                afterClass = false;
            } else if (CONSTANTS.has(identifier)) {
                result += `<span class="py-constant">${full}</span>`;
                afterDef = false;
                afterClass = false;
            } else if (KEYWORDS.has(identifier)) {
                result += `<span class="py-keyword">${full}</span>`;
                afterDef = identifier === "def";
                afterClass = identifier === "class";
            } else if (BUILTINS.has(identifier)) {
                result += `<span class="py-builtin">${escapeHtml(full)}</span>`;
                afterDef = false;
                afterClass = false;
            } else {
                result += escapeHtml(full);
                afterDef = false;
                afterClass = false;
            }
        } else {
            result += escapeHtml(full);
        }

        lastIndex = index + full.length;
    }

    result += escapeHtml(code.slice(lastIndex));
    return result;
}
