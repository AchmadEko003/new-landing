import type { ICountry } from '~~/shared/interface/ICountry'

export const useCountryStore = defineStore('country', {
  state: () => {
    return {
      countryList: [] as ICountry[] | undefined
    }
  }
})
