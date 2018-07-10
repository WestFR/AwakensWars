import React, { Component } from "react";

import { AppRegistry, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { ScrollView, FlatList, Text } from 'react-native';
import { List, ListItem, Button } from "react-native-elements";

import I18n from 'react-native-i18n';
import { strings } from '../Ressources/Localizables/localizables';

import styles from '../Ressources/Styles/Style';

import ApiManager from "../ApiManager/ApiManager";
import AlertsManager from "../UIManager/AlertsManager";


export default class SpecieDetailsPage extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: I18n.t('detailSpecieTitle') + `${navigation.state.params.title}`,
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
    APIManager.getSpecieInfos(this);
  }


  handleRefresh = () => {
    this.setState({
        refreshing: true
      }, 
      () => {
        APIManager.getSpecieInfos(this);
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
                  title= { I18n.t('detailSpecieName') + `${this.state.dataSource.name}` }
                  hideChevron={true}
        />

        <ListItem
                  title= { I18n.t('detailSpecieClassification') + `${this.state.dataSource.classification}` }
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailSpecieDesignation') + `${this.state.dataSource.designation}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailSpecieLanguage') + `${this.state.dataSource.language}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailSpecieHomeworld') + `${this.state.dataSource.homeworld}` } 
                  hideChevron={true}
        />


        {this.renderHeader(I18n.t('detailDetails'))}

        <ListItem
                  title={ I18n.t('detailSpecieHeight') + `${this.state.dataSource.average_height}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailCharacterSpecieHairColor') + `${this.state.dataSource.hair_color}` }
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailCharacterSpecieSkinColor') + `${this.state.dataSource.skin_color}` }
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailCharacterSpecieEyeColor') + `${this.state.dataSource.eye_color}` }
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailSpecieLifespan') + `${this.state.dataSource.average_lifespan}` } 
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
                hideChevron={true}
            />
          )}
          keyExtractor={item => item.name}
        />

      <FlatList
            data={this.state.filmDataSource}
            ListHeaderComponent={this.renderHeader(I18n.t('detailFilms'))}
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