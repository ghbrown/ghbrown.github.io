---
title: "Prime number detector"
date: 2020-04-25T18:37:01-05:00
draft: false
tags: ['web development']
---

# Prime Number Detector

---

Input a number to determine if it is prime.<br>

<form id="primeform" onsubmit="determineIfPrime(); return false">
  <input type="text" id="primeinput">
  <input type="submit" class="button" id="primebutton" value="RUN">
</form>
<p class="themecolor" id="primeresponse"></p>

The maximum input value before truncation error is 9007199254740991 (~9e15, nine and fifteen zeros!),
which is not prime but has a relatively large least factor.
This is because JavaScript uses double-precision floating-point numbers according to IEEE 754, and this number is the largest this format supports.

---

## Notes

I used this little project to get my feet wet with Javascript when I was building my website from raw HTML and CSS.
I also enjoyed implementing some tricks to accelerate the solution, the main one being the square root bound on the factors.

---
