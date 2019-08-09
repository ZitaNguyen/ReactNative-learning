import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native'
import ajax from './src/ajax'
import DealList from './src/components/DealList'
import DealDetail from './src/components/DealDetail'
import SearchBar from './src/components/SearchBar'

export default class App extends Component {
  // position currently, relative
  titleXPos = new Animated.Value(0)
  state = {
    deals: [], // array for deals fetch from api
    dealsFromSearch: [], // array for deals from SearchBar
    currentDealId: null, // variable to set current deal id for DealDetail component
    activeSearchTerm: '' // to be able to keep searchTerm on SearchBar when click Back
  }
  // an animated function to move the word Bakesale LEFT and RIGHT 
  animatedTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 150 //width of screen substract width of word 
    Animated.timing(this.titleXPos, { 
      toValue: direction * width/2, 
      duration: 1000, // duration 1s to ensure animation not too fast
      easing: Easing.ease // define motion 
    }).start(( {finished} ) => { 
      if ( finished ) {
        this.animatedTitle(-1 * direction) 
      }
    })
    // if animation is interrupted, finished = false
    // if previous animation finished successfully, go for new animation
    // if not, no more animation  
  }
  // set value for array deals from fetching api for DealList component
  async componentDidMount() {
    this.animatedTitle()
    const deals = await ajax.fetchInitialDeals()
    this.setState({ deals })
  }
  // set value for array dealsFromSearch from fetching api and clear values with condition for SearchBar component
  searchDeals =  async (searchTerm) => {
    let dealsFromSearch = []
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealSearchResults(searchTerm)
    }
    this.setState({ dealsFromSearch, activeSearchTerm: searchTerm })
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
          <SearchBar 
            searchDeals={this.searchDeals} 
            initialSearchTerm={this.state.activeSearchTerm} 
          />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
      )
    }
    // before successfully fetch api results, it shows Text
    return (
      <Animated.View style={[{ left: this.titleXPos }, styles.container]}>
        <Text style={styles.header}>Bakesale</Text>
      </Animated.View>
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