import React, { Component } from "react";
import { AppRegistry, StyleSheet, ScrollView, FlatList, ActivityIndicator, Text, View, Alert } from 'react-native';
import { List, ListItem } from "react-native-elements";

import Moment from 'moment';


export default class FilmDetailsPage extends React.Component {
  
  static navigationOptions = ({ navigation }) => ({
      title: 'Film : ' + `${navigation.state.params.title}`,
    });

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
    const { params } = this.props.navigation.state;

    return fetch(params.url)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          refreshing: false,
          dataSource: responseJson,
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

    const { params } = this.props.navigation.state;
    const { dataSource } = this.state;

    Moment.locale('en');

    if(this.state.isLoading) {
      return(
        <View style={styles.centerContainer}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(

    <ScrollView>

      <ListItem 
                style={styles.simpleRow}
                title={`Film name : ${this.state.dataSource.title}`}
                hideChevron={true}
      />

      <ListItem 
                style={styles.simpleRow}
                title={`Synopsis : ${this.state.dataSource.opening_crawl.substring(0,25)}...`} 
                onPress={() => Alert.alert('Synopsis Details', `\n${this.state.dataSource.opening_crawl}`)}
      />

      <ListItem 
                style={styles.simpleRow}
                title={`Producer : ${this.state.dataSource.producer}`} 
                hideChevron={true}
      />

      <ListItem 
                style={styles.simpleRow}
                title={`Director : ${this.state.dataSource.director}`} 
                hideChevron={true}
      />

      <ListItem 
                style={styles.simpleRow}
                title={`Release date : ${Moment(this.state.dataSource.release_date).format('d MMMM YYYY')}`} 
                hideChevron={true}
      />

    </ScrollView>

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
    height: 200,
  }
});