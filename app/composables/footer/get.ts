import type { IAboutUs } from '~~/shared/interface/IAboutUs'
import type { IResponseList } from '~~/shared/interface/IResponse'
import type { ITermsAndConditions } from '~~/shared/interface/ITermsAndConditions'

export const getDataFooter = async () => {
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.apiBase

  let loading = true

  const [result, result2] = await Promise.allSettled([
    $fetch<IResponseList<IAboutUs>>(`${baseUrl}/AboutUs`, {
      method: 'GET'
    }),
    $fetch<IResponseList<ITermsAndConditions>>(`${baseUrl}/TermsCondition`, {
      method: 'GET'
    })
  ])

  loading = false

  const aboutUs = result.status === 'fulfilled' ? result.value.data : []
  const terms = result2.status === 'fulfilled' ? result2.value.data : []

  return { aboutUs: aboutUs as IAboutUs[], termsCondition: terms as ITermsAndConditions[], loadingFetch: loading as boolean }
}
