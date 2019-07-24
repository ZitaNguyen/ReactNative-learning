const apiHost = 'https://bakesaleforgood.com'

// object to fetch different types of data
export default {
    // using async functions is much more like using standard synchronous functions.
    async fetchInitialDeals() {
        // http://facebook.github.io/react-native/docs/network.html
        try {
            // The await operator is used to wait for a Promise. It can only be used inside an async function.
            const response = await fetch(apiHost + '/api/deals')
            const responseJson = await response.json()
            return responseJson
          } catch (error) {
            console.error(error)
          }
    },
    async fetchDealDetail(dealId) {
      try {
          // The await operator is used to wait for a Promise. It can only be used inside an async function.
          const response = await fetch(apiHost + '/api/deals/' + dealId)
          const responseJson = await response.json()
          return responseJson
        } catch (error) {
          console.error(error)
        }
    },
    async fetchDealSearchResults(searchTerm) {
      try {
          // The await operator is used to wait for a Promise. It can only be used inside an async function.
          const response = await fetch(apiHost + '/api/deals?searchTerm=' + searchTerm)
          const responseJson = await response.json()
          return responseJson
        } catch (error) {
          console.error(error)
        }
    }
}