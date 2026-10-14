---
title: "A sufficient condition for non-negative solutions to non-negative linear systems"
date: 2023-09-29T19:19:38-06:00
draft: false
katex: true
tags: ['linear algebra']
---

# A sufficient condition for non-negative solutions to non-negative linear systems

---

Here we are concerned with "non-negative" linear systems, that is, linear systems where $\mathbf{A}, \mathbf{b} \geq \mathbf{0}$ (elementwise).
In particular, we give a sufficient condition for non-negativity of the solution $\mathbf{x}$ to $\mathbf{Ax} = \mathbf{b}$.

First, we discuss an intuition for the result.
The possible solutions of a linear system in $\mathbf{A}$ form a linear cone; if a vector $\mathbf{c}$ (a right hand side to the linear system) is known to lie in the cone, then one can find a "subcone" containing $\mathbf{c}$.
The sufficient condition essentially upper bounds the "radius" of this subcone.

<span class="themecolor">**Theorem**</span>: let $\mathbf{A} \in \mathbb{R}^{n \times n}$ and $\mathbf{b} \in \mathbb{R}^n$ be an invertible matrix and a vector, both non-negative.
Further, let $\mathbf{A}$ satisfy the following form of diagonal dominance by rows

$$
  0 \leq \alpha \leq |a_{ii}| - \sum_{j} |a_{ij}| \quad \forall i .
$$


Then

$$
\begin{aligned}
&\exists \mathbf{b}, \mathbf{c} \; : \; \mathbf{Ay} = \mathbf{c}, \;\;
\mathbf{b}, \mathbf{c}, \mathbf{y} \geq \mathbf{0} \; , \;\; \\
&\quad ||\mathbf{b} - \mathbf{c}||_\infty \leq \min\left( \alpha \min(|\mathbf{y}|), \min(\mathbf{|c|}) \right)
\end{aligned} \\
\Downarrow \\
\exists \mathbf{x} \; : \; \mathbf{x} \geq \mathbf{0}, \;\; \mathbf{Ax}=\mathbf{b} \; .
$$


In particular, one could apply this theorem to the case when $\mathbf{c} = \mathbf{A}\mathbf{1}$, a point expected to be relatively deep in the interior of the cone (assuming all columns normalized).
Contrast with the case when $\mathbf{c} = \mathbf{Az}$, where $\mathbf{z}$ has a 0 in one or more elements, meaning $\mathbf{c}$ would be on a face of the cone (and hence the above theorem would predict zero for the radius of the subcone).

{{< details summary="Proof" >}}
We have $\mathbf{Ay}=\mathbf{c}$, now consider
$\mathbf{A}(\mathbf{y} + \delta\mathbf{y}) = \mathbf{c} + \delta\mathbf{c}$ and define $\mathbf{x} = \mathbf{y} + \delta\mathbf{y}$ and $\mathbf{b} = \mathbf{c} + \delta\mathbf{c}$.
We will show that given the assumptions above $\mathbf{x},\mathbf{b} \geq \mathbf{0}$.


First, we consider $\mathbf{b}$.
Since
$||\mathbf{b} - \mathbf{c}||_\infty = ||\delta\mathbf{c}||_\infty \leq \min(\mathbf{c})$
then
$\mathbf{b} = \mathbf{c} + \delta\mathbf{c} \geq \mathbf{0}$.

Now, we consider $\mathbf{x}$.
Note that
$\mathbf{A} \delta\mathbf{y} = \delta\mathbf{c} $,
or equivalently
$\delta\mathbf{y} = \mathbf{A}^{-1} \delta\mathbf{c}$.
By norm submultiplicativity,
$||\delta\mathbf{y}||_\infty \leq ||\mathbf{A}^{-1}||_\infty ||\delta\mathbf{c}||_\infty$.
Now since
$||\mathbf{b} - \mathbf{c}||_\infty = ||\delta\mathbf{c}||_\infty \leq \alpha\min(\mathbf{y})$,
we have
$||\delta\mathbf{y}||_\infty \leq \alpha ||\mathbf{A}^{-1}||_\infty \min(\mathbf{y})$.
Finally, via [Varah's upper bound](https://www.sciencedirect.com/science/article/pii/0024379575901123) for the
$\infty$-norm of the inverse of a row diagonal dominant matrix we have
$\alpha ||\mathbf{A}^{-1}||_\infty \leq 1$.
Therefore,
$||\delta\mathbf{y}||_\infty \leq \min(|\mathbf{y}|)$,
so
$\mathbf{x} = \mathbf{y} + \delta\mathbf{y} \geq \mathbf{0}$.
{{< /details >}}

---

### Comments

Comment 1: There exist other upper bounds for the $\infty$-norm of the inverse of a diagonally dominant matrix.
[Specifically](https://math.stackexchange.com/questions/1191503/conditioning-of-triangular-matrices), if
$\mathbf{A}$ instead satisfies
$|a_{ii}| \geq \gamma \sum_{i \neq j} |a_{ij}| \; \forall i$,
then
$||\mathbf{A}^{-1}||_\infty \leq \frac{\gamma}{\gamma-1} \frac{1}{\min_i |a_{ii}|}$.

Comment 2: The proof does not actually require $\mathbf{A} \geq 0$, so perhaps this assumption could strengthen the conclusion.
Likewise, for a symmetry assumption if one is added.

---
