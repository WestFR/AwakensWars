import React, { Component } from "react";
import { Platform } from 'react-native';


export default class ApiManager extends React.Component {

	constructor(props) {
        super(props);
    }


    // MARK : - API Methods path

  	// MARK : - GetAllFilms Informations
  	getAllFilms = (classCallback) => {
      fetch('https://swapi.co/api/films')
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
	          refreshing: false,
	          dataSource: responseJson,
	        }, function(){


              
	          var characetersInfos = []
	          classCallback.state.dataSource.characters.forEach(function(element, index) {
	          	
	          	fetch(element)
			      .then((response) => response.json())
			      .then((responseJson) => {

			      	characetersInfos.push(responseJson)

			        classCallback.setState({
			          refreshing: false,
			          characterDataSource: characetersInfos,
			        }, function(){

			        });

			      })
			      .catch((error) =>{
			        console.error(error);
	      		});

	          });


	          var planetsInfos = []
	          classCallback.state.dataSource.planets.forEach(function(element, index) {
	          	
	          	fetch(element)
			      .then((response) => response.json())
			      .then((responseJson) => {

			      	planetsInfos.push(responseJson)

			        classCallback.setState({
			          refreshing: false,
			          planetDataSource: planetsInfos,
			        }, function(){

			        });

			      })
			      .catch((error) =>{
			        console.error(error);
	      		});

	          });


	          var starshipsInfos = []
	          classCallback.state.dataSource.starships.forEach(function(element, index) {
	          	
	          	fetch(element)
			      .then((response) => response.json())
			      .then((responseJson) => {

			      	starshipsInfos.push(responseJson)

			        classCallback.setState({
			          refreshing: false,
			          starshipDataSource: starshipsInfos,
			        }, function(){

			        });

			      })
			      .catch((error) =>{
			        console.error(error);
	      		});

	          });


	          var vehiclesInfos = []
	          classCallback.state.dataSource.vehicles.forEach(function(element, index) {
	          	
	          	fetch(element)
			      .then((response) => response.json())
			      .then((responseJson) => {

			      	vehiclesInfos.push(responseJson)

			        classCallback.setState({
			          refreshing: false,
			          vehiclesDataSource: vehiclesInfos,
			        }, function(){

			        });

			      })
			      .catch((error) =>{
			        console.error(error);
	      		});

	          });


	          var speciesInfos = []
	          classCallback.state.dataSource.species.forEach(function(element, index) {

	          	if (index === classCallback.state.dataSource.species.length - 1) { 
	          		
	          		fetch(element)
				      .then((response) => response.json())
				      .then((responseJson) => {

				      	speciesInfos.push(responseJson)

				        classCallback.setState({
				          isLoading: false,
				          refreshing: false,
				          speciesDataSource: speciesInfos,
				        }, function(){

				        });

				      })
				      .catch((error) =>{
				        console.error(error);
		      		});
		          	

				} else {

					fetch(element)
				      .then((response) => response.json())
				      .then((responseJson) => {

				      	speciesInfos.push(responseJson)

				        classCallback.setState({
				          refreshing: false,
				          speciesDataSource: speciesInfos,
				        }, function(){

				        });

				      })
				      .catch((error) =>{
				        console.error(error);
		      		});

				}

	          });

	         })


	      })
	      .catch((error) =>{
	        console.error(error);
	      });
  	};


  	// MARK : - GetOneCharacter Information
  	getCharacterInfos = (classCallback) => {
    	const { params } = classCallback.props.navigation.state;

	    return fetch(params.url)
	      .then((response) => response.json())
	      .then((responseJson) => {

	        classCallback.setState({
	          isLoading: false,
	          dataSource: responseJson,
	        }, function(){

	        });

	      })
	      .catch((error) =>{
	        console.error(error);
	      });
	};

}