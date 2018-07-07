import React, { Component } from "react";

import { AppRegistry, ActivityIndicator, View, Alert } from 'react-native';
import { ScrollView, FlatList, Text } from 'react-native';
import { List, ListItem, Button } from "react-native-elements";

import I18n from 'react-native-i18n';
import { strings } from '../Ressources/Localizables/localizables';
import Moment from 'moment';

import styles from '../Ressources/Styles/Style';

import ApiManager from "../ApiManager/ApiManager";
import AlertsManager from "../UIManager/AlertsManager";


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

    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { dataSource } = this.state;

    //I18n.currentLocale()
    Moment.locale("en");

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
                  title= { I18n.t('detailFilmName') + `${this.state.dataSource.title}` }
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailFilmSynopsis') + `${this.state.dataSource.opening_crawl.substring(0,25)}...` } 
                  onPress={() => Alert.alert(I18n.t('detailFilmAllSynopsis'), `\n${this.state.dataSource.opening_crawl}`)}
        />

        <ListItem
                  title={ I18n.t('detailFilmProducer') + `${this.state.dataSource.producer}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailFilmDirector') + `${this.state.dataSource.director}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailFilmReleaseDate') + `${Moment(this.state.dataSource.release_date).format('d MMMM YYYY')}`} 
                  hideChevron={true}
        />

      </View>


      <FlatList
            data={this.state.characterDataSource}
            ListHeaderComponent={this.renderHeader(I18n.t('detailCharacters'))}
            renderItem={({item}) => (
            
            <ListItem
                roundAvatar
                title={item.name}
                subtitle={item.gender} 
                avatar={{ uri: item.picture }}
                onPress={() => navigate('CharacterDetailsPage',{title:item.name,url:item.url})}
            />
          )}
          keyExtractor={item => item.name}
        />

      <FlatList
            data={this.state.planetDataSource}
            ListHeaderComponent={this.renderHeader(I18n.t('detailPlanets'))}
            renderItem={({item}) => (
            
            <ListItem
                roundAvatar
                title={item.name}
                subtitle={item.population} 
                avatar={{ uri: item.picture }}
                onPress={() => navigate('PlanetDetailsPage',{title:item.name,url:item.url})}
            />
          )}
          keyExtractor={item => item.name}
        />

      <FlatList
            data={this.state.starshipDataSource}
            ListHeaderComponent={this.renderHeader(I18n.t('detailStarships'))}
            renderItem={({item}) => (
            
            <ListItem
                roundAvatar
                title={item.name}
                subtitle={item.manufacturer} 
                avatar={{ uri: item.picture }}
                onPress={() => navigate('StarshipDetailsPage',{title:item.name,url:item.url})}
            />
          )}
          keyExtractor={item => item.name}
        />

      <FlatList
            data={this.state.vehiclesDataSource}
            ListHeaderComponent={this.renderHeader(I18n.t('detailVehicles'))}
            renderItem={({item}) => (
            
            <ListItem
                roundAvatar
                title={item.name}
                subtitle={item.manufacturer} 
                avatar={{ uri: item.picture }}
                onPress={() => navigate('VehicleDetailsPage',{title:item.name,url:item.url})}
            />
          )}
          keyExtractor={item => item.name}
        />

      <FlatList
            data={this.state.speciesDataSource}
            ListHeaderComponent={this.renderHeader(I18n.t('detailSpecies'))}
            renderItem={({item}) => (
            
            <ListItem
                roundAvatar
                title={item.name}
                subtitle={item.designation} 
                avatar={{ uri: item.picture }}
            />
          )}
          keyExtractor={item => item.name}
        />

    </ScrollView>

   

    );
  }
}