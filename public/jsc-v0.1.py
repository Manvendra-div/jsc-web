# jsc_web.py - Just a Simple Compiler v1.1 (Web Core)
# ---------------------------------------------------
# This file is meant to be used as a LIBRARY from Pyodide / browser.
# It exposes:
#   - run_jsc(source: str)
#
# No sys.argv, no file I/O, no __main__ block.

import re
import sys


# ----------- Lexer -----------
# TOKEN_SPEC defines all the possible tokens our language can have.
# Each token is matched using regular expressions.
TOKEN_SPEC = [
    ("NUMBER", r"\d+"),                 # digits → numbers
    ("STRING", r'"[^"]*"'),             # anything inside double quotes
    ("DOUNTIL", r"dountil"),            # dountil keyword (before ID)
    ("INPUT", r"capture"),              # capture keyword for user input
    ("ID", r"[A-Za-z_][A-Za-z0-9_]*"),  # variable names / keywords
    ("ASSIGN", r"="),                   # =
    ("LPAREN", r"\("),                  # (
    ("RPAREN", r"\)"),                  # )
    ("PLUS", r"\+"),                    # +
    ("MINUS", r"\-"),                   # -
    ("SEMI", r";"),                     # ;
    ("WS", r"\s+"),                     # whitespace
    ("GE", r">="),                      # >=
    ("LE", r"<="),                      # <=
    ("GT", r">"),                       # >
    ("LT", r"<"),                       # <
    ("EQ", r"=="),                      # ==
    ("NE", r"!="),                      # !=
    ("BLOCK_END", r"::end;"),           # ::end; (end of loop block)
    ("BLOCK_START", r"::"),             # :: (start of loop block)
    ("COMMENT", r"\*c.*"),              # comments starting with *c
]


# Combine all tokens into a single regex
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
    """Takes tokens and builds an Abstract Syntax Tree."""

    def __init__(self, tokens):
        self.tokens = list(tokens)
        self.pos = 0  # current index in token list

    def peek(self):
        """Return the current token without consuming it."""
        return self.tokens[self.pos]

    def eat(self, kind=None):
        """Consume a token. If kind is given, it must match."""
        tok = self.peek()
        if kind and tok[0] != kind:
            raise SyntaxError(f"Expected {kind}, got {tok}")
        self.pos += 1
        return tok

    def parse(self):
        """Parse until EOF, building a program node."""
        stmts = []
        while self.peek()[0] != "EOF":
            stmts.append(self.statement())
        return ("program", stmts)

    def statement(self):
        """Parse a single statement based on the first keyword/token."""
        t = self.peek()

        # var x = expr;
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
            self.eat("LPAREN")
            condition = self.condition()
            self.eat("RPAREN")
            self.eat("BLOCK_START")
            body = []

            # Parse statements inside the loop block
            while self.peek()[0] != "BLOCK_END":
                body.append(self.statement())

            self.eat("BLOCK_END")
            return ("dountil", condition, body)

        # x = expr;
        elif t[0] == "ID":
            name = self.eat("ID")[1]
            if self.peek()[0] == "ASSIGN":  # assignment
                self.eat("ASSIGN")
                expr = self.expr()
                self.eat("SEMI")
                return ("assign", name, expr)
            else:  # single variable expression
                self.eat("SEMI")
                return ("expr", ("var_ref", name))

        else:
            raise SyntaxError(f"Unexpected token {t}")

    def expr(self):
        """Handles + and - operations."""
        left = self.term()
        while self.peek()[0] in ("PLUS", "MINUS"):
            if self.peek()[0] == "PLUS":
                self.eat("PLUS")
                right = self.term()
                left = ("add", left, right)
            elif self.peek()[0] == "MINUS":
                self.eat("MINUS")
                right = self.term()
                left = ("minus", left, right)
        return left

    def term(self):
        """Handles numbers, strings, and variable references."""
        t = self.peek()
        if t[0] == "NUMBER":
            return ("num", int(self.eat("NUMBER")[1]))
        if t[0] == "STRING":
            return ("str", self.eat("STRING")[1][1:-1])
        if t[0] == "INPUT":
            # capture(<prompt?>) reads a line from stdin
            self.eat("INPUT")
            prompt_expr = ("str", "")
            if self.peek()[0] == "LPAREN":
                self.eat("LPAREN")
                if self.peek()[0] != "RPAREN":
                    prompt_expr = self.expr()
                self.eat("RPAREN")
            return ("input", prompt_expr)
        if t[0] == "ID":
            return ("var_ref", self.eat("ID")[1])
        raise SyntaxError(f"Unexpected token: {t}")

    def condition(self):
        """Parses conditions like a >= b, x == 5, etc."""
        left = self.expr()
        op = self.eat()[0]  # operator token type
        right = self.expr()
        return ("cond", op, left, right)


# ----------- Interpreter -----------
class Env(dict):
    """Variable environment."""
    pass


def eval_node(node, env):
    """Execute an AST node."""
    t = node[0]

    if t == "program":
        for stmt in node[1]:
            eval_node(stmt, env)

    elif t == "var":  # variable declaration
        _, name, expr = node
        env[name] = eval_node(expr, env)

    elif t == "assign":  # assignment
        _, name, expr = node
        env[name] = eval_node(expr, env)

    elif t == "render":  # output
        print(eval_node(node[1], env))

    elif t == "assist":  # AI helper placeholder
        ai_help(eval_node(node[1], env))

    elif t == "num":
        return node[1]

    elif t == "str":
        return node[1]

    elif t == "input":  # capture keyword
        prompt = eval_node(node[1], env)
        return input(str(prompt))

    elif t == "var_ref":
        return env[node[1]]

    elif t == "add":  # + operator
        left = eval_node(node[1], env)
        right = eval_node(node[2], env)
        # If numbers → add, if strings → concatenate
        return left + right if isinstance(left, (int,float)) and isinstance(right, (int,float)) else str(left) + str(right)

    elif t == "minus":  # - operator
        return eval_node(node[1], env) - eval_node(node[2], env)

    elif t == "dountil":  # loop
        _, cond, body = node
        while not eval_condition(cond, env):
            for stmt in body:
                eval_node(stmt, env)

def eval_condition(cond, env):
    """Evaluates comparison operators: >=, <=, ==, != etc."""
    _, op, left, right = cond
    left_val = eval_node(left, env)
    right_val = eval_node(right, env)

    return {
        "GE": left_val >= right_val,
        "LE": left_val <= right_val,
        "GT": left_val > right_val,
        "LT": left_val < right_val,
        "EQ": left_val == right_val,
        "NE": left_val != right_val
    }.get(op, False)


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
