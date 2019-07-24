import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ajax from './src/ajax'
import DealList from './src/components/DealList'
import DealDetail from './src/components/DealDetail'
import SearchBar from './src/components/SearchBar'

export default class App extends Component {
  state = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null
  }
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals()
    this.setState({ deals })
  }
  searchDeals =  async (searchTerm) => {
    let dealsFromSearch = []
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealSearchResults(searchTerm)
    }
    this.setState({ dealsFromSearch })
  }
  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId
    })
  }
  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null
    })
  }
  currentDeal = () => {
    return this.state.deals.find((deal) => deal.key === this.state.currentDealId)
  }
  render() {
    if (this.state.currentDealId) {
      return <DealDetail 
                initialDealData={this.currentDeal()} 
                onBack={this.unsetCurrentDeal}
              />
    }
    
    const dealsToDisplay = this.state.dealsFromSearch.length > 0 
      ? this.state.dealsFromSearch
      : this.state.deals

    if (dealsToDisplay.length > 0) {
      return (
        <View>
          <SearchBar searchDeals={this.searchDeals} />
          <DealList deals={this.state.deals} onItemPress={this.setCurrentDeal} />
        </View>
      )
    }
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