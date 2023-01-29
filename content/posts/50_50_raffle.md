---
title: "Expected profit for a 50/50 Raffle"
date: 2022-12-19T18:37:01-05:00
draft: false
tags: ['everyday math and science','mathematics']
---

# Expected profit for a 50/50 Raffle

---

An auto race I recently attended also ran a 50/50 raffle, which is where a single winner receives 50% of the money collected from ticket sales.

Just like any form of gambling, it's almost certainly a bad idea on average, but I wasn't able to figure out precisely how bad without a pencil and a bit of scratch paper (which I got the next morning).

Here is the simple and surprisingly elegant result: **independent of the cost of single ticket and the total number of tickets sold, you should expect to lose half of the total money you spend on tickets**.

<details>
  <summary>Proof</summary>

  Not too difficult, we only need to use the idea of expected values.

  Let \\(c\\) be the cost of a single ticket, \\(t\\) be the number of tickets you buy, and \\(N\\) be the total number of tickets sold. Therefore, the total amount you spend on tickets is \\(ct\\).

  There are two cases (win or lose), and for each case we need to compute the probability of the case occurring (\\( p_{\text{case}} \\)), as well as the expected profit (\\( m_{\text{case}} \\))
  $$
    p_{\text{lose}} = \frac{N - t}{N}, \quad m_{\text{lose}} = -ct \\\\
    p_{\text{win}} = \frac{t}{N}, \quad m_{\text{win}} = \frac{1}{2}Nc - ct .
  $$
  Then the expected profit is
  $$
    \mathbb{E}[m] = p_{\text{lose}} m_{\text{lose}} + p_{\text{win}} m_{\text{win}} .
  $$
  Substituting in the expressions from above
  $$
    \mathbb{E}[m] = -\frac{N - t}{N}ct + \frac{t}{N}\left(\frac{1}{2}Nc - ct\right)
  $$
  and simplifying
  $$
    \mathbb{E}[m] = -ct + \frac{ct^2}{N} + \frac{1}{2}ct - \frac{ct^2}{N}
  $$
  we obtain our result
  $$
    \mathbb{E}[m] = -\frac{1}{2}ct ,
  $$
  which we identify as a loss of half the money you spend on tickets.
</details>



