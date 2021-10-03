Zepto($ => {
    $('.code-fence > .copy').on('click', function () {
        const code = $(this).parent().find('.line').map(function() {return $(this).text()}).get().join('\n')

        const bufferInput = document.createElement('textarea')
        document.body.appendChild(bufferInput)

        bufferInput.value = code
        bufferInput.select()

        console.log('copied', bufferInput.value);
        document.execCommand('copy')

        document.body.removeChild(bufferInput)
    })
})
