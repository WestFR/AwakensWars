import React, { Component } from "react";
import { AppRegistry, StyleSheet, FlatList, ActivityIndicator, Text, View  } from 'react-native';
import { List, ListItem } from "react-native-elements";


export default class FilmsHomePage extends React.Component {

  static navigationOptions = {
    title: 'AwakensWars : Films',
  };

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
    return fetch('https://swapi.co/api/films')
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

    const { navigate } = this.props.navigation;

    if(this.state.isLoading) {
      return(
        <View style={styles.centerContainer}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
    
    <View style={styles.simpleContainer}>

        <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => (
            
            <ListItem 
                style={styles.simpleRow}
                roundAvatar
                title={item.title}
                subtitle={item.opening_crawl}
                avatar={{ uri: item.picture }}
                onPress={() => navigate('DetailsFilmPage',{title:item.title,url:item.url})}
            />
          )}
          keyExtractor={item => item.title}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />

      </View>

    );
  }
}


const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  simpleContainer: {
    flex: 1
  },
  simpleRow: {
    height: 200
  }
});




