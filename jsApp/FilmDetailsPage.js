import React, { Component } from "react";

import { AppRegistry, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { ScrollView, FlatList, Text } from 'react-native';
import { List, ListItem, Button } from "react-native-elements";

import I18n from 'react-native-i18n';
import { strings } from '../localizables/localizables';
import Moment from 'moment';

import ApiManager from "./ApiManager/ApiManager";
import AlertsManager from "./UIManager/AlertsManager";


export default class FilmDetailsPage extends React.Component {
  
  static navigationOptions = ({ navigation }) => ({
    headerTitle: I18n.t('detailFilmTitle') + `${navigation.state.params.title}`,
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

    Moment.locale(I18n.currentLocale());

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
        {this.renderHeader(I18n.t('detailGeneral'))}

        <ListItem 
                  style={styles.simpleRow}
                  title= { I18n.t('detailFilmName') + `${this.state.dataSource.title}` }
                  hideChevron={true}
        />

        <ListItem 
                  style={styles.simpleRow}
                  title={ I18n.t('detailFilmSynopsis') + `${this.state.dataSource.opening_crawl.substring(0,25)}...` } 
                  onPress={() => Alert.alert(I18n.t('detailFilmAllSynopsis'), `\n${this.state.dataSource.opening_crawl}`)}
        />

        <ListItem 
                  style={styles.simpleRow}
                  title={ I18n.t('detailFilmProducer') + `${this.state.dataSource.producer}` } 
                  hideChevron={true}
        />

        <ListItem 
                  style={styles.simpleRow}
                  title={ I18n.t('detailFilmDirector') + `${this.state.dataSource.director}` } 
                  hideChevron={true}
        />

        <ListItem 
                  style={styles.simpleRow}
                  title={ I18n.t('detailFilmReleaseDate') + `${Moment(this.state.dataSource.release_date).format('d MMMM YYYY')}`} 
                  hideChevron={true}
        />

      </View>


      <FlatList
            data={this.state.characterDataSource}
            ListHeaderComponent={this.renderHeader(I18n.t('detailCharacters'))}
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
            ListHeaderComponent={this.renderHeader(I18n.t('detailPlanets'))}
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
            ListHeaderComponent={this.renderHeader(I18n.t('detailStarships'))}
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
            ListHeaderComponent={this.renderHeader(I18n.t('detailVehicles'))}
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
            ListHeaderComponent={this.renderHeader(I18n.t('detailSpecies'))}
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