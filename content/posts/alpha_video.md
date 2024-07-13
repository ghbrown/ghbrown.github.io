---
title: "Transparent videos from Blender to the web"
date: 2024-07-13T12:37:01-05:00
draft: false
tags: ['web development','graphics']
---

# Get transparent videos out of Blender and onto the web

A quick guide to get your cool render out of Blender and onto the web, with transparency/alpha!

---

## Out of [Blender](https://www.blender.org/)

For renders to intermediate frame images you can use the following Blender settings in the Properties Editor:

```
Render > Film > Transparent (check it)
Output > Output > File Format > PNG
Output > Output > Color > RGBA
```

For a small renders directly to video files (bad practice) I used the following settings:

```
Render > Film > Transparent (check it)
Output > Output > Container > QuickTime
Output > Output > Video > QT rle / QT Animation
Output > Output > Video > Keyframe Interval > 1  (seemed to make video smoother)
Output > Output > File Format > FFmpeg Video
Output > Output > Color > RGBA
```

---

## Onto the web

For rendering to frames, you'll obviously need to combine them into a video.
You can do this on the command line with the all-powerful `ffmpeg`:
```
ffmpeg -pattern_type glob -r <frame rate> -i "*.png" <output>.webm
```
where we assume the current working directory contains only `.png` files of the frames.

For rendering direct to video, I found the resulting `.mov` file didn't seem to work when placed on a website (tested on FireFox 127) even though it played fine with transparency locally.
Let's again use `ffmpeg` to convert it:

```
ffmpeg -i <start>-<end>.mov <output>.webm
```

Either way, you should now have a `.webm` file that can easily be inserted into a webpage:

```html
<video>
    <source src="<output>.webm">
</video>
```

---

## Disclaimer

I wrote this guide because multiple examples and tutorials trying to accomplish this did not work (or not completely), so I had to patch together this workflow.
However, like the giants whose shoulders I stand on, this may not work for you either; sorry.