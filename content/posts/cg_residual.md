---
title: "Behavior of conjugate gradient residual"
date: 2022-11-29T22:19:38-06:00
draft: false
katex: true
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

Examples with increasing residual 2-norms are not difficult to come by in practice, for an example see slide 21 of {{< glink dest="https://see.stanford.edu/materials/lsocoee364b/11-conj_grad_slides.pdf" text="these slides by Stephen Boyd" color="y" >}}.
However, I am unaware of any simple, tangible, and easily understandable examples where CG produces a temporarily increasing residual.
While attempting to find such a system I was able to prove something small about the behavior of the residual in the 2-norm for CG.
That is **the 2-norm of the residual always decreases on the first iteration**
$$
  ||\mathbf{r}_1||_2 \lt ||\mathbf{r}_0||_2
  \quad \forall \\; \mathbf{A}, \mathbf{b}, \mathbf{x}_0 .
$$

<details>
  <summary>Proof</summary>

  We wish to find a system whose residual does not decrease in the 2-norm on the first iteration, that is \\( ||\mathbf{r}_1||_2 \ge ||\mathbf{r}_0||_2 \\).
  
  Using the standard conjugate gradient iteration pseudocode (from Trefethen and Bau, for example) one gets
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
  
  Now, take advantage of the symmetric positive definiteness of \\( \mathbf{A} \\) to insert the eigendecomposition \\( \mathbf{A} = \mathbf{X}^T \mathbf{\Lambda X} \\) with unitary \\( \mathbf{X} \\) and diagonal, positive \\( \mathbf{\Lambda} \\).
  Further, define the new variable \\( \mathbf{v} = \mathbf{Xr}_0 = ||\mathbf{r}_0||_2 \hat{\mathbf{v}} \\) (where \\( ||\hat{\mathbf{v}}||_2 = 1 \\)) to simplify to the equivalent inequality
  $$
    ||\mathbf{\Lambda} \hat{\mathbf{v}}||_2
    \ge
    \sqrt{2} \hat{\mathbf{v}}^T \mathbf{\Lambda} \hat{\mathbf{v}} . \quad (*)
  $$
  Taking the negation of this statement, that is
  $$
    \sqrt{2} \hat{\mathbf{v}}^T \mathbf{\Lambda} \hat{\mathbf{v}}
    \gt
    ||\mathbf{\Lambda} \hat{\mathbf{v}}||_2  \quad \text{(negation)} ,
  $$
  and employing the Cauchy-Schwarz inequality for the left term (using \\( ||\hat{\mathbf{v}}||_2 = 1 \\)) one gets
  $$
    \sqrt{2} \hat{\mathbf{v}}^T \mathbf{\Lambda} \hat{\mathbf{v}}
    \ge
    \sqrt{2} ||\mathbf{\Lambda} \hat{\mathbf{v}}||_2
    \gt
    ||\mathbf{\Lambda} \hat{\mathbf{v}}||_2  \quad \text{(negation)} .
  $$
  Since the right of these two inequalities is true for arbitrary \\( \Lambda, \\; \hat{\mathbf{v}} \\) then
  $$
    \sqrt{2} \hat{\mathbf{v}}^T \mathbf{\Lambda} \hat{\mathbf{v}}
    \gt
    ||\mathbf{\Lambda} \hat{\mathbf{v}}||_2  \quad \text{(negation)}
  $$
  is also true for all \\( \Lambda, \\; \hat{\mathbf{v}} \\).
  
  This being the negation, we have proved \\( (*) \\) false generically, which is equivalent to
  $$
    ||\mathbf{r}_1||_2 \ge ||\mathbf{r}_0||_2 \\;\\; \text{false} \quad
    \forall \mathbf{A}, \\; \mathbf{b}, \\; \mathbf{x}_0 .
  $$
  In more direct language
  $$
    ||\mathbf{r}_1||_2 \le ||\mathbf{r}_0||_2 \quad
    \forall \mathbf{A}, \\; \mathbf{b}, \\; \mathbf{x}_0 ,
  $$
  completing the proof.
</details>

---

### Future work and comments

I'd like to determine if this result is also true in finite precision, and find an increasing system if it is false in finite precision.
Furthermore, since we have almost monotonic decrease of residual 2-norm in exact arithmetic, I'd like to determine whether the residual could increase on the second iteration.

Comment 1: I think the Washizawa paper has some errors, see for example Equation 20, where it should be \\( || \overline{\mathbf{r}_i} - \\varepsilon_M(\mathbf{r}_i)|| \\) (one less bar).

Comment 2: I'd like to post about this {{< glink dest="https://epubs.siam.org/doi/abs/10.1137/S0895479894275030" text="amazing result by Greenbaum" color="y" >}} at some point, perhaps in a separate post, and after I've had time to read it.

Comment 3: I'd also like to discuss the common misconception about conjugate gradient and eigenvalue clusters brought up at 13:35 in {{< glink dest="https://www.youtube.com/watch?v=jpBzZP2f5Wk" text="this wonderful talk by Zdenek Strakos" color="y" >}}.
