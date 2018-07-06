import React, { Component } from "react";

import { AppRegistry, ActivityIndicator, View } from 'react-native';
import { FlatList, Text,  } from 'react-native';
import { List, ListItem, Button } from "react-native-elements";
import SplashScreen from 'react-native-splash-screen';

import I18n from 'react-native-i18n';
import { strings } from '../Ressources/Localizables/localizables';

import styles from '../Ressources/Styles/Style';

import ApiManager from "../ApiManager/ApiManager";
import AlertsManager from "../UIManager/AlertsManager";


export default class FilmsHomePage extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: I18n.t('homeTitle'),
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
    SplashScreen.hide();
    APIManager.getAllFilms(this);
  }


  handleRefresh = () => {
    this.setState({
        refreshing: true
      }, 
      () => {
        APIManager.getAllFilms(this);
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
                roundAvatar
                title={item.title}
                subtitle={`${item.opening_crawl.substring(0,25)}...`} 
                avatar={{ uri: item.picture }}
                onPress={() => navigate('FilmDetailsPage',{title:item.title,url:item.url})}
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

