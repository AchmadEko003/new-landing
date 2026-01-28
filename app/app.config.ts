export default defineAppConfig({
  ui: {
    colors: {
      // primary: 'green',
      // neutral: 'slate'
    },
    radioGroup: {
      variants: {
        disabled: {
          true: {
            base: 'cursor-pointer opacity-0'
          }
        }
      }
    }
  }
})
