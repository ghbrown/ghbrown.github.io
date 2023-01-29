---
title: "Relationship between power iteration and gradient descent"
date: 2022-05-29T22:19:38-06:00
draft: false
tags: ['linear algebra']
---

# The relationship between power iteration and gradient descent

---

Although the majority of successful algorithms for the symmetric tensor eigenvalue problem use optimization techniques directly, there are a few notable algorithms that do not appear to be based on optimization.
Rather, they more closely resemble power iteration and shifted power iteration.

In {{< glink dest="/media/posts/pow_iter_grad_desc/The relationship between power iteration and gradient descent - G. H. Brown and E. V. Solomonik.pdf" text="this write up" color="y" >}} we show that this is a false dichotomy, and that these methods are equivalent to very simple and classical optimization methods.
This not only makes these methods easier to conceptualize, but aids in their characterization by permitting the use of established theory from optimization literature.

---
