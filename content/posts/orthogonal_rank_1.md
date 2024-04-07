---
title: "Finding a rank 1 matrix orthogonal to another matrix"
date: 2024-04-06T10:21:47-05:00
draft: false
tags: ['linear algebra']
---


# Finding a rank 1 matrix orthogonal to another matrix

---
 
Recently I needed to solve the following problem: given a square matrix $\mathbf{A}$ find another square matrix $\mathbf{B}$ satisfying
$\text{vec}(\mathbf{A})^T \text{vec}(\mathbf{B}) = 0$.
This is the sense in which I use the word orthogonal here, rather than the columns of $\mathbf{A}$ or $\mathbf{B}$ being orthogonal.
Anyway, it's impossible for the columns of a rank 1 matrix to be orthogonal.

If you are like me this problem sounds: easy at first glance, then quite difficult, then easy again.
Here is my solution.

Since we seek a rank 1 matrix, let $\mathbf{B} = \mathbf{x} \mathbf{y}^T$.
Now note that

{{< katex >}}
$$
  \text{vec}(\mathbf{A})^T \text{vec}(\mathbf{B}) =
  \sum_{ij} \mathbf{A}_{ij} \mathbf{B}_{ij} = 
  \sum_{ij} \mathbf{A}_{ij} \mathbf{x}_{i} \mathbf{y}_j = 
  \mathbf{x}^T \mathbf{Ay} .
$$
{{< /katex >}}

So, if we can choose $\mathbf{x}, \mathbf{y}$ such that
$\mathbf{x}^T \mathbf{Ay}$ we have solved the problem.
This can be done by choosing $\mathbf{y}$ and $\mathbf{x}_{1:n-1}$ randomly and computing the last element $\mathbf{x}_n$ as the solution to a scalar equation, as follows

{{< katex >}}
$$
  \mathbf{p} \coloneqq \mathbf{Ay} \\
  \mathbf{x}_n = \frac{-\mathbf{x}_{1:n-1}^T \mathbf{p}_{1:n-1}}{\mathbf{p}_{n}} .
$$
{{< /katex >}}

A short Python snippet implementing this algorithm is given below, it also normalizes the matrix $\mathbf{B}$.


```python
from numpy import outer, inner
from numpy.linalg import norm
from numpy.random import normal

def orthogonal_rank_1_matrix(A):
    # input: A, any square matrix
    # output: a rank 1 matrix B satisfying vec(A)^Tvec(B) = 0
    n = A.shape[0]
    y = normal(size=(n,))
    x = normal(size=(n,))  # only using x[:-1]
    p = A@y
    x[-1] = -inner(p[:-1],x[:-1])/p[-1]
    B = outer(x,y)/(norm(x)*norm(y))
    return B
```

---

### Comments

- The case where one seeks a rank $k$ matrix is nearly identical.
  Initialize the $2nk-1$ elements of the rank $k$ factorization
  $\mathbf{B} = \mathbf{X} \mathbf{Y}^T$
  randomly, then solve for the remaining element via a scalar equation.



