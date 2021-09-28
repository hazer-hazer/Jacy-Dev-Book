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
<pre class="code-fence highlight-jc hljs">
            <table class="code-table"><tr><td class="line-num-col"><div class="line-num" data-line-num="1"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Token</span> = <span class="hljs-type">str</span>;</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="2"></div></td><td class="line-col"><div class="line-content"></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="3"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">func</span> <span class="hljs-title function_">goodName</span>(token: Token);</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="4"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">func</span> <span class="hljs-title function_">goodShortcutName</span>(tok: Token);</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="5"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">func</span> <span class="hljs-title function_">goodOneLetterName</span>(t: Token);</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="6"></div></td><td class="line-col"><div class="line-content"></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="7"></div></td><td class="line-col"><div class="line-content"><span class="hljs-comment">// But names less than 3 letters long must match beginning of the type name</span></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="8"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">func</span> <span class="hljs-title function_">badOneLetterName</span>(a: Token); <span class="hljs-comment">// No-no-no</span></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="9"></div></td><td class="line-col"><div class="line-content"></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="10"></div></td><td class="line-col"><div class="line-content"><span class="hljs-comment">// Type names of course should be split to separate words</span></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="11"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">type</span> <span class="hljs-title class_">SomeTypeName</span> = <span class="hljs-type">i32</span>;</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="12"></div></td><td class="line-col"><div class="line-content"></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="13"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">func</span> <span class="hljs-title function_">goodName</span>(stn: SomeTypeName); <span class="hljs-comment">// Ok</span></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="14"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">func</span> <span class="hljs-title function_">badName</span>(s: SomeTypeName); <span class="hljs-comment">// Bad</span></div></td></tr></table>
        </pre>
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/lincy/index.html">< Lincy [Linter]</a>
</button>

    
</div>
