---
layout: 'default'
title: 'Meaningful names'
nav_order: 100
parent: 'Lincy [Linter]'
# No children
# No grandparent
---

# Meaningful names check

Examples:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Token</span> = <span class="hljs-type">str</span>;</div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">goodName</span>(token: Token);</div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">goodShortcutName</span>(tok: Token);</div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">goodOneLetterName</span>(t: Token);</div><div class="line-num" data-line-num="6">6</div><div class="line"></div><div class="line-num" data-line-num="7">7</div><div class="line"><span class="hljs-comment">// But names less than 3 letters long must match beginning of the type name</span></div><div class="line-num" data-line-num="8">8</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">badOneLetterName</span>(a: Token); <span class="hljs-comment">// No-no-no</span></div><div class="line-num" data-line-num="9">9</div><div class="line"></div><div class="line-num" data-line-num="10">10</div><div class="line"><span class="hljs-comment">// Type names of course should be split to separate words</span></div><div class="line-num" data-line-num="11">11</div><div class="line"><span class="hljs-keyword">type</span> <span class="hljs-title class_">SomeTypeName</span> = <span class="hljs-type">i32</span>;</div><div class="line-num" data-line-num="12">12</div><div class="line"></div><div class="line-num" data-line-num="13">13</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">goodName</span>(stn: SomeTypeName); <span class="hljs-comment">// Ok</span></div><div class="line-num" data-line-num="14">14</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">badName</span>(s: SomeTypeName); <span class="hljs-comment">// Bad</span></div>
        </div>
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/lincy/index.html">< Lincy [Linter]</a>
</button>

    
</div>
