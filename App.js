import React, { Component } from "react";
import { AppRegistry, View, Text  } from 'react-native';
import { StackNavigator } from 'react-navigation';

// HomeScreen
import FilmsHomePage from './jsApp/Pages/FilmsHomePage';

// PageDetails Screen
import FilmDetailsPage from './jsApp/Pages/FilmDetailsPage';
import CharacterDetailsPage from './jsApp/Pages/CharacterDetailsPage';
import PlanetDetailsPage from './jsApp/Pages/PlanetDetailsPage';
import StarshipDetailsPage from './jsApp/Pages/StarshipDetailsPage';
import VehicleDetailsPage from './jsApp/Pages/VehicleDetailsPage';
/*import SpecieDetailsPage from './jsApp/Pages/SpecieDetailsPage';*/


// StackNavigator
const myApplication = StackNavigator({
  FilmsHomePage: { screen: FilmsHomePage },
  FilmDetailsPage: { screen: FilmDetailsPage },
  CharacterDetailsPage: { screen: CharacterDetailsPage},
  PlanetDetailsPage: { screen: PlanetDetailsPage},
  StarshipDetailsPage: { screen: StarshipDetailsPage},
  VehicleDetailsPage: { screen: VehicleDetailsPage},
  /*SpecieDetailsPage: { screen: SpecieDetailsPage},*/
});

export default myApplication;