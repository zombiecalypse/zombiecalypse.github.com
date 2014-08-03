---
title: "Coded aperture pt. 2: Aperture"
layout: post
categories: math
---

In the [last article]({% post_url 2014-05-10-coded-aperture %}), we discussed
how you can find the pixelwise depth from a single image by looking at the blur.
Today I'm showing you how to improve on that method by modding your camera.

# Where does the coded aperture come in?
Straight into the camera! If instead of taking images with a camera as you can
buy them, we put a mask into the lens, we don't get circular blurs, but instead
can influence the shape of the blur. The maybe best way to see that is Bokeh
photography (thanks to [Andrea Smith](https://www.flickr.com/photos/30282864@N02/)):

![Bokeh picture by Andrea Smith](/static/bokeh.jpg)

Here is the lens diagram from last time, with a slight modification:

![Lens model with aperture mask](/static/aperture.png) 

The aperture blocks out the light on certain parts of the sensor, when it comes
from certain object parts.

Why would that be good? Well for one thing, if we take a circular aperture (the
default), the aperture of the bigger scales are a strict superset of the smaller
scales, which makes it hard to discern the exact scale, because you absolutely
need the outer parts. Compare that with the aperture mask in the image. Even if
we fail to find the outer pixels of the mask, the rest gives us enough
information about the scale to determine the depth.


