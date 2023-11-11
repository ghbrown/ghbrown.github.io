---
title: "How many parentheses can Python handle?"
date: 2023-10-10T23:21:47-05:00
draft: false
tags: ['computer science']
---


# How many parentheses can Python handle?

---
 
During my office hours today I was asked whether "an extra pair of parentheses" would do any harm to the execution of a Python program.
In the case at hand the answer was "no", but I suspected there might be actually be a limit on nested parentheses depth.

Using the following Python script (which leverages the ability of the interpreter to evaluate expressions at runtime via `eval`), we can determine the answer is <span class='themecolor'>200</span>.
For any greater depth one receives a `SyntaxError: too many nested parentheses`.

```python
from sys import maxsize

def parens_expr(N):
   str = '('*N + '1 + 2' + ')'*N 
   return eval(str)

max_depth = 0
for i in range(maxsize):
    try:
        parens_expr(i)
        max_depth = i
    except:
        break

print(f'maximal parentheses depth: {max_depth}')
parens_expr(max_depth + 1)  # to demonstrate failure
```

---


