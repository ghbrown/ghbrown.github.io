---
title: "Computing the eigenfunctions of my fat head"
date: 2026-11-21T02:19:38-06:00
draft: false
tags: ['graphics']
---

# Computing the eigenfunctions of my fat head

---

This is the basic workflow of how I generated the animation below (also on the homepage of this website) using only open source software.

<video autoplay loop style="width:100%" alt="rotating mesh of shoulders and head">
  <source src="/assets/bust.webm">
</video>

In one sentence:
I used [COLMAP](https://colmap.github.io/) and [OpenMVG](https://github.com/openMVG/openMVG) to generate a textured mesh of myself from pictures;
then I used [libigl](https://libigl.github.io/), [scipy](https://scipy.org/), and [trimesh](https://trimesh.org/) to compute an eigenfunction and generate a corresponding texture;
then I used [Blender](https://www.blender.org/) to overlay the textures and make the final render.

More details can be found below.

---

### Photogrammetry
Photogrammetry is the process of recovering a 3-D model from images.
The output in this case is a mesh of the imaged geometry with textured faces.

Notes (in order of operations):
- started with about 60 images from my Android phone with no special settings (fixing white balance, etc. actually caused me issues with another set of photos)
- used COLMAP was for feature extraction, feature matching, and sparse reconstruction (but stopped there as I only had a CPU)
   - since my photos lacked matches reliably connecting my front and back I had to *really* mess with the sparse reconstruction settings to get a decent result
- used OpenMVG for dense reconstruction
- used Blender to remove unnecessary parts of mesh and perform other fixes like smoothing and repairing some areas
- used [meshlab](https://www.meshlab.net/) to coarsen the mesh to 27k vertices (down from about 300k)
- used OpenMVG for mesh texturing

### Geometry processing
Notes (in order of operations):
- used libigl (Python bindings) to assemble the [Laplace-Beltrami operator](https://en.wikipedia.org/wiki/Laplace%E2%80%93Beltrami_operator)
- eliminated rows and columns corresponding to edge vertices to enforce zero Dirichlet boundary condition
- used scipy to solve the eigenproblem (not generalized eigenproblem, did not use the mass matrix) for the eigenvector of the 108th smallest magnitude eigenvalue (it looked cool)
- took the absolute value of the eigenvector, mapped it to color, then used trimesh to write the colors to the vertices

## Rendering

Process of generating the final animation from the meshes and textures.

Notes (in order):
- imported the two meshes; one fully textures from images, the other with vertex colors of eigenfunction
- transferred the vertex data to the textured mesh, and created a new material that used the vertex colors as input to an emission shader
- selectively applied the two materials to different faces on the same mesh
- [rendered the final animation with transparency](/posts/alpha_video), then downsized with [ffmpeg](https://ffmpeg.org/)

---

## Acknowledgements

Thanks to [Navjot Singh](https://scholar.google.com/citations?user=QxgNpSQAAAAJ&hl=en) for taking the pictures, and for his patience while doing so.

---
