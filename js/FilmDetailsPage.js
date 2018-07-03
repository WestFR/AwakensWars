import React, { Component } from "react";

import { AppRegistry, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { ScrollView, FlatList, Text } from 'react-native';
import { List, ListItem, Button } from "react-native-elements";

import ApiManager from "./ApiManager/ApiManager";
import AlertsManager from "./UIManager/AlertsManager";

import Moment from 'moment';


export default class FilmDetailsPage extends React.Component {
  
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Film : ' + `${navigation.state.params.title}`,
    headerRight: (
      <Button
        onPress={() => Alerts.showInformationsAlert()}
        buttonStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
        icon={{name: 'md-more', type: 'ionicon', size: 24, color: 'blue'}}
        title=""
      />
    ),
  });

  constructor(props){
    super(props);

    APIManager = new ApiManager();
    Alerts = new AlertsManager();
    
    this.state ={ 
      isLoading: true,
      refreshing: false
    }

    //this.getCharactersInfos = this.getCharactersInfos.bind(this);
  }


  componentDidMount(){
    APIManager.getOneFilm(this);
  }


  


  handleRefresh = () => {
    this.setState({
        refreshing: true
      }, 
      () => {
        APIManager.getOneFilm(this);
      }
    );
  };

  renderHeader(titleToShow) {
     return (
      <View style={styles.headerContainer}>
        <Text style={styles.headertext}>
          {titleToShow}
        </Text>
      </View>
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
            data={this.state.characterDataSource}
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
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'grey'
  },
  headertext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  simpleRow: {
    height: 200,
  }
});