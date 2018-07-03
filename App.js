import React, { Component } from "react";
import { AppRegistry, View, Text  } from 'react-native';
import { StackNavigator } from 'react-navigation';

// Screens
import FilmsHomePage from './jsApp/FilmsHomePage';
import FilmDetailsPage from './jsApp/FilmDetailsPage';


// StackNavigator
const myApplication = StackNavigator({
  HomeFilmPage: { screen: FilmsHomePage },
  DetailsFilmPage: { screen: FilmDetailsPage },
});

export default myApplication;