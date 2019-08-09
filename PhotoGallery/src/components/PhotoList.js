import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, StyleSheet } from 'react-native'
import Photo from './Photo'

export default class PhotoList extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onItemPress: PropTypes.func.isRequired,
    }
    render() {
        return (
            <View>
                <FlatList 
                    data={this.props.data}
                    renderItem={({item}) => <Photo  photo={item}
                                                    onPress={this.props.onItemPress}
                                            />}
                    style={styles.list}
                    numColumns={2}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column'
    }
})
