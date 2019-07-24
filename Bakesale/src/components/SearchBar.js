import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'

import { TextInput, StyleSheet } from 'react-native'

export default class SearchBar extends Component {
    static propTypes = {
        searchDeals: PropTypes.func.isRequired
    }
    state = {
        searchTerm: ''
    }
    debouncedSearchDeals = debounce(this.props.searchDeals, 300)
    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debouncedSearchDeals(this.state.searchTerm)
        })
    }
    render() {
        return (
           <TextInput 
                placeholder="Search Deal..."
                style={styles.input} 
                onChangeText={this.handleChange}
            />
        )
    }
}

const styles = StyleSheet.create({
    input: {
        marginTop: 50,
        marginHorizontal: 12,
        height: 40,
        fontSize: 25
    }
})
