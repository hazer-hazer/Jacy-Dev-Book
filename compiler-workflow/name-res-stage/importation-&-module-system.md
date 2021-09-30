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
Module system is similar to Rust, root file is the root of module tree and

## Importation

## The problem with overloads

Function overloading via labels might seem to be easy-implemented and its true as we don't deal with types, anyway there's a problem with importation and exportation.
Example:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">mod</span> m {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(label1: <span class="hljs-type">int</span>, label2: <span class="hljs-type">int</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">mod</span> n {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">use</span> m::foo;</div><div class="line-num" data-line-num="7">7</div><div class="line"></div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(label3: <span class="hljs-type">int</span>, label4: <span class="hljs-type">int</span>);</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

Here, module <span class="inline-code highlight-jc hljs">m` exp<span class="hljs-operator">or</span>ts overload `<span class="hljs-title function_ invoke__">foo</span>(label1:label2:)` <span class="hljs-operator">and</span> module `n</span> imports it and exports as well.

The module-tree before importation process will look so:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line">[ROOT]: {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-keyword&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-keyword">mod</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span>` <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-string&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">&amp;</span>#x27;m<span class="hljs-operator">&amp;</span>#x27;<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span>: {<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;3&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">3</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span>        FOS#someID<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;4&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">4</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span>          <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-operator&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">-</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span> `<span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-keyword&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-keyword">func</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span>` <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-symbol&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">&amp;</span>#x27;foo<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span><span class="hljs-operator">&amp;</span>#x27;: <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-symbol&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">&amp;</span>#x27;foo<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span>(label1:label2:)<span class="hljs-operator">&amp;</span>#x27;<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;5&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">5</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span>    }<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;6&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">6</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;7&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">7</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span>    `<span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-keyword&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-keyword">mod</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span> <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-string&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">&amp;</span>#x27;n<span class="hljs-operator">&amp;</span>#x27;<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span>: {<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;8&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">8</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span>        FOS#someID<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;9&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">9</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span>          <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-operator&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">-</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span> `<span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-keyword&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-keyword">func</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span></span> <span class="hljs-symbol">&#x27;foo</span>&#x27;: <span class="hljs-symbol">&#x27;foo</span>(label3:label4:)&#x27;</div><div class="line-num" data-line-num="10">10</div><div class="line">    }</div><div class="line-num" data-line-num="11">11</div><div class="line">}</div>
        </div>

After importation, module <span class="inline-code highlight-jc hljs">n` must contain alias to function `<span class="hljs-title function_ invoke__">foo</span>(label1:label2)` <span class="hljs-operator">and</span> locally defined `<span class="hljs-title function_ invoke__">foo</span>(label3:label4)</span>.
When module tree is building we create FOSes (Function Overload Sets) each of those has a unique index id.
So, when we importing a function with the same name should we update existent FOS?

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">mod</span> m {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(private: <span class="hljs-type">int</span>); <span class="hljs-comment">// #1</span></div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(public: <span class="hljs-type">int</span>); <span class="hljs-comment">// #2</span></div><div class="line-num" data-line-num="4">4</div><div class="line">} <span class="hljs-comment">// #0</span></div><div class="line-num" data-line-num="5">5</div><div class="line"></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-keyword">mod</span> n {</div><div class="line-num" data-line-num="7">7</div><div class="line">    <span class="hljs-keyword">use</span> m::foo;</div><div class="line-num" data-line-num="8">8</div><div class="line"></div><div class="line-num" data-line-num="9">9</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(nested: <span class="hljs-type">int</span>); <span class="hljs-comment">// #4</span></div><div class="line-num" data-line-num="10">10</div><div class="line">} <span class="hljs-comment">// #3</span></div>
        </div>

DefTable:

<span class="inline-code highlight-jc hljs">`</span>jon
FOSes: [
    {
        '(private:)': #1
        '(public:)': #2
    }
    {
        '(nested:)': #4
    }
]
<span class="inline-code highlight-jc hljs">`</span>

Module Tree:

<span class="inline-code highlight-jc hljs">`</span>jon
{
    'm': {
        kind: 'mod'
        defId: 0
        defs: {
            foo: {
                funcOverloadId: 0
            }
        }
    }
    'n': {
        kind: 'mod'
        defId: 1
        defs: {
            foo: {
                funcOverloadId: 1
            }
        }
    }
}
<span class="inline-code highlight-jc hljs">`</span>

After importation, if FOSes updated.

DefTable:

<span class="inline-code highlight-jc hljs">`</span>jon
FOSes: [
    {
        '(private:)': #1
        '(public:)': #2
    }
    {
        '(private:)': 'Alias to #1'
        '(public:)': 'Alias to #2'
        '(nested:)': #4
    }
]
<span class="inline-code highlight-jc hljs">`</span>

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
