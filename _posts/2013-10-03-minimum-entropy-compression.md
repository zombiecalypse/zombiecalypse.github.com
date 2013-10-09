---
title: "Minimum entropy compression"
category: math
layout: post
---
<div style="display:none">
  \[
    \DeclareMathOperator{\argmin}{argmin}
    \DeclareMathOperator{\argmax}{argmax}
    \DeclareMathOperator{\im}{im}
  \]
</div>

Here are some random thoughts on lossy compression I had after reading
[Building High-level Features Using Large Scale Unsupervised Learning](http://aihub.net/video-paper-andrew-ng-building-high-level-features-using-large-scale-unsupervised-learning/).
I suppose there has been similar work and that I probably should hit the
books for this, but anyway&hellip;

Assume that we want to compress data of some kind and we want to do a
good job at it too. For example assume that we have a random vector \\(
X\in A\\) and want to code it smoothly to \\( B \\) where \\(B\\) would
typically be smaller than \\(A\\). In the case of equality or equal size
we don't need to loose any information, but otherwise we'd try to
squeeze more information into \\(B\\) than it offers space for.

## Compression
Since we want to decode the best we can afterwards we want to retain a
maximum of information in the markov chain 
\\[ X \rightarrow f(X) \rightarrow \widehat{ f^{-1}}(f(X))\\]

 If we're really lucky, X only takes values in a small subset of 
\\( A \\), because any bijective, continuous function will make
the conditional entropy vanish in this case. What if it can't? For this
we maximize \\( I(X, f(X)) = H(X) - H(X|f(X)) \\) by varying f.  This is
the case for \\( \min H(X| f(X)) \\), so we are looking for the \\(f\\) that
minimizes the conditional entropy in order to being able to decode the
intermediate result as good as we can.

\begin{align} f^\* = \operatorname{argmin}\_f H(X| f(X))
&= \argmin\_f \int\_{\substack{x\in A\\\\ y\in rng(f)}} p(x, y)  \log \frac{p(y)}{p(x, y)}\, dx\,dy\\\\
&= \argmin\_f \int\_{\substack{x\in A\\\\ y\in rng(f)}} \delta(y,f(x))\, p(x) \log \frac{p(y)}{\delta(y,f(x))\, p(x)}\,dx\,dy \\\\
&= \argmin\_f \int\_{A} p(x) \log \frac{p(f(x))}{p(x)}\,dx \\\\
&= \argmin\_f \int\_{A} p(x)\log \frac{1}{p(x)}\,dx+\int\_{A} p(x)\log p(f(x)) \, dx \\\\
&= \argmin H(X) + \int\_{A} p(x)\log p(f(x))\, dx\\\\
&= \argmin\_f \int\_{A} p(x)\log p(f(x))\, dx
\end{align}

This basically comes down to a loss function \\(L(x) = \log p(f(x))\\) that penaltizes throwning different values into
the same bin (for bijective \\(x\mapsto f(x)\\) it will give 0). This
compression is defined only up to the values it throws together, that is
up to a bijective, continuous function, so we have plenty of leeway to
find a nice function that fulfills the constraint.

## Decompression
Now say we take any compression \\(f\\), what is the best decompression
\\(\widehat{ f^{-1}}\\) we can find? We obviously want to maximize the
probability that the value \\(x\\) was responsible for a given
\\(f(x)\\), therefore

\begin{align}
p(x|f(x)) 
&= \frac{p(x)\,p(f(x)|x)}{p(f(x))}\\\\
&= \frac{p(x)}{p(f(x))}\\\\
\Rightarrow
\widehat{ f^{-1}}(y)
&= \argmax\_{x: f(x)=y} \frac{p(x)}{p(f(x))}\\\\
&= \argmax\_{x: f(x)=y} p(x)
\end{align}

## Expected loss
Finally assuming that all this, what is the expected loss? That is how
much information loss is inevitable in this scenario. Since we're not
assuming any structure in the sets \\(A\\) and \\(B\\) only 0-1-loss is
appropriate:

\begin{align}
\mathbb{E}(L\_{01}(x))
&= \int\_A p(x)\mathbb{I}(\widehat{ f^{-1}}(f(x))\neq x)\, dx\\\\
&=\int\_B \int\_{f^{-1}(y)\setminus \{\widehat{ f^{-1}}(y)\}} p(x)\,dx \,dy\\\\
&= \int\_B \left(\int\_{f^{-1}(y)}p(x)\, dx\right)-\max\_{x\in f^{-1}(y)} p(x)\,dy\\\\
&= \left(\int\_B \int\_{f^{-1}(y)} p(x)\,dx\,dy\right)-\left(\int\_B \max\_{x\in f^{-1}(y)}p(x)\,dy\right)\\\\
\end{align}

Now \\[\int\_B \int\_{f^{-1}(y)} p(x)\,dx\,dy = \int\_B p(f(y))\,dy=1\\] and
\\[\int\_B \max\_{x\in f^{-1}(y)}p(x)\,dy = \int\_{\im \widehat{ f^{-1}}} p(x)\,
dx = p(\im \widehat{ f^{-1}}) \\]
therefore
\\[
\mathbb{E}(L\_{01}(x)) = 1 - p(\im \widehat{ f^{-1}}).
\\]

## Conclusion
If we have two sets \\(A\\) and \\(B\\) and some random variables in
\\(A\\) we might not be able to conserve all information if we map them
into \\(B\\), but there is a scheme \\(f:A\rightarrow B\\) and 
\\(\widehat{ f^{-1}}:B\rightarrow A\\) that conserves most of it. The
constrains for this can actually be given by 

\begin{align}
f^\* &= \argmin\_f \int\_{A} p(x)\log p(f(x))\, dx\\\\
\widehat{ f^{-1}}(y) &= \argmax\_{x: f(x)=y} p(x)
\end{align}
which will lose only \\( 1 - p(\im \widehat{ f^{-1}}) \\) of the
information per random variable so compressed.
