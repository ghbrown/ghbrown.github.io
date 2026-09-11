---
title: "Complexity of symbolic QR decomposition"
date: 2026-09-10T02:19:38-06:00
draft: false
tags: ['linear algebra']
---

# Complexity of symbolic QR factorization

---

Suppose the matrix $\mathbf{A} \in \mathbb{R}^{m \times n}$ is populated by real variables, that is every entry is a unique variable which can assume real values.
What is the complexity of computing the symbolic QR decomposition of this matrix?
In particular, how "complicated" are the symbolic expressions in the final decomposition?

We show that a symbolic version of the Householder algorithm results in an upper triangular factor $\mathbf{R}$ which has exponentially or factorially large expressions (and so space).

This is of course much more costly than the usual setting of numerical linear algebra where $\mathbf{A}$ is populated by real floating points values, in which case the Householder algorithm computes the upper triangular factor in $O(m n^2)$ time and stores it in $O(mn)$ space, assuming $m \geq n$.

---

## Complexity Model

The complexity model we use for expressions is the number of operators ($+, -, \times, \div, \sqrt{\cdot}$, etc.).
This is (up to constants) the cost of evaluating the expression after plugging in numerical values, as well as the number of nodes in the expression tree.

If $E$ is a symbolic expression, we denote the cost of evaluations (same as number of operators) of $E$ by $d(E)$.
For vectors and matrices, let $d(\cdot)$ represent the cost of evaluating every entry, so simply the sum over all entries.
We give some simple results about this measure of cost, focusing on upper bounds.

**Binary operations**: $d(x \circ y) = d(x) + d(y) + 1$, where
{{< katex >}}$
    \circ \in \{ +, -, \times, \div \}
${{< /katex >}}

**Unary operations**: $d(\sqrt{x}) = d(x) + 1$

(the rest follow almost immediately from these two)

**Vector addition**: for symbolic $\mathbf{u}$, $\mathbf{v}$ of length $m$
{{< katex >}}
$$
\begin{aligned}
d(\mathbf{u} + \mathbf{v})
&= \sum_i d(u_i + v_i) \\
&= \sum_i d(u_i) + d(v_i) + 1 \\
&= d(\mathbf{u}) + d(\mathbf{v}) + m \\
\end{aligned}
$$
{{< /katex >}}


**Scalar times vector**: for symbolic scalar $\gamma$ and symbolic $\mathbf{x}$ of length $m$

{{< katex >}}
$$
\begin{aligned}
  d(\gamma \mathbf{x}) &= \sum_i d(\gamma x_i) \\
 &= \sum_i d(\gamma) +d(x_i) + 1 \\
 &= d(\mathbf{x}) + m(d(\gamma) + 1)

\end{aligned}
$$
{{< /katex >}}

**Inner product**: for symbolic $\mathbf{u}$, $\mathbf{v}$ of length $m$

{{< katex >}}
$$
\begin{aligned}
d(\mathbf{u}^T \mathbf{v})
&= d(\sum_i u_i v_i) \\
&= \sum_{i=1}^m (d(u_i) + d(v_i) + 1) + m - 1 \\
&= \sum_{i=1}^m d(u_i) + \sum_{i=1}^m d(v_i) + 2m - 1 \\
&= d(\mathbf{v}) + d(\mathbf{u}) + 2m - 1 \\
\end{aligned}
$$
{{< /katex >}}

**2-norm**: for symbolic $\mathbf{x}$ of length $m$,
{{< katex >}}
$$
\begin{aligned}
d(||\mathbf{x}||_2)
&= d(\sqrt{\mathbf{x}^T \mathbf{x}}) \\
&= d(\mathbf{x}^T \mathbf{x}) + 1 \\
&= 2 (d(\mathbf{x}) + m)
\end{aligned}
$$
{{< /katex >}}


<!-- Ended up not needing this result on symbolic matrix multiplication -->
<!-- **Matrix multiplication**: for symbolic $\mathbf{A}$ of size $m \times n$ and $\mathbf{B}$ of size $n \times p$, for $\mathbf{C} \coloneqq \mathbf{AB}$ -->
<!-- {{< katex >}} -->
<!-- $$ -->
<!-- \begin{aligned} -->
<!-- d(\mathbf{C}) -->
<!-- = \sum_{i=1}^m \sum_{j=1}^p d(c_{ij}) -->
<!-- &= \sum_{i=1}^m \sum_{j=1}^p d(\mathbf{a}_{i:}^T \mathbf{b}_{:j}) \\ -->
<!-- &= \sum_{i=1}^m \sum_{j=1}^p \left( d(\mathbf{a}_{i:}) + d(\mathbf{b}_{:j}) + 2n - 1 \right) \\ -->
<!-- &= p d(\mathbf{A}) + m d(\mathbf{B}) + mp (2n - 1) -->
<!-- \end{aligned} -->
<!-- $$ -->
<!-- {{< /katex >}} -->

---

## Refresher on Householder QR

Householder QR computes the upper triangular matrix
$\mathbf{R} \in \mathbb{R}^{m \times n}$
by applying $n$ orthogonal matrices

{{< katex >}}
$$
\mathbf{R} = \mathbf{H}_n \mathbf{H}_{n-1} \dots \mathbf{H}_{1} \mathbf{A},
$$
{{< /katex >}}

Each matrix
{{< katex >}}$
\mathbf{H}_i \in \mathbb{R}^{m \times m}
${{< /katex >}}
is orthogonal, hence $\prod_{i=n}^{1} \mathbf{H}_i$ is orthogonal and equals $\mathbf{Q}^T$.

The matrix $\mathbf{H}_i$ is called a [Householder reflector](https://en.wikipedia.org/wiki/Householder_transformation) and is designed to introduce zeros below the diagonal of the $i$th column of whichever matrix it is applied to.
Applying $n$ such matrices in the correct order brings $\mathbf{A}$ to an upper diagonal matrix.
What makes Householder QR work is that this introduction of zeros can done in a right-looking manner: the zeros introduced by $\mathbf{H}_i$ in column $i$ are not spoiled by the application of
{{< katex >}}$
\mathbf{H}_{i+1}
${{< /katex >}}
which introduces zeros in column $i+1$ to the right.

This right-looking nature is encoded in the structure of the Householder reflectors, which have identity blocks that grow with $i$,

{{< katex >}}
$$
\mathbf{H}_i =
\begin{bmatrix}
  \mathbf{I}_{i-1}  & \mathbf{0} \\
  \mathbf{0}        & \mathbf{I}_{m - i + 1} - 2 \mathbf{v}_i \mathbf{v}_i^T
\end{bmatrix}
$$
{{< /katex >}}

where $\mathbf{I}_p$ is the $p \times p$ identity and
$\mathbf{v}_i \in \mathbb{R}^{m - i + 1}$ is given by

{{< katex >}}
$$
\mathbf{v}_i =
\pm
\frac{\mathbf{x}_i - \alpha \mathbf{e}_1}
{||\mathbf{x}_i - \alpha \mathbf{e}_1||_2},
\quad
\alpha = \pm || \mathbf{x} ||_2 .
$$
{{< /katex >}}

The vector $\mathbf{x}_i$ is a partial column of the "work in progress" matrix
{{< katex >}}$
  \mathbf{W}_i = \mathbf{H}_{i-1} ... \mathbf{H}_{1} \mathbf{A} ;
${{< /katex >}}
in particular,
{{< katex >}}$
  \mathbf{x}_i = (\mathbf{W}_i)_{i:n,i} .
${{< /katex >}}

---

## Proof of complexity

In this section we prove that the complexity of the resulting upper triangular factor $\mathbf{R}$ is

{{< katex >}}
$$
\begin{aligned}
&O(mn \cdot \frac{m!}{(m-n)!}), \; \text{when $m > n$} \\
&O(mn \cdot m!), \hspace{3.1em}\text{when $m \leq n$} \; .
\end{aligned}
$$
{{< /katex >}}

We begin by analyzing the complexity of a vector which has been transformed by a Householder reflector.
In particular, it will be most useful to get the complexity of an element of this transformed vector.

**Lemma 1**: If $\mathbf{H}_i$ is the $i$th Householder reflector (parameterized by $\mathbf{x} \in \mathbb{R}^{m - i + 1}$),
then for arbitrary $\mathbf{b}$ an element of the trailing block of
{{< katex >}}$
    \mathbf{H}_i \begin{bmatrix}\times \\ \mathbf{b}\end{bmatrix}
${{< /katex >}}
has complexity
{{< katex >}}
$$
O\left(\; d(\mathbf{b}) + d(\mathbf{x}) + (m-i+1) \;\right) .
$$
{{< /katex >}}

<details>
  <summary>Proof</summary>
It suffices to focus on the trailing subvector of size $m-i+1$ since the leading identity block can be implicitly applied using zero operations.
Within the trailing subvector, we focus on computing the complexity of the first element, which will have slightly larger complexity than all other elements and hence provides a complexity upper bound.
We therefore focus on the cost
$d(b_1 - 2 v_1 \mathbf{v}^T \mathbf{b})$, and
temporarily denote $\text{dim}(\mathbf{b})=b$;
$b = m - i + 1$ will be inserted later.

{{< katex >}}
$$
\begin{aligned}
d(b_1 - 2 \mathbf{v}^T \mathbf{b} v_1)
&=
d\left(b_1 - \frac{2(\mathbf{x} - \alpha \mathbf{e}_1)^T \mathbf{b}
}{||\mathbf{x} - \alpha \mathbf{e}_1||_2^2} (x_1 - \alpha) \right) \\
&= d(b_1) + d(x_1 - \alpha) + c + 2 \\
&= d(b_1) + d(x_1) + d(\alpha) + c + 3
\end{aligned}
$$
{{< /katex >}}

where

{{< katex >}}
$$
\begin{aligned}
c &\coloneqq
d\left( \frac{2(\mathbf{x} - \alpha \mathbf{e}_1)^T \mathbf{b}
}{||\mathbf{x} - \alpha \mathbf{e}_1||_2^2} \right) \\
&= d((\mathbf{x} - \alpha \mathbf{e}_1)^T \mathbf{b})
+ d(||\mathbf{x} - \alpha \mathbf{e}_1||_2^2) + 2 \\
&= 3 d(\mathbf{x} - \alpha \mathbf{e}_1) + d(\mathbf{b}) + 4b \\
&= 3 \left(d(\mathbf{x}) + d(\alpha) + 1\right) + d(\mathbf{b}) + 4b
\end{aligned}
$$
{{< /katex >}}
and
$d(\alpha) = d(\pm ||\mathbf{x}||_2) = 2(d(\mathbf{x}) + b) + 1$.

Inserting $d(\alpha)$ into $c$ and
$d(b_1 - 2 \mathbf{v}^T \mathbf{b} v_1)$
we obtain
{{< katex >}}
$$
\begin{aligned}
c &= 9 d(\mathbf{x}) + d(\mathbf{b}) + 10b + 3 \\
d(b_1 - 2 \mathbf{v}^T \mathbf{b} v_1) &=
d(b_1) + d(x_1) + 2d(\mathbf{x}) + 2b + c + 4,
\end{aligned}
$$
{{< /katex >}}

and combining we get the element's complexity as
{{< katex >}}
$$
d(b_1) + d(x_1) + d(\mathbf{b}) + 11d(\mathbf{x}) + 12b  + 7 \; .
$$
{{< /katex >}}

Inserting $b = m-i+1$ we have
{{< katex >}}
$$
d(b_1) + d(v_1) + d(\mathbf{b}) + 11d(\mathbf{x}) + 12(m-i+1) + 7
$$
{{< /katex >}}
which is clearly
$O\left(d(\mathbf{b}) + d(\mathbf{x}) + (m-i+1) \right)$ .
</details>

Recall that after step $i$ of the Householder QR algorithm, the row $i$ of the working matrix is no longer altered.
This means that its complexity also stops increasing.

Therefore, the total complexity of the matrix $R$ (over all upper triangular elements) is given by
$\sum_{i=1}^{min(m,n)} (n - i + 1) K_i$,
where the first term of a summand accounts for the number of elements in the $i$th row, while $K_i$ is the complexity of the elements in the $i$th row after $i$ Householder steps.
Critically, note that $K_i$ is also the element complexity of the trailing
$(m-i+1) \times (m-i+1)$
submatrix of $\mathbf{W}_i$.
As an example, $K_1$ can easily be computed using Lemma 1 as $O(m)$ since $d(\mathbf{b})$ and $d(\mathbf{x})$ are both $O(m)$ (they are simply unaltered entries of the input $\mathbf{A}$).
The following lemma shows that the asymptotic order of $K_i$ is factorial in $m$.

**Lemma 2**: $K_i = O(\frac{m!}{(m-i)!})$.

<details>
  <summary>Proof</summary>
By induction, note that $K_i = O(\frac{m!}{(m-i)!})$.
For the base case, $K_1 = m$ since then
$d(\mathbf{x})$ and $d(\mathbf{b})$ are full columns of $\mathbf{A}$, which have complexity $m$ (no operations have been performed on them yet).
Assuming $K_{i-1} = \frac{m!}{(m-i+1)!}$,
{{< katex >}}$
    \mathbf{H}_i
${{< /katex >}}
will be constructed using a vector $\mathbf{x}$ of length $m-i+1$ taken from the trailing submatrix of
{{< katex >}}$
    \mathbf{W}_{i-1}.
${{< /katex >}}
The complexity of this the vector is $K_{i-1} (m-i+1)$,
and all vectors it will be applied to (other columns of the trailing submatrix of $\mathbf{W}_{i}$).
By Lemma 2 the, the element complexity of the output vectors is
{{< katex >}}
$$
\begin{aligned}
&O(2K_{i-1} (m-i+1) + (m-i+1)) \\
&\quad = O(2\frac{m!}{(m-i+1)!} (m-i+1) + (m-i+1)) \\
&\quad = O(2\frac{m!}{(m-i)!} + (m-i+1))
\end{aligned}
$$
{{< /katex >}}
and clearly this is of factorial complexity asymptotically, proving the claim for $K_i$.
</details>

Therefore, the overall complexity of $\mathbf{R}$ is
$O(mn \cdot K_{\min(m,n)})$, since there are at most $mn$ elements of which have element complexity at most $K_{\min(m,n)}$, which completes the proof of the claimed complexity.
Of course this is somewhat of an overestimate, as the earlier rows of $\mathbf{R}$ have lower complexity than the final row.
For example, let us compare the cost of the whole first row of $\mathbf{R}$ and the cost of the last element.
The first row has $n$ elements each of complexity $O(m)$.
Hence the overall cost is $O(mn)$; interestingly, this is also the cost of storing the entire matrix $\mathbf{A}$.
Meanwhile the last element of $\mathbf{R}$ costs $O\left(\frac{m!}{(m-n)!}\right)$, assuming $m > n$, which is much larger than the first row's cost for even modest $m$, $n$.

---

## Comments

- This is only an upper bound, and only valid for a single algorithm.
  Other algorithms or analyses could perhaps sharpen the bound.
- Lower bounds are of course also interesting, though I haven't thought about how to attack them.
- It would be interesting to investigate the effects of fast matrix multiplication on symbolic complexity of linear algebra algorithms.
  For example, algorithms like Strassen are known to reduce the asymptotic work of computing a matrix product, but do they lead to lower or higher expression complexities symbolically?
---

## Acknowledgements

Part of this work was completed at the University of Heidelberg with the support of the [Krishnanunni CG](https://cgkrishnanunni.github.io/) Visiting Fellows Program.

---
