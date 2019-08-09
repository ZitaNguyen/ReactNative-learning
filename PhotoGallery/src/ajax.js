const apiHost = 'https://bakesaleforgood.com'

export default {
    async fetchPhotos() {
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
    async fetchPhotoDetail(dealId) {
      try {
          // The await operator is used to wait for a Promise. It can only be used inside an async function.
          const response = await fetch(apiHost + '/api/deals/' + dealId)
          const responseJson = await response.json()
          return responseJson
        } catch (error) {
          console.error(error)
        }
    }
}