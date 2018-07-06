import React, { Component } from "react";

import { AppRegistry, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { ScrollView, FlatList, Text } from 'react-native';
import { List, ListItem, Button } from "react-native-elements";

import I18n from 'react-native-i18n';
import { strings } from '../Ressources/Localizables/localizables';

import styles from '../Ressources/Styles/Style';

import ApiManager from "../ApiManager/ApiManager";
import AlertsManager from "../UIManager/AlertsManager";


export default class CharacterDetailsPage extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: I18n.t('detailCharacterTitle') + `${navigation.state.params.title}`,
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
    APIManager.getCharacterInfos(this);
  }


  handleRefresh = () => {
    this.setState({
        refreshing: true
      }, 
      () => {
        APIManager.getCharacterInfos(this);
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
                  title= { I18n.t('detailFilmName') + `${this.state.dataSource.name}` }
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailFilmSynopsis') + `${this.state.dataSource.gender}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailFilmProducer') + `${this.state.dataSource.height}` + `${this.state.dataSource.mass}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailFilmDirector') + `${this.state.dataSource.hair_color}` + `${this.state.dataSource.skin_color}` + `${this.state.dataSource.eye_color}` } 
                  hideChevron={true}
        />

        <ListItem
                  title={ I18n.t('detailFilmReleaseDate') + `${this.state.dataSource.birth_year}` } 
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
            />
          )}
          keyExtractor={item => item.name}
        />

    </ScrollView>

   

    );
  }
}