import React, { Component } from "react";
import { Platform } from 'react-native';


export default class ApiManager extends React.Component {

	constructor(props) {
        super(props);
    }


    // MARK : - API Methods path

  	// MARK : - GetAllFilms Informations
  	getAllFilms = (classCallback) => {
      return fetch('https://swapi.co/api/films')
        .then((response) => response.json())
        .then((responseJson) => {

          classCallback.setState({
            isLoading: false,
            refreshing: false,
            dataSource: responseJson.results,
          }, function(){

          });

        })
        .catch((error) =>{
          console.error(error);
        });
  	};


  	// MARK : - GetOneFilm Information
  	getOneFilm = (classCallback) => {
    	const { params } = classCallback.props.navigation.state;

	    fetch(params.url)
	      .then((response) => response.json())
	      .then((responseJson) => {

	        classCallback.setState({
	          isLoading: false,
	          refreshing: false,
	          dataSource: responseJson,
	        }, function(){


	          classCallback.state.dataSource.characters.forEach(function(element, index) {
	          	//this.getCharactersInfos(classCallback, element, index);
	          });
	            /*responseJson.planets
	            responseJson.starships
	            responseJson.vehicles
	            responseJson.species*/
	        });


	      })
	      .catch((error) =>{
	        console.error(error);
	      });
  	};


  	// MARK : - GetOneCharacter Information
  	/*getCharactersInfos = (classCallback, elementUrl, count) => {

	    return fetch(elementUrl)
	      .then((response) => response.json())
	      .then((responseJson) => {

	        classCallback.setState({
	          isLoading: false,
	          refreshing: false,
	          characterDataSource: responseJson,
	        }, function(){

	        });

	      })
	      .catch((error) =>{
	        console.error(error);
	      });
	};*/

}