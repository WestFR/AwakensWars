import React, { Component } from "react";
import { AppRegistry, StyleSheet, ScrollView, FlatList, ActivityIndicator, Text, View, Alert } from 'react-native';
import { List, ListHeader, ListItem } from "react-native-elements";

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

  renderHeader(titleToShow) {
     return (
      <Text>{titleToShow}</Text>
    )
  }

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
      
      <View>
        {this.renderHeader('General Informations')}

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

      </View>


      <FlatList
            data={this.state.dataSource.characters}
            ListHeaderComponent={this.renderHeader('Characters Informations')}
            renderItem={({item}) => (
            
            <ListItem 
                style={styles.simpleRow}
                roundAvatar
                title={item.title}
                subtitle={'Characters'} 
                avatar={{ uri: item.picture }}
            />
          )}
          keyExtractor={item => item.title}
        />

      <FlatList
            data={this.state.dataSource.planets}
            ListHeaderComponent={this.renderHeader('Planets Informations')}
            renderItem={({item}) => (
            
            <ListItem 
                style={styles.simpleRow}
                roundAvatar
                title={item.title}
                subtitle={'Planets'} 
                avatar={{ uri: item.picture }}
            />
          )}
          keyExtractor={item => item.title}
        />

      <FlatList
            data={this.state.dataSource.starships}
            ListHeaderComponent={this.renderHeader('Starships Informations')}
            renderItem={({item}) => (
            
            <ListItem 
                style={styles.simpleRow}
                roundAvatar
                title={item.title}
                subtitle={'Starships'} 
                avatar={{ uri: item.picture }}
            />
          )}
          keyExtractor={item => item.title}
        />

      <FlatList
            data={this.state.dataSource.vehicles}
            ListHeaderComponent={this.renderHeader('Vehicles Informations')}
            renderItem={({item}) => (
            
            <ListItem 
                style={styles.simpleRow}
                roundAvatar
                title={item.title}
                subtitle={'Vehicles'} 
                avatar={{ uri: item.picture }}
            />
          )}
          keyExtractor={item => item.title}
        />

      <FlatList
            data={this.state.dataSource.species}
            ListHeaderComponent={this.renderHeader('Species Informations')}
            renderItem={({item}) => (
            
            <ListItem 
                style={styles.simpleRow}
                roundAvatar
                title={item.title}
                subtitle={'Species'} 
                avatar={{ uri: item.picture }}
            />
          )}
          keyExtractor={item => item.title}
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