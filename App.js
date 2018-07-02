import React, { Component } from "react";
import { AppRegistry, View, Text  } from 'react-native';
import { StackNavigator } from 'react-navigation';

// Screens
import FilmsHomePage from './js/FilmsHomePage';
import FilmDetailsPage from './js/FilmDetailsPage';


// StackNavigator
const myApplication = StackNavigator({
  HomeFilmPage: { screen: FilmsHomePage },
  DetailsFilmPage: { screen: FilmDetailsPage },
});

export default myApplication;