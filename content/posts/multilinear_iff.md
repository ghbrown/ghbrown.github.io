---
title: "Which tensor multilinear ranks can be realized?"
date: 2026-06-15T10:21:47-05:00
draft: false
tags: ['linear algebra']
---

# Necessary and sufficient conditions on tensor multilinear rank

---

The multilinear rank of a tensor $\mathcal{T} \in \mathbb{R}^{m \times n \times p}$
is defined as the 3-tuple

{{< katex >}}
$$
(\;
\text{rank}(\mathbf{T}_{(1)}),\;
\text{rank}(\mathbf{T}_{(2)}),\;
\text{rank}(\mathbf{T}_{(3)}) \;
)
$$
{{< /katex >}}

where $T_{(i)}$ is the mode $i$ flattening of $\mathcal{T}$, a matrix whose columns are the mode $i$ fibers.
Here the shapes of these unfoldings would be
- $m \times np$ for {{< katex >}}$\mathbf{T}_{(1)}${{< /katex >}},
- $n \times mp$ for {{< katex >}}$\mathbf{T}_{(2)}${{< /katex >}},
- $p \times mn$ for {{< katex >}}$\mathbf{T}_{(3)}${{< /katex >}}.

A reviewer asked a question I hadn't considered before:
what are the "realizable" multilinear ranks for a given tensor shape?
There are two directions here:
- (necessary) if a tensor $\mathcal{T}$ has multilinear rank $(a,b,c)$, relationships must $a$, $b$, and $c$ satisfy?
- (sufficient) what relationships, when satisfied by $a$, $b$, and $c$, guarantee the existence of $\mathcal{T}$ with multilinear rank $(a, b, c)$?

Trivially, one has the necessary condition $a \leq m$, $b \leq n$, and $c \leq p$ simply by the shapes of the unfoldings.
However, this is clearly not enough, since one can see that the multlinear rank $(0,0,c > 0)$ is not realizable (proof: one zero in multilinear rank means the original tensor is $\mathbf{0}$, which cannot be reshaped into a nonzero tensor).

With the context established, we're now in a position to state the relevant results.

**Theorem**:
There exists a tensor
$\mathcal{T} \in \mathbb{R}^{m \times n \times p}$ with multilinear rank $(a, b, c)$
if and only if
- $a \leq \min(m,bc)$,
- $b \leq \min(n,ac)$,
- $c \leq \min(p,ab)$.


<details>
<summary>Proof</summary>
This proof relies on the Tucker decomposition and an expression for the unfolding of tensors decomposed as such.

The Tucker decoposition represents a tensor as a contraction of a core tensor $\mathcal{G}$ of shape $q \times r \times s$ and three full-rank matrices
$\mathbf{A} \in \mathbb{R}^{m \times q}$,
$\mathbf{B} \in \mathbb{R}^{n \times r}$,
$\mathbf{C} \in \mathbb{R}^{p \times s}$,
with $q \leq m$, $r \leq n$, $s \leq p$.

It suffices to prove the desired results only for the first mode, as the others are analogous.
And given the trivial necessary condition from the introduction we only need to show (or assume) that $a \leq bc$. 

($\Rightarrow$)
If $\mathcal{T}$ has multilinear rank $(a, b, c)$ then it can be written as a Tucker decomposition with $q = a$, $r = b$, $s = c$.
The invertible factor matrices act as basis change matrices between $\mathcal{T}$ and $\mathcal{G}$, but this does not change any of the flattening ranks; that is the multilinear ranks of $\mathcal{T}$ and $\mathcal{G}$ are exactly equal.
Hence $a = \rank(\mathbf{T}_{(1)}) = \rank(\mathbf{G}_{(1)} \leq $\min(a,bc)$; the first equality holds by definition of multilinear rank, the second equality by the preceding change of basis argument, and the inequality follows from the dimensions of $\mathcal{G}_{(1)}$. Conclude by observing that $a \leq min(a,bc)$ implies $a \leq bc$.

($\Leftarrow$)
Assume $a \leq bc$.
If one chooses the $a \times b \times c$ core generically then
{{< katex >}}
$rank(\mathcal{G}_{(1)}) = \min(a,bc) = a$.
{{< /katex >}}
By choosing full-rank factor matrices $\mathbf{A}$, $\mathbf{B}$, and $\mathbf{C}$ one can change basis on this core to obtain a tensor
$\mathcal{T} \in \mathbb{R}^{m \times n \times p}$
whose flattening ranks are the same as those of $\mathcal{G}$.
Hence $rank(\mathcal{T}_{(1)}) = a$.
</details>

---

### Comments

- I am almost certain this result exists in literature, but I was unable to find any statements (let alone proofs).
- This result was obtained jointly with Joe Kileel.
- All results here generalize to the case of $d$ modes, *mutatis mutandis*.

