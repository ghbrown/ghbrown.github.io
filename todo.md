## Current issues
- three periods show up as ellipses on publications (probably Hugo
  cranking markdown syntax out)
- (date) title   is not a hot link on timeline page, but is on tags
  page
  
## Risotto migration
- unify aside to only serve quotes and link to quotes page
  - if unified can probably put directly into baseof.html
  - or maybe just add another (always there) section to aside)?
- get code highlighting to use same palette as website
  - see: https://makewithhugo.com/syntax-hightlight-color/
- final item: remove "Powered by" in footer.html partial, and instead add
  attribution in the "This Website" post

## To do
- change variable names in main.css to theme-color and main-color (will require
  changes to main.js since it sets variable so white color can be accessed from
  a var())
- use katex shortcodes in legacy posts (then remove item below)
- fix the Katex + Hugo situation (current solution is functional but buggy in some cases like $a_1 + a_2$ since markdown runs first and processes the underscores away)
  - see possibly: https://mertbakir.gitlab.io/hugo/math-typesetting-in-hugo/
                  https://discourse.gohugo.io/t/how-to-render-math-equations-properly-with-katex/40998/4
                  https://www.simonspavound.com/posts/2020/09/equations-with-katex-in-hugo/
  - my planned solution: write .md files as usual using only $<inline>$ and 
                         $$<block>$$ syntax, placing them in
                         `content_preproc/` then use regex to process
                         these into shortcodes and place results in `content/`
                         {{< katex >}}$<inline>${{< /katex>}}
                         {{< katex >}}$<block>${{< /katex>}}
                         which will render as normal
- change directories named `hobbies_and_interests` to hobbies
- make publications page use full highlighting on the entire citation
  should be like <a> stuff <span class="themecolor">G. H. Brown</span></a>
- three dots are getting crowded on Publications
- change names to main-color and theme-color in main.css (will also
  need to change variables accesses in main.js)
- put numbers next to tags to indicate number of articles
- figure out a more aesthetic way to place the navigation links when
  navbar is at top
- Google still complaining about mobile usability?
  - try to see exactly what/where it's problem is (small text,
    elements too close, both?)
  - maybe need to add another breakpoint and raise minimum size of
    text (it does look a bit small)?
- weird alignment issues that is thankfully easy to fix with minor
  width hacking and padding (what's the root cause of the asymmetry?)
- add note somewhere that this site was inspired by Matthew Zahr's
  but written from scratch

Things you'll forget:
- hugo server may not watch for CSS changes, so you have to change
  a tracked file for it to refresh the website
- it may not watch for any changes in themes/ actually
- putting an <!-- html comment --> at the top of a layout outside
  "main" breaks Hugo
- katex equation: $$  <math here> $$
  katex inline  : \\( <math here> \\)
- katex needs \ to be escaped in equation or inline as \\ (so \\
  becomes \\\\ in matrices, for example)
- apparently the same is true for spaces in math mode \; => \\;
- using glink inline with sentence requires {{< glink >}} while
  single line links use {{% glink %}} (changes injection is
  treated as html or markdown)
- CSS selectors is the right term for "p, a" vs "p a" etc.


 
