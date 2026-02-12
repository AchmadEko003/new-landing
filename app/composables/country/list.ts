import type { IResponseList } from '~~/shared/interface/IResponse'
import type { ICountry, ICountryHeaderMenu } from '~~/shared/interface/ICountry'

export const getListCountry = async () => {
  const runtime = useRuntimeConfig()

  let loading = true

  const res = await $fetch(`${runtime.public.apiBase}/Country/country.list`, {
    onResponse: ({ response }) => {
      if (response.ok) {
        const data: IResponseList<ICountry> = response._data

        if (data.meta.status) {
          const dataTemp = reformattedTodos(data.data)

          response._data = dataTemp
        }
      }
    }
  })

  loading = false

  return { data: res as ICountryHeaderMenu[], pending: loading }
}

const reformattedTodos = (payload: ICountry[] | undefined): ICountryHeaderMenu[] => {
  const tempValue = payload ?? []

  // if (tempValue.length === 0) {
  //   return ['a']
  // }

  const result: ICountryHeaderMenu[] = []

  tempValue.splice(0, 9).forEach((element: ICountry) => {
    result.push({
      label: element.name,
      to: `/destinasi-populer/${element.name}_${element.uid}` // Adjusted to match the new route structure
    })
  })

  return result
}
