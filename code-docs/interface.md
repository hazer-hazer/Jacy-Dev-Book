---
layout: 'default'
title: 'Interface'
nav_order: 4
parent: null
has_children: false
---

# Interface

`Interface` is the main class that runs each compilation stage. Also, some logic is directly placed inside the interface
but not in stage classes, it's kinda bad but... 

`Interface` catches errors, that is, when something went wrong at any stage we can log debug info about the current
compiler state, etc.
