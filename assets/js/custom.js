$('.code-fence > .copy').on('click', function (el) {
    const code = $(this).parent().find('.line').text()

    const bufferInput = document.createElement('#buffer-input')

    bufferInput.innerText = code
    bufferInput.focus()

    document.execCommand('copy')
})
