export const setImageBaseUrlForSeo = (imagePath: string | undefined) => {
  if (!imagePath) return ''

  const baseURL = 'http://103.189.234.243/img-asset'
  return `${baseURL}${imagePath}`
}
