import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ajax from './src/ajax'
import DealList from './src/components/DealList'
import DealDetail from './src/components/DealDetail'
import SearchBar from './src/components/SearchBar'

export default class App extends Component {
  state = {
    deals: [], // array for deals fetch from api
    dealsFromSearch: [], // array for deals from SearchBar
    currentDealId: null // variable to set current deal id for DealDetail component
  }
  // set value for array deals from fetching api for DealList component
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals()
    this.setState({ deals })
  }
  // set value for array dealsFromSearch from fetching api and clear values with condition for SearchBar component
  searchDeals =  async (searchTerm) => {
    let dealsFromSearch = []
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealSearchResults(searchTerm)
    }
    this.setState({ dealsFromSearch })
  }
  // set id for current deal by clicking on a certain deal in DealList component
  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId
    })
  }
  // unset current deal id by clicking on Back button in DealDetail component
  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null
    })
  }
  // find id of each deal in deals array for DealDetail (all info of a deal)
  currentDeal = () => {
    return this.state.deals.find((deal) => deal.key === this.state.currentDealId)
  }

  render() {
    // if currentDealId in state not null (we clicked on a deal), then we show DealDetail
    if (this.state.currentDealId) {
      return <DealDetail 
                initialDealData={this.currentDeal()} 
                onBack={this.unsetCurrentDeal}
              />
    }
    // if array dealsFromSearch > 0, then dealsToDisplay = dealsFromSearch (results from search), 
    // otherwise dealsToDisplay = deals (all deals)
    const dealsToDisplay = 
      this.state.dealsFromSearch.length > 0 
      ? this.state.dealsFromSearch
      : this.state.deals
    // if there is value in dealsToDisplay, show SearchBar and DealList
    if (dealsToDisplay.length > 0) {
      return (
        <View>
          <SearchBar searchDeals={this.searchDeals} />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
      )
    }
    // by default it shows Text
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Bakesale</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 40
  }
})