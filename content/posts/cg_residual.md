---
title: "Behavior of conjugate gradient residual"
date: 2024-06-15T02:19:38-06:00
draft: false
tags: ['linear algebra']
---

# Behavior of the conjugate gradient residual

---

An often stressed property of the conjugate gradient method (CG) for solving linear systems is the monotonic decrease in the A-norm of the error.
When CG is applied in practice the exact solution is unknown and the error cannot be computed or tracked, so the residual or relative residual is used instead.

However, the kinds of guarantees available for residuals are slightly weaker and more involved than is often presented, due to complications introduced by different norms and arithmetic precisions.
Per {{< glink dest="https://www.scirp.org/html/2644.html" text="an article by Washizawa" color="y" >}} we have

- monotonic decrease of error in the A-norm in finite precision and exact arithmetic
  \\( \left( k > j \implies ||\mathbf{e}_k||_A \le ||\mathbf{e}_j||_A  \right) \\)
- almost monotonic decrease of error in the 2-norm in exact arithmetic
  \\( \left( \exist k > j : ||\mathbf{e}_k||_2 \le ||\mathbf{e}_j||_2  \right) \\)
- almost monotonic decrease of residual in the 2-norm in finite precision and exact arithmetic
  \\( \left( \exist k > j : ||\mathbf{r}_k||_2 \le ||\mathbf{r}_j||_2  \right) \\)

However, while the errors decrease the 2-norm of the residual may provably do almost anything.
An old but lesser known result from the original [Hestenes and Stiefel paper](https://nvlpubs.nist.gov/nistpubs/jres/049/6/V49.N06.A08.pdf) provides the precise form of the statement: for any (almost monotonically decreasing) sequence of residual 2-norms there exist $\mathbf{A}$ and $\mathbf{b}$ which realize this sequence.
While there exist elaborately constructed systems which realize specific important patterns (see Section 2.7 of [this paper by Carson, Liesen, and Strakos](https://arxiv.org/pdf/2211.00953v3) and the citations within) I find it hard to grasp what precisely is causing the residual 2-norm to increase.
While grapplig with this problem, I proved a small result that has helped me to understand just a bit better how the residual 2-norm can (at least temporarily) grow.
**The residual after one iteration of CG is larger than the initial residual if and only if**
$$
  ||\mathbf{r}_0||_2 ||\mathbf{A}\mathbf{r}_0||_2
  \ge
  \sqrt{2} \mathbf{r}_0^T \mathbf{A} \mathbf{r}_0 .
$$

<details>
  <summary>Proof</summary>
  Using the standard conjugate gradient iteration pseudocode (from Trefethen and Bau, for example) the residual after 0 and 1 iterations of CG are
  $$
    \mathbf{r}_0 = \mathbf{A}\mathbf{x}_0 - \mathbf{b}, \quad\quad
    \mathbf{r}_1 = \mathbf{r}_0 -
      \frac{\mathbf{r}_0^T\mathbf{r}_0}{\mathbf{r}_0^T \mathbf{A} \mathbf{r}_0}
      \mathbf{A} \mathbf{r}_0 .
  $$
  Satisfying \\( ||\mathbf{r}_1||_2 \ge ||\mathbf{r}_0||_2 \\) is equivalent to
  $$
    \left( \mathbf{r}_0 -
      \frac{\mathbf{r}_0^T\mathbf{r}_0}{\mathbf{r}_0^T \mathbf{A} \mathbf{r}_0}
      \mathbf{A} \mathbf{r}_0 \right)^T
    \left( \mathbf{r}_0 -
      \frac{\mathbf{r}_0^T\mathbf{r}_0}{\mathbf{r}_0^T \mathbf{A} \mathbf{r}_0}
      \mathbf{A} \mathbf{r}_0 \right)
    \ge
    \mathbf{r}_0^T \mathbf{r}_0
  $$
  or in a more simplified form in terms of normed quantities
  $$
    \frac{||\mathbf{r}_0||_2^4}{\left(\mathbf{r}_0^T \mathbf{A} \mathbf{r}_0\right)^2}
    ||\mathbf{A}\mathbf{r}_0||_2^2 - 2 ||\mathbf{r}_0||_2^2 \ge 0 .
  $$
  Further simplification yields the equivalent statement
  $$
    ||\mathbf{r}_0||_2 ||\mathbf{A}\mathbf{r}_0||_2
    \ge
    \sqrt{2} \mathbf{r}_0^T \mathbf{A} \mathbf{r}_0.
  $$
</details>

Admittedly, this form of this statement does not immediately suggest a choice of $\mathbf{r}_0$ might result in an increase.
However, let's try to understand one such case by picking apart the expression.

Since $\mathbf{A}$ is symmetric and positive definite, it may be written as $\mathbf{A} = \mathbf{Y}^T \mathbf{Y}$.
Letting $\mathbf{v} = \mathbf{Y} \mathbf{r}_0$ and rewriting the expression we find
$$
  ||\mathbf{r}_0||_2 ||\mathbf{X}^T \mathbf{v}||_2
  \ge
  \sqrt{2} ||\mathbf{v}||_2^2 .
$$
Exploiting submultiplicativity of the norm on the left we find
{{< katex >}}
$$
  ||\mathbf{X}||_2 ||\mathbf{r}_0||_2
  \ge
  \sqrt{2} ||\mathbf{v}||_2
  =
  \sqrt{2} ||\mathbf{X} \mathbf{r}_0||_2 .
$$
{{< /katex >}}
So, to realize an increasing residual 2-norm after 1 iteration it is sufficient to satisfy
$||\mathbf{X}||_2 ||\mathbf{r}_0||_2 \ge \sqrt{2} ||\mathbf{X} \mathbf{r}_0||_2$.
This can easily occur if $r_0$ is aligned with eigenvectors of $\mathbf{X}$ (equivalently $\mathbf{A}$) which have relatively small eigenvalues.
Though in a very restricted case (the first iteration), I find this to be a digestible condition leading to a temporarily increasing 2-norm.

---

### Future work and comments

Comment 1: I'd like to read and understand the proof about realizing any residual 2-norm sequence.
It's amazing that this result was already in the original CG paper.

Comment 2: A [similar result about GMRES sequences](https://epubs.siam.org/doi/abs/10.1137/S0895479894275030), but this time a whole paper has been dedicated to it.
I am sure this is a more involved proof.

Comment 3: I think the Washizawa paper has some errors, see for example Equation 20, where it should be \\( || \overline{\mathbf{r}_i} - \\varepsilon_M(\mathbf{r}_i)|| \\) (one less bar).

Comment 4: I'd also like to discuss the common misconception about conjugate gradient and eigenvalue clusters brought up at 13:35 in {{< glink dest="https://www.youtube.com/watch?v=jpBzZP2f5Wk" text="this wonderful talk by Zdenek Strakos" color="y" >}}.
