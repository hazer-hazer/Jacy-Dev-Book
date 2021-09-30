---
layout: 'default'
title: 'Imports & Module System'
nav_order: 4
parent: 'Names & Imports'
# No children
grand_parent: 'Compiler Workflow'
---

# Importation and the Module system

The importation process is what the compiler does when a user writes <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span></span>.

## Modules

In _Jacy_ each file and each directory is a module, of course, including user-defined modules (<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mod</span></span> items).
The module system is similar to Rust, the root file is the root of the module tree, and nested modules paths are related to it.

## Importation

## The problem with overloads

Function overloading via labels might seem to be easy-implemented and it's true as we don't deal with types, anyway, there's a problem with importation and exportation.
Example:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">mod</span> <span class="hljs-title class_">m</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(label1: <span class="hljs-type">int</span>, label2: <span class="hljs-type">int</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">mod</span> <span class="hljs-title class_">n</span> {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">use</span> m::foo;</div><div class="line-num" data-line-num="7">7</div><div class="line"></div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(label3: <span class="hljs-type">int</span>, label4: <span class="hljs-type">int</span>);</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

Here, module <span class="inline-code highlight-jc hljs">m</span> exports overload <span class="inline-code highlight-jc hljs"><span class="hljs-title function_ invoke__">foo</span>(label1:label2:)</span> and module <span class="inline-code highlight-jc hljs">n</span> imports it and exports as well.

The module tree before the importation process will look so:

<div class="code-fence">
            [ROOT]: {
    &lt;span class=&quot;inline-code highlight-jc hljs&quot;&gt;&lt;span class=&quot;hljs-keyword&quot;&gt;mod&lt;/span&gt;&lt;/span&gt; &#039;m&#039;: {
        FOS#someID
          - &lt;span class=&quot;inline-code highlight-jc hljs&quot;&gt;&lt;span class=&quot;hljs-keyword&quot;&gt;func&lt;/span&gt;&lt;/span&gt; &#039;foo&#039;: &#039;foo(label1:label2:)&#039;
    }

    `mod &#039;n&#039;: {
        FOS#someID
          - &lt;span class=&quot;inline-code highlight-jc hljs&quot;&gt;&lt;span class=&quot;hljs-keyword&quot;&gt;func&lt;/span&gt;&lt;/span&gt; &#039;foo&#039;: &#039;foo(label3:label4:)&#039;
    }
}

        </div>

After importation, module <span class="inline-code highlight-jc hljs">n</span> must contain alias to function <span class="inline-code highlight-jc hljs"><span class="hljs-title function_ invoke__">foo</span>(label1:label2)</span> and locally defined <span class="inline-code highlight-jc hljs"><span class="hljs-title function_ invoke__">foo</span>(label3:label4)</span>.
When the module tree is building we create FOSes (Function Overload Sets) each of those has a unique index id.
So, when we importing a function with the same name should we update existent FOS?

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">mod</span> <span class="hljs-title class_">m</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(private: <span class="hljs-type">int</span>); <span class="hljs-comment">// #1</span></div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(public: <span class="hljs-type">int</span>); <span class="hljs-comment">// #2</span></div><div class="line-num" data-line-num="4">4</div><div class="line">} <span class="hljs-comment">// #0</span></div><div class="line-num" data-line-num="5">5</div><div class="line"></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-keyword">mod</span> <span class="hljs-title class_">n</span> {</div><div class="line-num" data-line-num="7">7</div><div class="line">    <span class="hljs-keyword">use</span> m::foo;</div><div class="line-num" data-line-num="8">8</div><div class="line"></div><div class="line-num" data-line-num="9">9</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(nested: <span class="hljs-type">int</span>); <span class="hljs-comment">// #4</span></div><div class="line-num" data-line-num="10">10</div><div class="line">} <span class="hljs-comment">// #3</span></div>
        </div>

The <span class="inline-code highlight-jc hljs">DefTable</span>:

<div class="code-fence">
            FOSes: [
    {
        &#039;(private:)&#039;: #1
        &#039;(public:)&#039;: #2
    }
    {
        &#039;(nested:)&#039;: #4
    }
]

        </div>

Module Tree:

<div class="code-fence">
            {
    &#039;m&#039;: {
        kind: &#039;mod&#039;
        defId: 0
        defs: {
            foo: {
                funcOverloadId: 0
            }
        }
    }
    &#039;n&#039;: {
        kind: &#039;mod&#039;
        defId: 1
        defs: {
            foo: {
                funcOverloadId: 1
            }
        }
    }
}

        </div>

After importation, if FOSes updated.

The <span class="inline-code highlight-jc hljs">DefTable</span>:

<div class="code-fence">
            FOSes: [
    {
        &#039;(private:)&#039;: #1
        &#039;(public:)&#039;: #2
    }
    {
        &#039;(private:)&#039;: &#039;Alias to #1&#039;
        &#039;(public:)&#039;: &#039;Alias to #2&#039;
        &#039;(nested:)&#039;: #4
    }
]

        </div>

So, let's establish how overloads importation works:

- We never modify FOS which we import into the module
- On importation, FOS of the module where <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span></span>-declaration present is modified -- imported overloads added
- Each FOS is unique per module, never redefine the same FOS in different modules
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/name-res-stage/index.html">< Names & Imports</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/name-res-stage/module-tree-building.html">Module Tree Building ></a>
</button>

</div>
