Zepto($ => {
    $('.code-fence > .copy').on('click', function (el) {
        const code = $(this).parent().find('.line').text()
    
        const bufferInput = document.createElement('input')
    
        bufferInput.innerText = code
        bufferInput.focus()
    
        console.log('copied', bufferInput.innerText);
        document.execCommand('copy')
    })
})
