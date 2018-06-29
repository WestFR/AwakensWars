import React, { Component } from "react";

import { StyleSheet, FlatList, ActivityIndicator, Text, View  } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { List, ListItem } from "react-native-elements";

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    
    this.state ={ 
      isLoading: true,
      refreshing: false
    }

  }

  componentDidMount(){
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    return fetch('https://swapi.co/api/people')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          refreshing: false,
          dataSource: responseJson.results,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  };

  handleRefresh = () => {
    this.setState({
        refreshing: true
      }, 
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  render(){

    if(this.state.isLoading) {
      return(
        <View style={styles.centerContainer}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
    
    <View style={styles.simpleContainer}>

        <NavigationBar
            title={titleConfig}
          />

        <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => (
            
            <ListItem
                roundAvatar
                title={item.name}
                subtitle={item.gender}
                avatar={{ uri: item.picture }}
            />
          )}
          keyExtractor={item => item.name}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />

      </View>

    );
  }
}


const titleConfig = {
  title: 'AwakensWars',
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  simpleContainer: {
    flex: 1
  }
});