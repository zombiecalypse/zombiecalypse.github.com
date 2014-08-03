---
title: "Coded aperture pt. 1: Depth from Defocus"
layout: post
categories: math
---

I'm taking the seminar in computer vision this semester, and compared to other
seminars I took, [Prof. Favaro](http://mcs.unibnf.ch/lecturers/paolo-favaro)
gave me a unique chance to actually take part in science&trade;. The project in
question is the maybe obscure field of depth estimation from coded aperture, a
more elaborate version of depth from defocus.

# What is Depth from Defocus?
I'm glad you asked! Depth from Defocus is just telling depth of an image by
looking at how blurry it is. To understand how it works, lets look at what
happens to an object that is out of focus in a camera:

![A point out of focus](/static/out-focus.png)

Every pixel in the sharp image is now spread across several pixels on our
sensor. Instead of a sharp image, we get a blurry one. In fact, just how
blurry the image is, depends on how far from the focal plane the object is.
If we were able to figure out, how blurry the image at each pixel is, we would
be able to tell how far away something is. For this example, where there is only
a single dot on screen, it would be rather simple, since the size of the
dot in pixels would tell us, what blur size was applied.

Alas it is generally accepted, that images of dots are a rather boring subject
and thus we need to be able to handle texture in the image.

But not all is lost, because at least, we can figure out, what sharp images look
like and from there, a raytracer can tell us, what the same image would look
like if it was not in focus.

The first step to learn what blurry images typically look like is to restrict
ourselves to fixed size images. We can simply cut them into patches of
\\(p\times p\\) pixels. Now each of our patches can be described by a vector of
\\(p^2\\) dimensions, where each dimension gives us the intensity of a single
pixel.

From this it is simple to create a training set, which consists of a number of
patches, simulated to be taken at a certain level of blurriness. We can then use
any number of machine learning techniques to learn to tell the levels apart, but
the method used so far is a simple template matching with the templates being
determined by [PCA](http://en.wikipedia.org/wiki/Principal_component_analysis),
which is explained below.

A problem with that is, that our training set contains only patches, that
contain exactly one blur level. If we see a patch, which contains more than one
blur level, our algorithm would get confused. This leads to sub-optimal
performance on the edges between depth levels. Another problem is that we
assume that patches contain variation, that is typical for a certain depth
level. If there is no texture, we couldn't tell how blurry the image is.

# PCA in a nutshell

Principal component analysis is a method that finds a low-dimensional
representation of some high-dimensional data. It assumes that, in a perfect
world, we get a small descriptor \\(z\in\mathbb{R}^L\\) that is then put
into the high dimensional space \\(\mathbb{R}^N\\) by a linear operation
\\(W\in\mathbb{R}^{N\times L}\\). However this is not a perfect world, so
after we get into the high dimensional space, there is some (gaussian) noise
\\(e_\sigma \\), which messes up our measurement:

\\[ x = Wz+e_\sigma\\]

We can then learn, what the most important variations of our data is, by
projecting into the space spanned by the eigenvectors of the largest (in the
absolute value) eigenvalues of the covariance are. This is just formalizing the
idea that we should take the directions, in which the data varries most.

This means effectively that we assume that each blurriness level forms a
subspace in the room of possible patches and that we can find the best matching
one by looking how far the patch in question is from the subspaces. A major
advantage of this is that it's really fast, since we learned a linear
classifier. Another advantage is that it simplifies the math involved.

# What happened
We started with the observation, that by looking at how blurry an image is, we
can probably figure out, how far it is from the focal plane. For this, we
simulated the effect of blur on a few sharp images and learned what kind of
variation to expect and what kind of variation is probably due to noise. For
example in a very blurry image, there wouldn't be much difference between single
pixels. This allows us then, when we take a new patch that we haven't seen to
guess what blur size is the most likely explanation for an image like that.

From this alone, we could estimate the relative distances from a single image,
but the results are not too great, since our classifier didn't learn the
differences between the levels, but also because looking at a whole patch, we
try to find one depth level, that explains all the patch's pixels. Finally we
have the problem that blur in the shape of circles is hard to determine once you
start adding them to each other.

If you want to find out how to solve at least the last problem, stay tuned for
the [next article]({% post_url 2014-05-11-coded-aperture-2 %})
