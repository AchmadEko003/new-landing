/**
 * Composable untuk copy Virtual Account number ke clipboard
 * Digunakan di berbagai halaman payment
 */

export const useCopyVirtualAccount = () => {
  const copyFeedback = ref('')
  const showCopyFeedback = ref(false)

  const copyVirtualAccount = async (vaNumber: string) => {
    if (!vaNumber) return

    try {
      await navigator.clipboard.writeText(vaNumber)
      copyFeedback.value = 'Virtual Account berhasil disalin!'
      showCopyFeedback.value = true

      // Hide feedback after 2 seconds
      setTimeout(() => {
        showCopyFeedback.value = false
      }, 2000)
    } catch (error) {
      // Fallback: select the text manually
      const textArea = document.createElement('textarea')
      textArea.value = vaNumber
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)

      copyFeedback.value = 'Virtual Account berhasil disalin!'
      showCopyFeedback.value = true

      // Hide feedback after 2 seconds
      setTimeout(() => {
        showCopyFeedback.value = false
      }, 2000)
    }
  }

  return {
    copyFeedback,
    showCopyFeedback,
    copyVirtualAccount
  }
}
