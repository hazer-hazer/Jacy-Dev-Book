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
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">mod</span> <span class="hljs-title class_">m</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(label1: <span class="hljs-type">int</span>, label2: <span class="hljs-type">int</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">mod</span> <span class="hljs-title class_">n</span> {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">use</span> m::foo;</div><div class="line-num" data-line-num="7">7</div><div class="line"></div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(label3: <span class="hljs-type">int</span>, label4: <span class="hljs-type">int</span>);</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

Here, module <span class="inline-code highlight-jc hljs">m</span> exports overload <span class="inline-code highlight-jc hljs"><span class="hljs-title function_ invoke__">foo</span>(label1:label2:)</span> and module <span class="inline-code highlight-jc hljs">n</span> imports it and exports as well.

The module-tree before importation process will look so:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line">[ROOT]: {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="inline-code highlight-jc hljs">&lt;span class=<span class="hljs-string">&quot;hljs-keyword&quot;</span>&gt;<span class="hljs-keyword">mod</span>&lt;/span&gt;</span> <span class="hljs-string">&#x27;m&#x27;</span>: {</div><div class="line-num" data-line-num="3">3</div><div class="line">        FOS#someID</div><div class="line-num" data-line-num="4">4</div><div class="line">          - <span class="inline-code highlight-jc hljs">&lt;span class=<span class="hljs-string">&quot;hljs-keyword&quot;</span>&gt;<span class="hljs-keyword">func</span>&lt;/span&gt;</span> <span class="hljs-symbol">&#x27;foo</span>&#x27;: <span class="hljs-symbol">&#x27;foo</span>(label1:label2:)&#x27;</div><div class="line-num" data-line-num="5">5</div><div class="line">    }</div><div class="line-num" data-line-num="6">6</div><div class="line"></div><div class="line-num" data-line-num="7">7</div><div class="line">    <span class="inline-code highlight-jc hljs">&lt;span class=<span class="hljs-string">&quot;hljs-keyword&quot;</span>&gt;<span class="hljs-keyword">mod</span>&lt;/span&gt; &lt;span class=<span class="hljs-string">&quot;hljs-string&quot;</span>&gt;&amp;#x27;n&amp;#x27;&lt;/span&gt;: {&lt;/div&gt;&lt;div class=<span class="hljs-string">&quot;line-num&quot;</span> data-line-num=<span class="hljs-string">&quot;8&quot;</span>&gt;<span class="hljs-number">8</span>&lt;/div&gt;&lt;div class=<span class="hljs-string">&quot;line&quot;</span>&gt;        FOS#someID&lt;/div&gt;&lt;div class=<span class="hljs-string">&quot;line-num&quot;</span> data-line-num=<span class="hljs-string">&quot;9&quot;</span>&gt;<span class="hljs-number">9</span>&lt;/div&gt;&lt;div class=<span class="hljs-string">&quot;line&quot;</span>&gt;          - </span><span class="hljs-keyword">func</span><span class="inline-code highlight-jc hljs"> &lt;span class=<span class="hljs-string">&quot;hljs-symbol&quot;</span>&gt;&amp;#x27;foo&lt;/span&gt;&amp;#x27;: &lt;span class=<span class="hljs-string">&quot;hljs-symbol&quot;</span>&gt;&amp;#x27;foo&lt;/span&gt;(label3:label4:)&amp;#x27;&lt;/div&gt;&lt;div class=<span class="hljs-string">&quot;line-num&quot;</span> data-line-num=<span class="hljs-string">&quot;10&quot;</span>&gt;<span class="hljs-number">10</span>&lt;/div&gt;&lt;div class=<span class="hljs-string">&quot;line&quot;</span>&gt;    }&lt;/div&gt;&lt;div class=<span class="hljs-string">&quot;line-num&quot;</span> data-line-num=<span class="hljs-string">&quot;11&quot;</span>&gt;<span class="hljs-number">11</span>&lt;/div&gt;&lt;div class=<span class="hljs-string">&quot;line&quot;</span>&gt;}&lt;/div&gt;
        &lt;/div&gt;

After importation, module </span>n<span class="inline-code highlight-jc hljs"> must contain alias to function </span>foo(label1:label2)<span class="inline-code highlight-jc hljs"> <span class="hljs-operator">and</span> locally defined </span>foo(label3:label4)<span class="inline-code highlight-jc hljs">.
When module tree is building we create <span class="hljs-title function_ invoke__">FOSes</span> (Function Overload Sets) each of those has a unique index id.
So, when we importing a function with the same name should we update existent FOS?

&lt;div class=<span class="hljs-string">&quot;code-fence highlight-jc hljs&quot;</span>&gt;
            &lt;div class=<span class="hljs-string">&quot;line-num&quot;</span> data-line-num=<span class="hljs-string">&quot;1&quot;</span>&gt;<span class="hljs-number">1</span>&lt;/div&gt;&lt;div class=<span class="hljs-string">&quot;line&quot;</span>&gt;&lt;span class=<span class="hljs-string">&quot;hljs-keyword&quot;</span>&gt;<span class="hljs-keyword">mod</span>&lt;/span&gt; &lt;span class=<span class="hljs-string">&quot;hljs-title class_&quot;</span>&gt;m&lt;/span&gt; {&lt;/div&gt;&lt;div class=<span class="hljs-string">&quot;line-num&quot;</span> data-line-num=<span class="hljs-string">&quot;2&quot;</span>&gt;<span class="hljs-number">2</span>&lt;/div&gt;&lt;div class=<span class="hljs-string">&quot;line&quot;</span>&gt;    &lt;span class=<span class="hljs-string">&quot;hljs-keyword&quot;</span>&gt;<span class="hljs-keyword">func</span>&lt;/span&gt; &lt;span class=<span class="hljs-string">&quot;hljs-title function_&quot;</span>&gt;foo&lt;/span&gt;(private: &lt;span class=<span class="hljs-string">&quot;hljs-type&quot;</span>&gt;<span class="hljs-type">int</span>&lt;/span&gt;); &lt;span class=<span class="hljs-string">&quot;hljs-comment&quot;</span>&gt;<span class="hljs-comment">// #1&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;3&quot;&gt;3&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-keyword&quot;&gt;pub&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;func&lt;/span&gt; &lt;span class=&quot;hljs-title function_&quot;&gt;foo&lt;/span&gt;(public: &lt;span class=&quot;hljs-type&quot;&gt;int&lt;/span&gt;); &lt;span class=&quot;hljs-comment&quot;&gt;// #2&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;4&quot;&gt;4&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;} &lt;span class=&quot;hljs-comment&quot;&gt;// #0&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;5&quot;&gt;5&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;6&quot;&gt;6&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;&lt;span class=&quot;hljs-keyword&quot;&gt;mod&lt;/span&gt; &lt;span class=&quot;hljs-title class_&quot;&gt;n&lt;/span&gt; {&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;7&quot;&gt;7&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-keyword&quot;&gt;use&lt;/span&gt; m::foo;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;8&quot;&gt;8&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;9&quot;&gt;9&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-keyword&quot;&gt;func&lt;/span&gt; &lt;span class=&quot;hljs-title function_&quot;&gt;foo&lt;/span&gt;(nested: &lt;span class=&quot;hljs-type&quot;&gt;int&lt;/span&gt;); &lt;span class=&quot;hljs-comment&quot;&gt;// #4&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;10&quot;&gt;10&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;} &lt;span class=&quot;hljs-comment&quot;&gt;// #3&lt;/span&gt;&lt;/div&gt;</span>
        &lt;/div&gt;

DefTable:

</span><span class="inline-code highlight-jc hljs"></span>jon
FOSes: [
    {
        '(private:)': #1
        '(public:)': #2
    }
    {
        '(nested:)': #4
    }
]
<span class="inline-code highlight-jc hljs"></span><span class="inline-code highlight-jc hljs">

Module Tree:

</span><span class="inline-code highlight-jc hljs"></span>jon
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
<span class="inline-code highlight-jc hljs"></span><span class="inline-code highlight-jc hljs">

After importation, <span class="hljs-keyword">if</span> FOSes updated.

DefTable:

</span><span class="inline-code highlight-jc hljs"></span>jon
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
<span class="inline-code highlight-jc hljs"></span><span class="inline-code highlight-jc hljs">

So, <span class="hljs-keyword">let</span><span class="hljs-symbol">&#x27;s</span> establish how overloads importation works:

- We never modify FOS which we import into the module
- On importation, FOS of the module <span class="hljs-keyword">where</span> </span>use`-declaration present is modified -- imported overloads added
- Each FOS is unique per module, never redefine the same FOS in different modules
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/name-res-stage/index.html">< Names & Imports</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/name-res-stage/module-tree-building.html">Module Tree Building ></a>
</button>

</div>