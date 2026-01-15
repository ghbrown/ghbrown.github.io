---
title: "A mediocre algorithm to exhaust k-d tree"
date: 2026-01-14T00:19:38-06:00
draft: false
tags: ['computer science']
---

# A mediocre algorithm to exhaust k-d tree

Or perhaps a better title:
"Finding all unique nearest neighbors in $O(n^{3/2} \log(n))$ with a standard k-d tree"

---

Suppose you wish to query a point cloud of $n$ points for a nearest point a total of $n$ times, and that no point can be selected twice.

That is you must return a sequence of $n$ nearest points (using each one only once), and the answer for each query must be the closest out of all the remaining points.

We will show that we can do this faster than the naive quadratic, without having to *implement* any complicated data structures (we'll only have to wrap them).

---
### Two bad algorithms

1. Put all points in a linked list.
   For every query perform a linear search on the linked list and delete the nearest point.
   The cost is $O(n^2)$.

2. Rebuild a k-d tree after every query.
   The cost is
{{< katex >}}
$$
  \sum_{i=0}^{n-1} (n-i) \log(n-i) + \log(n-i)
$$
{{< /katex >}}
which at $O(n^2 \log(n))$.

### The mediocre algorithm
Algorithm 2 above is the worse of the two, but there is at least a knob to tune: how often the tree is rebuilt.
For example, what if we rebuilt the tree after every 2 queries (instead of every query)?
We'll then we'd save about half on the cost of rebuilds!
That's great, but there's no free lunch: on the second query of each "round", we have to request the **2 nearest neighbors** of the query point (just in case the first nearest point from that round is again the closest point).

Heck, why stop at 2? What if we rebuilt every $b$ points?
Let's write down the cost of this strategy for general $b$
{{< katex >}}
$$
  \sum_{i=0}^{\frac{n}{b}} \left[
    (n-ib) \log(n-ib) +
    \sum_{j=1}^b j \log(n-ib)
  \right].
$$
{{< /katex >}}
The term $(n-ib) \log(n-ib)$ is the cost of building a k-d tree with $n-ib$ points; as the rounds progress ($i$ increases) this cost shrinks.
The term $\sum_{j=1}^b j \log(n-ib)$ captures the cost of the $b$ queries in the $i$th round; the first query for a single point, the second for 2 points, and so on.
We assume that the cost of querying a k-d tree for the $p$ nearest neighbors of a given input point is $p \log($#points in tree$)$.

Two questions remain:
- What is the optimal choice of $b$?
- Does this optimal choice give an algorithm faster than $O(n^2)$

The optimal choice of $b$ (by means of computing the cost for a variety of $n$ and every possible $k$), is $\sqrt{n}$.
This is quite a satisfying answer, and allows us to answer the second question in the affirmative.
The asymptotic cost of the periodic rebuild strategy becomes $O(n^{\frac{3}{2}}\log{n})$.

---

## Notes
- The novelty of this approach is not that it achieves optimal running time (which I believe is $n \log(n)$), but that it achieves an asymptotic speedup while only using an off-the-shelf data structure.
  No internal modifications to the k-d tree are needed, it is purely used as a black-box, and in implementation the proposed algorithm wraps around it.
- I'm not sure how to show analytically that $b^* = \sqrt{n}$.
  Taking a derivative with respect to $b$ and setting it to 0 seems obvious, but is (I think) hard to do in practice.

