Zepto($ => {
    $('.code-fence > .copy').on('click', function (el) {
        const code = $(this).parent().find('.line').text()
    
        const bufferInput = document.createElement('textarea')
        document.body.appendChild(bufferInput)

        bufferInput.value = code
        bufferInput.select()

        console.log('copied', bufferInput.innerText);
        document.execCommand('copy')

        document.body.removeChild(bufferInput)
    })
})
