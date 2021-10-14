---
layout: 'default'
title: 'Why'
nav_order: 100
parent: 'User Guide'
# No children
# No grandparent
---

# Why?

This is a collection of answers to all "Why's?", it contains obvious question I'd like to include to user-guide to help newcomers, but also here would likely be complex question about how the compiler works.
You can think of it as of FAQs and you don't need to read this -- I'll use the answers from here to include them into user-guide or dev-guide when needed.

## Q1 Why tuples are not indexed with brackets <span class="inline-code highlight-jc hljs">[]</span>?

This might a popular question from programmers with experience in dynamic programming languages.
You likely know that listing collections, e.g. array or vector, can be indexed with <span class="inline-code highlight-jc hljs">collection[index]</span> syntax.
And syntax for tuple indexing is <span class="inline-code highlight-jc hljs">tuple.index</span> where <span class="inline-code highlight-jc hljs">index</span> is a natural number, this might seem to be a strange syntax, but it has a clear explanation.

<span class="inline-code highlight-jc hljs">[]</span> is used for dynamic indexing, i.e. the index inside <span class="inline-code highlight-jc hljs">[]</span> can be an any expression, not required to be known at compile-time. Also, listing collections are homogeneous, that is, each element in, for example, vector is of the same type. When you index <span class="inline-code highlight-jc hljs">vec&lt;<span class="hljs-type">int</span>&gt;</span> you always get <span class="inline-code highlight-jc hljs"><span class="hljs-type">int</span></span> as a result.
On the other hand, tuples are heterogeneous, opposite to homogeneous, it means that each element in tuple can be of different type (any element can be of any type), so if we index a tuple, the compiler needs to know what type will we get as a result.

Summing up, <span class="inline-code highlight-jc hljs">[]</span> is for dynamic "get", <span class="inline-code highlight-jc hljs">.</span> is for static "get".

I'd like to also give you an example:
<div class="code-fence highlight-jacy">
            <div class="copy"><i class="far fa-copy"></i></div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">arr</span>: [<span class="hljs-type">int</span>; <span class="hljs-number">3</span>] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">tup</span>: (<span class="hljs-type">int</span>, &amp;<span class="hljs-type">str</span>, <span class="hljs-type">f32</span>) = (<span class="hljs-number">123</span>, <span class="hljs-string">&quot;Hello&quot;</span>, <span class="hljs-number">22.101</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line">arr[<span class="hljs-number">0</span>]; <span class="hljs-comment">// The result is <span class="inline-code highlight-jc hljs"><span class="hljs-number">1</span></span></span></div><div class="line-num" data-line-num="5">5</div><div class="line"></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">index</span> = <span class="hljs-number">2</span>;</div><div class="line-num" data-line-num="7">7</div><div class="line">arr[index]; <span class="hljs-comment">// The result is <span class="inline-code highlight-jc hljs"><span class="hljs-number">3</span></span></span></div><div class="line-num" data-line-num="8">8</div><div class="line"></div><div class="line-num" data-line-num="9">9</div><div class="line">tup.<span class="hljs-number">0</span>; <span class="hljs-comment">// The result is <span class="inline-code highlight-jc hljs"><span class="hljs-number">123</span></span></span></div><div class="line-num" data-line-num="10">10</div><div class="line"></div><div class="line-num" data-line-num="11">11</div><div class="line"><span class="hljs-comment">// This won&#x27;t compile</span></div><div class="line-num" data-line-num="12">12</div><div class="line"><span class="hljs-comment">// tup[index];</span></div><div class="line-num" data-line-num="13">13</div><div class="line"></div><div class="line-num" data-line-num="14">14</div><div class="line"><span class="hljs-comment">// Let&#x27;s assume we a <span class="inline-code highlight-jc hljs">callComplexMethod</span> function which computes index by really complex logic</span></div><div class="line-num" data-line-num="15">15</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">computedIndex</span> = <span class="hljs-title function_ invoke__">callComplexMethod</span>();</div><div class="line-num" data-line-num="16">16</div><div class="line"></div><div class="line-num" data-line-num="17">17</div><div class="line">arr[computedIndex]; <span class="hljs-comment">// This will give us an element from <span class="inline-code highlight-jc hljs">arr</span> by the <span class="inline-code highlight-jc hljs">computedIndex</span></span></div><div class="line-num" data-line-num="18">18</div><div class="line"></div><div class="line-num" data-line-num="19">19</div><div class="line"><span class="hljs-comment">// This won&#x27;t compile</span></div><div class="line-num" data-line-num="20">20</div><div class="line"><span class="hljs-comment">// What is the type of <span class="inline-code highlight-jc hljs">tupleElement</span>? 😰</span></div><div class="line-num" data-line-num="21">21</div><div class="line"><span class="hljs-comment">// let tupleElement = tup[computedIndex]; </span></div>
            </div>
        </div>
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/dev-book/user-guide/index">< User Guide</a>
</button>

    
</div>
