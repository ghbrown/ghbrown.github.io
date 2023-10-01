---
title: "A sufficient condition for non-negative solutions to non-negative linear systems"
date: 2023-09-29T19:19:38-06:00
draft: false
katex: true
tags: ['linear algebra']
---

# A sufficient condition for non-negative solutions to non-negative linear systems

---

Here we are concerned with "non-negative" linear systems, that is, linear systems where {{< katex >}}$\mathbf{A}, \mathbf{b} \geq \mathbf{0}${{< /katex >}} (elementwise).
In particular, we give a sufficient condition for non-negativity of the solution {{< katex >}}$\mathbf{x}${{< /katex >}} to {{< katex >}}$\mathbf{Ax} = \mathbf{b}${{< /katex >}}.

First, we discuss an intuition for the result.
The columns of {{< katex >}}$\mathbf{A}${{< /katex >}} form a linear cone; if a vector {{< katex >}}$\mathbf{c}${{< /katex >}} (a right hand side to the linear system) is known to lie in the cone, then one can find a "subcone" containing {{< katex >}}$\mathbf{c}${{< /katex >}}.
The sufficient condition essentially upper bounds the "radius" of this subcone.

<span class="themecolor">**Theorem**</span>: let {{< katex >}}$\mathbf{A} \in \mathbb{R}^{n \times n}${{< /katex >}} and {{< katex >}}$\mathbf{b}${{< /katex >}} be an invertible matrix and a vector, both non-negative.
Futher, let {{< katex >}}$\mathbf{A}${{< /katex >}} satisfy the following form of diagonal dominance by rows
{{< katex >}}
$$
  0 \leq \alpha \leq |a_{ii}| - \sum_{j} |a_{ij}| \quad \forall i .
$$
{{< /katex >}}

Then
{{< katex >}}
$$
\exists \mathbf{c} : \mathbf{Ay} = \mathbf{c}, \;
\mathbf{y} \geq \mathbf{0}, \;
\mathbf{c} \geq \mathbf{0}, \;
||\mathbf{b} - \mathbf{c}||_\infty \leq \min\left( \alpha \min(|\mathbf{y}|), \min(\mathbf{|c|}) \right) \\
\quad \Rightarrow \quad \exists \mathbf{x} : \mathbf{x} \geq \mathbf{0}, \mathbf{Ax}=b
$$
{{< /katex >}}

In particular, one could apply this theorem to the case when {{< katex >}}$\mathbf{c} = \mathbf{A}\mathbb{1}${{< /katex >}}, a point expected to be relatively deep in the interior of the cone (assuming all columns normalized).
Contrast with the case when {{< katex >}}$\mathbf{c} = \mathbf{Az}${{< /katex >}}, where {{< katex >}}$\mathbf{z}${{< /katex >}} has a 0 in or more elements, meaning {{< katex >}}$\mathbf{c}${{< /katex >}} would be on a face of the cone (and hence the above theorem would predict zero for the radius of the subcone).

<details>
  <summary>Proof</summary>
  We have {{< katex >}}$\mathbf{Ay}=\mathbf{c}${{< /katex >}}, now consider
  {{< katex >}}$\mathbf{A}(\mathbf{y} + \delta\mathbf{y}) = \mathbf{c} + \delta\mathbf{c}${{< /katex >}} and define {{< katex >}}$\mathbf{x} = \mathbf{y} + \delta\mathbf{y}${{< /katex >}} and {{< katex >}}$\mathbf{b} = \mathbf{c} + \delta\mathbf{c}${{< /katex >}}.
  We will show that given the assumptions above {{< katex >}}$\mathbf{x},\mathbf{b} \geq \mathbf{0}${{< /katex >}}.
  
  First, we consider {{< katex >}}$\mathbf{b}${{< /katex >}}.
  Since {{< katex >}}$||\mathbf{b} - \mathbf{c}||_\infty = ||\delta\mathbf{c}||_\infty \leq \min(|\mathbf{c}|)${{< /katex >}} then {{< katex >}}$\mathbf{b} = \mathbf{c} + \delta\mathbf{c} \geq \mathbf{0}${{< /katex >}}.
  
  Now, we consider {{< katex >}}$\mathbf{x}${{< /katex >}}.
  Note that {{< katex >}}$\mathbf{A} \delta\mathbf{y} = \delta\mathbf{c} ${{< /katex >}}, or equivalently {{< katex >}}$\delta\mathbf{y} = \mathbf{A}^{-1} \delta\mathbf{c} ${{< /katex >}}.
  By norm submultiplicativity, 
  {{< katex >}}$||\delta\mathbf{y}||_\infty \leq ||\mathbf{A}^{-1}||_\infty ||\delta\mathbf{c}||_\infty${{< /katex >}}.
  Now since
  {{< katex >}}$||\mathbf{b} - \mathbf{c}||_\infty = ||\delta\mathbf{c}||_\infty \leq \alpha\min(|\mathbf{y}|)${{< /katex >}},
  we have
  {{< katex >}}$||\delta\mathbf{y}||_\infty \leq \alpha ||\mathbf{A}^{-1}||_\infty \min(|\mathbf{y}|)${{< /katex >}}.
  Finally, via {{< glink dest="https://www.sciencedirect.com/science/article/pii/0024379575901123" text="Varah's upper bound" color="y" >}} for the {{< katex >}}$\infty${{< /katex >}}-norm of the inverse of a row diagonal dominant matrix we have {{< katex >}}$\alpha ||\mathbf{A}^{-1}||_\infty \leq 1${{< /katex >}}.
  Therefore, {{< katex >}}$||\delta\mathbf{y}||_\infty \leq \min(|\mathbf{y}|)${{< /katex >}}, so $\mathbf{x} = \mathbf{y} + \delta\mathbf{y} \geq \mathbf{0}$.
</details>

---

### Comments

Comment 1: There exist other upper bounds for the {{< katex >}}$\infty${{< /katex >}}-norm of the inverse of a diagonally dominant matrix.
{{< glink dest="https://math.stackexchange.com/questions/1191503/conditioning-of-triangular-matrices" text="Specifically" color="y" >}}, if {{< katex >}}$\mathbf{A}${{< /katex >}} instead satisfies {{< katex >}}$|a_{ii}| \geq \gamma \sum_{i \neq j} |a_{ij}| \; \forall i${{< /katex >}}, then {{< katex >}}$||\mathbf{A}^{-1}||_\infty \leq \frac{\gamma}{\gamma-1} \frac{1}{\min_i |a_{ii}|}${{< /katex >}}.

Comment 2: The proof does not actually require {{< katex >}}$\mathbf{A} \geq 0${{< /katex >}}, so perhaps this assumption could strengthen the conclusion.
Likewise, for a symmetry assumption if one is added.

---
