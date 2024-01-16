## Current issues
- three periods show up as ellipses on publications (probably Hugo
  cranking markdown syntax out)
- (date) title   is not a hot link on timeline page, but is on tags
  page
  
## To do
- use katex shortcodes in legacy posts (then remove item below)
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
- put numbers next to tags to indicate number of articles
- figure out a more aesthetic way to place the navigation links when
  navbar is at top

Things you'll forget:
- hugo server may not watch for CSS changes, so you have to change
  a tracked file for it to refresh the website
- it may not watch for any changes in themes/ actually
- putting an <!-- html comment --> at the top of a layout outside
  "main" breaks Hugo
- using glink inline with sentence requires {{< glink >}} while
  single line links use {{% glink %}} (changes injection is
  treated as html or markdown)
- CSS selectors is the right term for "p, a" vs "p a" etc.


 
