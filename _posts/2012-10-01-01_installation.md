---
title: "Installing Ruby and Sinatra"
layout: post
categories: programming
---

*This article is part of the [Sinatra Story]({% post_url 2012-10-09-sinatra_story %}) series.*

Hi there, so before we can get started with the Sinatra framework, we need to
get it to run in the first place, so here is how you get ruby and Sinatra.

## Getting Ruby

* **Windows**: You're probably in for some pain, consider dual-booting with linux or
[cygwin](http://www.cygwin.com/). You should also look at
[rvm](https://rvm.io/rvm/install/)
([here](http://blog.developwithpassion.com/2012/03/30/installing-rvm-with-cygwin-on-windows/)
is a tutorial how to install it in cygwin)

* **Mac OSX**: I heard [MacRuby](http://macruby.org/) was a good choice. You
  can also use [rvm](https://rvm.io/rvm/install/) with the [GUI](http://unfiniti.com/software/mac/jewelrybox) for OSX.

* **Linux**: I recommend using [rvm](https://rvm.io/rvm/install/) and
  installing it as the website recommends. For example Ubuntu still uses the 
  `1.8` version of ruby by default and you can't install personal gems. After
  installing `rvm`, run `rvm install 1.9.2`

## Getting Bundler

[Bundler](http://gembundler.com/) manages dependencies to other libraries
(called "gems"). You list the gems your application needs in the application
root directory in a file with the name `Gemfile`. The next guy trying to use
your application can then simply run `bundle install` and all dependencies are
resolved.

To get `bundler`, just run `gem install bundler` in a terminal. If you
installed ruby via rvm, that should work, otherwise look at 
[the ruby gems installation page](http://rubygems.org/pages/download).

## Starting a Sinatra project

Make a new directory, in which you make a new file `Gemfile`, in there, add
the repository for the gems first, and then the dependencies:

```ruby
source 'https://rubygems.org'
gem 'sinatra'
gem 'sinatra-contrib'
gem 'haml'
```

Now switch to the directory in a terminal and run `bundle install`, then wait.
Now you can try the Hello World from [Sinatra](http://www.sinatrarb.com/):

```ruby
# hello.rb
require 'rubygems'
require 'sinatra'

get '/hi' do
  "Hello World!"
end
```

then run `ruby hello.rb`. If there are no errors, sinatra is installed just
fine. You can exit the server with `Ctrl+C`.
