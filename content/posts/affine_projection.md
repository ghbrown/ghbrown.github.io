---
title: "Orthogonal projection onto an affine subspace"
date: 2024-07-29T02:19:38-06:00
draft: false
tags: ['linear algebra']
---

# Orthogonal projection onto an affine subspace

---

Projection onto a vector subspace is a common task in linear algebra courses.
Affine subspaces, sets of the form
{{< katex >}}$
\{ \mathbf{v} \in \mathbb{R}^m : \exists \mathbf{c} :
   \mathbf{v} = \mathbf{Ac} + \mathbf{b} \}
${{< /katex >}}
for fixed matrix $\mathbf{A}$ and vector $\mathbf{b}$,
also have well-defined projections.
However, it's difficult to find a direct proof for the projection of a point onto an affine space:
[example wordy proof 1](https://joeyonng.github.io/joeyonng-notebook/Linear%20Algebra/11_Orthogonal_and_Affine_Projection.html),
[example wordy proof 2](https://math.stackexchange.com/questions/3989922/orthogonal-projection-onto-affine-subspaces-formula).

Often I find proofs based mostly on words less than desirable, so let's steamroll this result with calculus and linear algebra.

**Lemma**: let
{{< katex >}}$
F = \{ \mathbf{v} \in \mathbb{R}^m : \exists \mathbf{c} \in \mathbf{R}^n :
        \mathbf{v} = \mathbf{Ac} + \mathbf{b} \}
${{< /katex >}}
be an affine subspace with $\mathbf{A} \in \mathbb{R}^{m \times n}$ and $\mathbf{b} \in \mathbb{R}^m$ fixed, with $m \geq n$ and $\mathbf{A}$ full rank.
Then for $\mathbf{w} \in \mathbb{R}^m$ the projection of $\mathbf{w}$ onto $F$ is given by
{{< katex >}}
$$
  \mathbf{P}_F(\mathbf{w})
  = \mathbf{P}_{\mathbf{A}}(\mathbf{w} - \mathbf{b}) + \mathbf{b}
$$
{{< /katex >}}
where $\mathbf{P}_F$ is the orthogonal projector onto affine subspace $F$ and
{{< katex >}}$
\mathbf{P}_{\mathbf{A}}
${{< /katex >}}
is the orthogonal projector onto linear subspace $\text{col}(\mathbf{A})$;
in terms of the pseudoinverse
{{< katex >}}$
\mathbf{P}_{\mathbf{A}} = \mathbf{A}\mathbf{A}^\dagger.
${{< /katex >}}

**Proof**:
By definition, the projection of $\mathbf{w}$ is
{{< katex >}}
$$
  \argmin_{\mathbf{v} \in F} ||\mathbf{w} - \mathbf{v}||_2 .
$$
{{< /katex >}}
Using the definition/parameterization of $A$ above we can equivalently solve
$$
  \min_{\mathbf{c} \in \mathbf{R}^n}
  ||\mathbf{w} - (\mathbf{Ac} + \mathbf{b})||^2_2
$$
for
{{< katex >}}$\mathbf{c}^*${{< /katex >}},
then write
{{< katex >}}$\mathbf{v}^* = \mathbf{Ac}^* + \mathbf{b}${{< /katex >}}
(since $\mathbf{A}$ is full rank, there is a unique correspondence between $\mathbf{v}$ and $\mathbf{c}$).
Note that we've squared the objective function, but this has no impact on the argmin.
Expanding the objective function of this second problem, we find
{{< katex >}}
$$
  \mathbf{w}^T \mathbf{w}
  - 2\mathbf{c}^T \mathbf{A}^T \mathbf{w}
  - 2 \mathbf{w}^T\mathbf{b}
  + \mathbf{c}^T \mathbf{A}^T \mathbf{A} \mathbf{c}
  + 2\mathbf{c}^T \mathbf{A}^T \mathbf{b}
  + \mathbf{b}^T \mathbf{b} \; .
$$
{{< /katex >}}
Enforcing the first order necessary condition for optimality (gradient with respect to $\mathbf{c}$ is $\mathbf{0}$) and simplifying, we find
{{< katex >}}
$$
  \mathbf{A}^T \mathbf{A} \mathbf{c}
  =
  \mathbf{A}^T (\mathbf{w} - \mathbf{b}) .
$$
{{< /katex >}}
Since $\mathbf{A}^T \mathbf{A}$ is invertible the optimal value of $\mathbf{c}$ is
$(\mathbf{A}^T \mathbf{A})^{-1} \mathbf{A}^T (\mathbf{w} - \mathbf{b})$.
Recalling the definition of pseudoinverse for a column vector-like matrix, the optimal value of $\mathbf{c}$ may be written
$\mathbf{A}^\dagger(\mathbf{w} - \mathbf{b})$.

This is the optimal solution to the second problem (over $\mathbf{c}$), but recall that we want the solution of the first problem (over $\mathbf{v}$).
Using the aforementioned relationship between the argmins of the two problems
({{< katex >}}$\mathbf{v}^* = \mathbf{Ac}^* + \mathbf{b}${{< /katex >}})
we find that the nearest point to $\mathbf{w}$ in the affine subspace $F$
(that is, {{< katex >}}$\mathbf{P}_F(\mathbf{w})${{< /katex >}}) is
{{< katex >}}
$$
  \mathbf{AA}^\dagger(\mathbf{w} - \mathbf{b}) + \mathbf{b}
$$
{{< /katex >}}
as stated.




