import React, { Component } from "react";

import { AppRegistry, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { ScrollView, FlatList, Text } from 'react-native';
import { List, ListItem, Button } from "react-native-elements";

import I18n from 'react-native-i18n';
import { strings } from '../Ressources/Localizables/localizables';

import styles from '../Ressources/Styles/Style';

import ApiManager from "../ApiManager/ApiManager";
import AlertsManager from "../UIManager/AlertsManager";


export default class VehicleDetailsPage extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: I18n.t('detailVehicleTitle') + `${navigation.state.params.title}`,
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
    APIManager.getStarshipOrVehicleInfos(this);
  }


  handleRefresh = () => {
    this.setState({
        refreshing: true
      }, 
      () => {
        APIManager.getStarshipOrVehicleInfos(this);
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
                  title= { I18n.t('detailsVehicleName') + `${this.state.dataSource.name}` }
                  hideChevron={true}
        />

        <ListItem
                  title= { I18n.t('detailStarshipModel') + `${this.state.dataSource.model}` }
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailStarshipClass') + `${this.state.dataSource.starship_class}` } 
                  hideChevron={true}
        />


        {this.renderHeader(I18n.t('detailDetails'))}

        <ListItem
                  title={ I18n.t('detailStarshipCost') + `${this.state.dataSource.cost_in_credits}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailStarshipLength') + `${this.state.dataSource.length}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailStarshipPassengers') + `${this.state.dataSource.passengers}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailStarshipConsumables') + `${this.state.dataSource.consumables}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailStarshipCargoCapacity') + `${this.state.dataSource.cargo_capacity}` } 
                  hideChevron={true}
        />

      </View>

      <FlatList
            data={this.state.characterDataSource}
            ListHeaderComponent={this.renderHeader(I18n.t('detailsCharacters'))}
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
            ListHeaderComponent={this.renderHeader(I18n.t('detailsFilms'))}
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