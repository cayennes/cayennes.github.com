About my website
================

What's here
-----------

I don't really feel like I'm someone that needs to have a website;
pretty much everything of value I put on the web has a better home.  But
there are a few craft related things that wanted somewhere of their own
to live, and I thought it wouldn't hurt to have an index of those
various other places I have stuff.  So here is my website.

The HTML and CSS is mostly copied from a personal website I created
possibly around 2004 and kept using even though I have thrown out all
the content and switched templating systems each at least once since then.

The most worthwhile part of this website is the yarncraft section.  The
most useful part is the page on combination knitting, which at least one
person has found helpful.

Fun stuff
---------

The most fun thing (at least to me as a coder) on this website is my
solution the to problem of how to utilize ravelry to show off my
projects to people that don't have ravelry accounts, since I can make my
projects viewable to people without accounts but then I have to link
them one-by-one.  I wanted a way to easily show a bunch of my projects
at once.  Due to the difficulty of finding good free hosts for
server-side scripts, I did this in JavaScript here on my free GitHub web
space.

It creates galleries of thumbnails that link to ravelry project pages
based filters that pick things like happiness or specific
projects, and can be used in either of two ways:
1. The filter can be specified in JSON in an HTML data attribute for a
   static element of a page. I put this to use on my main yarncraft page
   to show off my happiest projects.
2. The filter can specified the URL.  The links to more
   examples all use this; I can add more just by ading more links.  The
   most interesting way to use this is that I can create a link on the
   fly to show a set of projects and send the link to anyone.  Speaking
   of which:

I don't have to hunt down all the project names and type them in; I have
[a page](http://cayennes.github.com/yarncraft/showcase-creator.html)
where I can just click on the pictures of the projects I want.  A link
at the top of the page updates to be the correct link for viewing the
selected projects.  This page also respects filters in the URL so I can
narrow down the options to make finding specific projects easier.
