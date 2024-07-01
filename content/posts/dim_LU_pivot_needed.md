---
title: "The space of matrices where LU requires pivoting is almost full-dimensional"
date: 2023-06-06T19:19:38-06:00
draft: false
katex: true
tags: ['linear algebra']
---

# The space of matrices requiring pivoted LU factorization is almost full-dimensional

---

The pivoted LU factorization of square matrices is the key routine for the direct solution of linear systems.
All square, invertible matrices have a pivoted LU factorization of the form $\mathbf{PA} = \mathbf{LU}$, where $\mathbf{P}$ is a permutation matrix and {{< katex >}}$\mathbf{L}, \; \mathbf{U}${{< /katex >}} are respectively upper and lower triangular.

However, not all square, invertible matrices have a factorization of the form {{< katex >}}$\mathbf{A} = \mathbf{LU}${{< /katex >}} (an LU factorization).
For example, consider the invertible matrix

{{< katex >}}
$$
  \mathbf{A} =
  \begin{bmatrix}
    0 & 1 \\
    1 & 1
  \end{bmatrix}
$$
{{< /katex >}}

for which the unpivoted LU algorithm will attempt to divide by 0 on the first iteration.
We will call such matrices "pivot-required", meaning that they do not have a "pure" LU factorization {{< katex >}}$\mathbf{A} = \mathbf{LU}${{< /katex >}} (even in infinite precision).

An interesting question regarding such matrices is: *what is the dimension of the set of pivot-required matrices*?

The answer, using elementary means is: *the set of pivot required matrices has dimension {{< katex >}}$n^2 - 1${{< /katex >}}*.

The full proof is presented below, but it is instructive to look at the {{< katex >}}$2 \times 2${{< /katex >}} case first.
First, we see that the zero must be encountered in the upper left on the first iteration; since we are assuming the matrix is invertible, a zero will not be encountered on the second (read *last*) iteration.
Now, the set of full rank {{< katex >}}$2 \times 2${{< /katex >}} matrices with a specified element equal to zero is 3-dimensional, and the generic part of this set admits the parameterization

{{< katex >}}
$$
  \begin{bmatrix}
    0 & b \\ 
    a & c
  \end{bmatrix}
$$
{{< /katex >}}

which only fails to be full rank on sets of dimension 2 or 0 like

{{< katex >}}
$$
  \begin{bmatrix}
    0 & 0 \\ 
    a & c
  \end{bmatrix}, \;
  \begin{bmatrix}
    0 & 0 \\ 
    0 & 0
  \end{bmatrix} .
$$
{{< /katex >}}

Since these "voids" in the set of pivot-required matrices are of dimension less than 3, the set of pivot-required {{< katex >}}$2 \times 2${{< /katex >}} matrices has dimension 3.

Note that here {{< katex >}}$3 = 2^2 - 1${{< /katex >}}, which agrees with the general formula stated above and proven below.

<details>
  <summary>Proof</summary>
  
  As above, one can explicitly parameterize the space of {{< katex >}}$n \times n${{< /katex >}} matrices for which unpivoted LU fails on the first iteration; now one finds that the dimension of this space is {{< katex >}}$n^2 - 1${{< /katex >}}. 
  
  However, there exist pivot-required matrices for which unpivoted LU fails on the {{< katex >}}$k${{< /katex >}}th iteration; for example, the following matrix has a failure on the second iteration:

  {{< katex >}}
  $$
  \begin{bmatrix}
    1 & 1 & 0 \\ 
    1 & 1 & 1 \\ 
    1 & 0 & 0
  \end{bmatrix} .
  $$
  {{< /katex >}}

  In general, pivot-required matrices can cause failure on iterations {{< katex >}}$1, ..., n-1${{< /katex >}}, since generating a zero on the last iteration would imply the matrix is not full rank.
    
  Therefore, we must ensure that the set of matrices which fail on iterations {{< katex >}}$2, ..., n-1${{< /katex >}} also have dimension less than or equal to {{< katex >}}$n^2 - 1${{< /katex >}}.
  In fact, we will prove constructively that such sets of matrices are also of dimension exactly {{< katex >}}$n^2 - 1${{< /katex >}}.
  
  During the {{< katex >}}$j${{< /katex >}} iteration of the unpivoted LU algorithm the following update is made to the trailing {{< katex >}}$n-j \times n-j${{< /katex >}} submatrix

  {{< katex >}}
  $$
    \mathbf{B}_{j+1:,j+1:} \leftarrow \mathbf{B}_{j+1:,j+1:}
    - \frac{1}{\mathbf{B}_{jj}} \mathbf{B}_{j+1:,j} \mathbf{B}_{j,j+1:} \; .
  $$
  {{< /katex >}}

  Let {{< katex >}}$b_{ij}^{(p)}${{< /katex >}} denote the {{< katex >}}$ij${{< /katex >}}th element of this submatrix after {{< katex >}}$p${{< /katex >}} steps of the unpivoted LU algorithm.
  Using the update rule for the complete matrix, we can write an update rule corresponding to iteration {{< katex >}}$p${{< /katex >}} for a single element

  {{< katex >}}
  $$
    b_{ij}^{(p)} = b_{ij}^{(p-1)} -
    \frac{1}{b_{pp}^{(p-1)}} b_{il}^{p-1} b_{lj}^{p-1}
  $$
  {{< /katex >}}

  noting two important facts: {{< katex >}}$b_{ij}^{(0)} = a_{ij}${{< /katex >}} (an element of the original matrix), this update formula only applies to elements in the submatrix {{< katex >}}$(i,j > p)${{< /katex >}}.

  The condition for breakdown of the algorithm on the {{< katex >}}$k${{< /katex >}}th iteration is {{< katex >}}$b_{kk}^{(k-1)} = 0${{< /katex >}}.
  Using the update formula and recurrence relationship, one can equivalently write this condition only in terms of the elements of the original matrix {{< katex >}}$\mathbf{A}${{< /katex >}}.
  Further, applying this recurrence relationship only to the {{< katex >}}$b_{kk}^{(p)}${{< /katex >}} term, one can see that the final result is an equation like {{< katex >}}$a_{kk} = f(a_{ij})${{< /katex >}} where only {{< katex >}}$i = j = k${{< /katex >}} is excluded.
  Therefore, with only one of the {{< katex >}}$n^2${{< /katex >}} variables dependent on the others, one can explicitly parameterize any such pivot-required matrix with {{< katex >}}$n^2 - 1${{< /katex >}} parameters, hence this space is of dimension {{< katex >}}$n^2 - 1${{< /katex >}}.
</details>

---

### Comments and future work

- Though this space is measure zero on the space of square matrices, it is still surprisingly large.
- In finite precision this space would have finite measure, due to there being a finite number of floating point numbers.
  I also suspect that the measure of matrices which induce breakdown in later iterations would be larger than the number of matrices which induce breakdown in the first iteration, due to the effects of rounding.
- The main result presented here implies the following statement: generic \\( n \times n \\) matrices have an unpivoted LU factorization in infinite precision.
- In practice, some sort of pivoting should almost always be used if the matrix does not have any known properties like being symmetric positive definite, etc.
  This is because pivoting improves the stability of computing such a factorization, even when it is not strictly required.


