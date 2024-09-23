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

However, the kinds of guarantees available for residuals are slightly weaker and more involved than is often presented in courses, due to complications introduced by different norms and arithmetic precisions.
Per {{< glink dest="https://www.scirp.org/html/2644.html" text="an article by Washizawa" color="y" >}} we have

- monotonic decrease of error in the A-norm in finite precision and exact arithmetic
  \\( \left( k > j \implies ||\mathbf{e}_k||_A \le ||\mathbf{e}_j||_A  \right) \\)
- almost monotonic decrease of error in the 2-norm in exact arithmetic
  \\( \left( \exist k > j : ||\mathbf{e}_k||_2 \le ||\mathbf{e}_j||_2  \right) \\)
- almost monotonic decrease of residual in the 2-norm in finite precision and exact arithmetic
  \\( \left( \exist k > j : ||\mathbf{r}_k||_2 \le ||\mathbf{r}_j||_2  \right) \\)

This final result means the 2-norm of the residual may provably do almost anything from one iteration to the next.
An old but lesser known result from the original [Hestenes and Stiefel paper](https://nvlpubs.nist.gov/nistpubs/jres/049/6/V49.N06.A08.pdf) provides the precise form of the statement: for any (almost monotonically decreasing) sequence of residual 2-norms there exist $\mathbf{A}$ and $\mathbf{b}$ which realize this sequence.
While there exist elaborately constructed systems realizing specific important patterns (see Section 2.7 of [this paper by Carson, Liesen, and Strakos](https://arxiv.org/pdf/2211.00953v3) and the citations within) I find it hard to grasp why the residual 2-norm might increase.
While grappling with this problem, I proved a small result that has helped me to understand just a bit better how the residual 2-norm can (at least temporarily) grow.
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
  Satisfying $||\mathbf{r}_1||_2 \ge ||\mathbf{r}_0||_2$ is equivalent to
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

Admittedly, this form of this statement does not immediately suggest a choice of $\mathbf{r}_0$ which might result in an increase.
It is also tempting to think that this inequality may never be satisfied: no eigenvectors of $\mathbf{A}$ satisfy the inequality, and attempting to lower bound $||\mathbf{Ar}_0||_2$ by
{{< katex >}} $\lambda_{min} ||\mathbf{r}_0||_2$ {{< /katex >}}
results in an inequality that is satisfied by no $\mathbf{r_0}$.
Indeed, finding an $\mathbf{r}_0$ to satisfy this inequality in general is tricky, so we will give sufficient condition just demonstrate that is it possible to satisfy.

First note that the inequality is independent of the scale of $||\mathbf{r}_0||$, so we instead work with the form
$||\mathbf{A} \hat{\mathbf{r}}_0||_2 \ge \sqrt{2} \hat{\mathbf{r}}_0^T \mathbf{A} \hat{\mathbf{r}}_0$, where $\hat{\mathbf{r}_0}$ is the direction of the residual.
Using the eigenvalue decomposition of $\mathbf{A} = \mathbf{Q} \mathbf{\Lambda} \mathbf{Q}^T$, we can simplify the above inequality to the equivalent form
$||\mathbf{\Lambda v}||_2 \geq \sqrt{2} \mathbf{v}^T \mathbf{\Lambda v}$, where
$\mathbf{v} = \mathbf{Q}^T \hat{\mathbf{r}}_0$.

Since $\mathbf{v}$ has unit 2-norm, let us write it as a linear combination of the first and last elementary vector of $\mathbb{R}^m$,
$\mathbf{v} = \epsilon \mathbf{e}_1 + \sqrt{1 - \epsilon^2} \mathbf{e}_m$;
this is equivalent to letting $\hat{\mathbf{r}}_0$ be a similar linear combination of the eigenvectors of the largest and smallest magnitude eigenvalues respectively.
Plugging in this choice of $\mathbf{v}$ the inequality becomes
$$
\epsilon^2 \lambda_1^2 + (1-\epsilon^2) \lambda_m^2
\geq
2 \left(\epsilon^2 \lambda_1 + (1-\epsilon^2) \lambda_m \right)^2
$$
or, dividing both sides by $\lambda_m^2$
$$
\epsilon^2 \kappa^2 + (1-\epsilon^2)
\geq
2 \left(\epsilon^2 \kappa + (1-\epsilon^2)\right)^2
$$
where $\kappa = \frac{\lambda_1}{\lambda_m}$ is the condition number of $\mathbf{A}$.

If $\kappa \geq 7$, one can verify that choosing $\epsilon = 0.5$ suffices.

So, to exhibit a system whose residual increases on the first iteration, it suffices for the matrix to satisfy
$\kappa(\mathbf{A}) \geq 7$
and then choose the residual to be the following linear combination of eigenvectors
$\mathbf{r}_0 = 0.5 \mathbf{v}_1 + \sqrt{0.75} \mathbf{v}_m$.

---

### Future work and comments

Comment 1: I'd like to read and understand the proof about realizing any residual 2-norm sequence.
It's amazing that this result was already in the original CG paper.

Comment 2: A [similar result about GMRES sequences](https://epubs.siam.org/doi/abs/10.1137/S0895479894275030), but this time a whole paper has been dedicated to it.
I am sure this is a more involved proof.

Comment 3: I think the Washizawa paper has some errors, see for example Equation 20, where it should be \\( || \overline{\mathbf{r}_i} - \\varepsilon_M(\mathbf{r}_i)|| \\) (one less bar).

Comment 4: I'd also like to discuss the common misconception about conjugate gradient and eigenvalue clusters brought up at 13:35 in [this wonderful talk by Zdenek Strakos](https://www.youtube.com/watch?v=jpBzZP2f5Wk).
