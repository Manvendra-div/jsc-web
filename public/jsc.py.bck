# jsc_web.py - Just a Simple Compiler v1.1 (Web Core)
# ---------------------------------------------------
# This file is meant to be used as a LIBRARY from Pyodide / browser.
# It exposes:
#   - run_jsc(source: str)
#
# No sys.argv, no file I/O, no __main__ block.

import re


# ----------- Lexer -----------
TOKEN_SPEC = [
    ("NUMBER", r"\d+"),                  # digits → numbers
    ("STRING", r'"[^"]*"'),              # "..."
    ("ID", r"[A-Za-z_][A-Za-z0-9_]*"),   # identifiers / keywords
    ("ASSIGN", r"="),                    # =
    ("PLUS", r"\+"),                     # +
    ("MINUS", r"-"),                     # -
    ("SEMI", r";"),                      # ;
    ("WS", r"\s+"),                      # whitespace
    ("GE", r">="),                       # >=
    ("LE", r"<="),                       # <=
    ("GT", r">"),                        # >
    ("LT", r"<"),                        # <
    ("EQ", r"=="),                       # ==
    ("NE", r"!="),                       # !=
    ("DOUNTIL", r"dountil"),             # dountil keyword
    ("BLOCK_START", r"::"),              # ::
    ("BLOCK_END", r"::end;"),            # ::end;
    ("COMMENT", r"\*c.*"),               # *c comment
]

TOK_REGEX = "|".join(f"(?P<{n}>{p})" for n, p in TOKEN_SPEC)
Token = lambda t, v: (t, v)


def lex(code: str):
    """Convert source code into a stream of tokens."""
    for m in re.finditer(TOK_REGEX, code):
        kind = m.lastgroup
        val = m.group()

        if kind in ("WS", "COMMENT"):
            continue

        yield Token(kind, val)

    yield Token("EOF", "")


# ----------- Parser -----------
class Parser:
    def __init__(self, tokens):
        self.tokens = list(tokens)
        self.pos = 0

    def peek(self):
        return self.tokens[self.pos]

    def eat(self, kind=None):
        tok = self.peek()
        if kind and tok[0] != kind:
            raise SyntaxError(f"Expected {kind}, got {tok}")
        self.pos += 1
        return tok

    def parse(self):
        stmts = []
        while self.peek()[0] != "EOF":
            stmts.append(self.statement())
        return ("program", stmts)

    def statement(self):
        t = self.peek()

        # var name = expr;
        if t[0] == "ID" and t[1] == "var":
            self.eat("ID")
            name = self.eat("ID")[1]
            self.eat("ASSIGN")
            expr = self.expr()
            self.eat("SEMI")
            return ("var", name, expr)

        # render expr;
        elif t[0] == "ID" and t[1] == "render":
            self.eat("ID")
            expr = self.expr()
            self.eat("SEMI")
            return ("render", expr)

        # assist expr;
        elif t[0] == "ID" and t[1] == "assist":
            self.eat("ID")
            expr = self.expr()
            self.eat("SEMI")
            return ("assist", expr)

        # dountil (cond) :: ... ::end;
        elif t[0] == "DOUNTIL":
            self.eat("DOUNTIL")
            self.eat("(")
            condition = self.condition()
            self.eat(")")
            self.eat("BLOCK_START")

            body = []
            while self.peek()[0] != "BLOCK_END":
                body.append(self.statement())

            self.eat("BLOCK_END")
            return ("dountil", condition, body)

        # assignment or bare expr:
        #   x = expr;
        #   x;
        elif t[0] == "ID":
            name = self.eat("ID")[1]
            if self.peek()[0] == "ASSIGN":
                self.eat("ASSIGN")
                expr = self.expr()
                self.eat("SEMI")
                return ("assign", name, expr)
            else:
                # treat as expression statement using var_ref
                self.eat("SEMI")
                return ("expr", ("var_ref", name))

        else:
            raise SyntaxError(f"Unexpected token {t}")

    def expr(self):
        left = self.term()
        while self.peek()[0] in ("PLUS", "MINUS"):
            if self.peek()[0] == "PLUS":
                self.eat("PLUS")
                right = self.term()
                left = ("add", left, right)
            else:
                self.eat("MINUS")
                right = self.term()
                left = ("minus", left, right)
        return left

    def term(self):
        t = self.peek()
        if t[0] == "NUMBER":
            return ("num", int(self.eat("NUMBER")[1]))
        if t[0] == "STRING":
            return ("str", self.eat("STRING")[1][1:-1])
        if t[0] == "ID":
            return ("var_ref", self.eat("ID")[1])
        raise SyntaxError(f"Unexpected token: {t}")

    def condition(self):
        left = self.expr()
        op = self.eat()[0]  # GE, LT, EQ, etc.
        right = self.expr()
        return ("cond", op, left, right)


# ----------- Interpreter -----------
class Env(dict):
    """Variable environment."""
    pass


def eval_node(node, env, *, render_fn=print, assist_fn=None):
    """Evaluate an AST node."""
    t = node[0]

    if t == "program":
        for stmt in node[1]:
            eval_node(stmt, env, render_fn=render_fn, assist_fn=assist_fn)

    elif t == "var":
        _, name, expr = node
        env[name] = eval_node(expr, env, render_fn=render_fn, assist_fn=assist_fn)

    elif t == "assign":
        _, name, expr = node
        env[name] = eval_node(expr, env, render_fn=render_fn, assist_fn=assist_fn)

    elif t == "render":
        value = eval_node(node[1], env, render_fn=render_fn, assist_fn=assist_fn)
        render_fn(value)

    elif t == "assist":
        query = eval_node(node[1], env, render_fn=render_fn, assist_fn=assist_fn)
        if assist_fn is not None:
            assist_fn(query)
        else:
            ai_help(query, render_fn=render_fn)

    elif t == "num":
        return node[1]

    elif t == "str":
        return node[1]

    elif t == "var_ref":
        name = node[1]
        if name not in env:
            raise NameError(f"Variable '{name}' not defined")
        return env[name]

    elif t == "add":
        left = eval_node(node[1], env, render_fn=render_fn, assist_fn=assist_fn)
        right = eval_node(node[2], env, render_fn=render_fn, assist_fn=assist_fn)
        if isinstance(left, (int, float)) and isinstance(right, (int, float)):
            return left + right
        return str(left) + str(right)

    elif t == "minus":
        left = eval_node(node[1], env, render_fn=render_fn, assist_fn=assist_fn)
        right = eval_node(node[2], env, render_fn=render_fn, assist_fn=assist_fn)
        return left - right

    elif t == "dountil":
        _, cond, body = node
        # do-until: always run at least once
        while True:
            for stmt in body:
                eval_node(stmt, env, render_fn=render_fn, assist_fn=assist_fn)
            if eval_condition(cond, env, render_fn=render_fn, assist_fn=assist_fn):
                break

    else:
        raise RuntimeError(f"Unknown node type: {t}")


def eval_condition(cond, env, *, render_fn=print, assist_fn=None):
    _, op, left, right = cond
    left_val = eval_node(left, env, render_fn=render_fn, assist_fn=assist_fn)
    right_val = eval_node(right, env, render_fn=render_fn, assist_fn=assist_fn)

    if op == "GE":
        return left_val >= right_val
    if op == "LE":
        return left_val <= right_val
    if op == "GT":
        return left_val > right_val
    if op == "LT":
        return left_val < right_val
    if op == "EQ":
        return left_val == right_val
    if op == "NE":
        return left_val != right_val
    return False


def ai_help(query, *, render_fn=print):
    """Placeholder for web AI hook."""
    render_fn(f"[AI HELP] (not implemented): You asked -> {query}")


# ----------- Public entry for web -----------
def run_jsc(source: str, *, render_fn=print, assist_fn=None):
    """
    Entry point for web:
      - source: JSC program as a string
      - render_fn: function called for 'render' output (default: print)
      - assist_fn: optional function for 'assist' keyword
    """
    env = Env()
    tokens = lex(source)
    parser = Parser(tokens)
    ast = parser.parse()
    eval_node(ast, env, render_fn=render_fn, assist_fn=assist_fn)
    return env  # you can inspect final variables from JS if needed
