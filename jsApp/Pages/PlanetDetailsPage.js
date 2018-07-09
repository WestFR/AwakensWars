import React, { Component } from "react";

import { AppRegistry, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { ScrollView, FlatList, Text } from 'react-native';
import { List, ListItem, Button } from "react-native-elements";

import I18n from 'react-native-i18n';
import { strings } from '../Ressources/Localizables/localizables';

import styles from '../Ressources/Styles/Style';

import ApiManager from "../ApiManager/ApiManager";
import AlertsManager from "../UIManager/AlertsManager";


export default class PlanetDetailsPage extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: I18n.t('detailPlanetTitle') + `${navigation.state.params.title}`,
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
    APIManager.getPlanetInfos(this);
  }


  handleRefresh = () => {
    this.setState({
        refreshing: true
      }, 
      () => {
        APIManager.getPlanetInfos(this);
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


  render() {

    const { params } = this.props.navigation.state;
    const { dataSource } = this.state;

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
                  title= { I18n.t('detailPlanetName') + `${this.state.dataSource.name}` }
                  hideChevron={true}
        />


        {this.renderHeader(I18n.t('detailDetails'))}

        <ListItem
                  title={ I18n.t('detailPlanetCaract') + 
                          `${this.state.dataSource.rotation_period}` + " / " + 
                          `${this.state.dataSource.orbital_period}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailPlanetDiameter') + `${this.state.dataSource.diameter}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailPlanetClimate') + `${this.state.dataSource.climate}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailPlanetGravity') + `${this.state.dataSource.gravity}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailPlanetTerrain') + `${this.state.dataSource.terrain}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailPlanetWater') + `${this.state.dataSource.surface_water}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailPlanetPopulation') + `${this.state.dataSource.population}` } 
                  hideChevron={true}
        />

      </View>

      <FlatList
            data={this.state.characterDataSource}
            ListHeaderComponent={this.renderHeader(I18n.t('detailStarships'))}
            renderItem={({item}) => (
            
            <ListItem
                roundAvatar
                title={item.name}
                subtitle={item.gender} 
                avatar={{ uri: item.picture }}
                hideChevron={true}
            />
          )}
          keyExtractor={item => item.name}
        />

      <FlatList
            data={this.state.filmDataSource}
            ListHeaderComponent={this.renderHeader(I18n.t('detailStarships'))}
            renderItem={({item}) => (
            
            <ListItem
                roundAvatar
                title={item.title}
                subtitle={`${item.opening_crawl.substring(0,25)}...`} 
                avatar={{ uri: item.picture }}
                hideChevron={true}
            />
          )}
          keyExtractor={item => item.name}
        />

     

    </ScrollView>

   

    );
  }
}