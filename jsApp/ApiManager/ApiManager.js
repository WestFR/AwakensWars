import React, { Component } from "react";
import { Platform } from 'react-native';


export default class ApiManager extends React.Component {

	constructor(props) {
        super(props);
    }

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
	          classCallback.state.dataSource.characters.forEach(function(elementURL, index) {
	          	APIManager.getCharactersInfos(classCallback, elementURL, characetersInfos, true);
	          });

	          var planetsInfos = []
	          classCallback.state.dataSource.planets.forEach(function(elementURL, index) {
	          	APIManager.getPlanetsInfos(classCallback, elementURL, planetsInfos, true);
	          });

	          var starshipsInfos = []
	          classCallback.state.dataSource.starships.forEach(function(elementURL, index) {
	          	APIManager.getStarshipsInfos(classCallback, elementURL, starshipsInfos, true);
	          });

	          var vehiclesInfos = []
	          classCallback.state.dataSource.vehicles.forEach(function(elementURL, index) {
	          	APIManager.getVehiclesInfos(classCallback, elementURL, vehiclesInfos, true);
	          });

	          var speciesInfos = []
	          classCallback.state.dataSource.species.forEach(function(elementURL, index) {

	          	if (index === classCallback.state.dataSource.species.length - 1) { 
	          		APIManager.getSpeciesInfos(classCallback, elementURL, speciesInfos, false);
				} else {
					APIManager.getSpeciesInfos(classCallback, elementURL, speciesInfos, true);
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
	          refreshing: false,
	          dataSource: responseJson,
	        }, function(){

	          var filmsInfos = []
	          classCallback.state.dataSource.films.forEach(function(elementURL, index) {
	          	APIManager.getFilmsInfos(classCallback, elementURL, filmsInfos, true);
	          });

	          var speciesInfos = []
	          classCallback.state.dataSource.species.forEach(function(elementURL, index) {
	          	APIManager.getSpeciesInfos(classCallback, elementURL, speciesInfos, true);
	          });

	          var vehiclesInfos = []
	          classCallback.state.dataSource.vehicles.forEach(function(elementURL, index) {
	          	APIManager.getVehiclesInfos(classCallback, elementURL, vehiclesInfos, true);
	          });

	          var starshipsInfos = []
	          classCallback.state.dataSource.starships.forEach(function(elementURL, index) {
				APIManager.getStarshipsInfos(classCallback, elementURL, starshipsInfos, true);
	          });

	          var planetsInfos = []
	          APIManager.getPlanetsInfos(classCallback, classCallback.state.dataSource.homeworld, planetsInfos, false);

	        });

	      })
	      .catch((error) =>{
	        console.error(error);
	      });
	};

	// MARK : - GetOnePlanet Informations
	getPlanetInfos = (classCallback) => {
		const { params } = classCallback.props.navigation.state;

	    return fetch(params.url)
	      .then((response) => response.json())
	      .then((responseJson) => {

	        classCallback.setState({
	          refreshing: false,
	          dataSource: responseJson,
	        }, function(){

	          var residentsInfos = []
	          classCallback.state.dataSource.residents.forEach(function(elementURL, index) {
	          	APIManager.getCharactersInfos(classCallback, elementURL, residentsInfos, true);
	          });

	          var filmsInfos = []
	          classCallback.state.dataSource.films.forEach(function(elementURL, index) {

	          	if (index === classCallback.state.dataSource.films.length - 1) { 
	          		APIManager.getFilmsInfos(classCallback, elementURL, filmsInfos, false);
				} else {
					APIManager.getFilmsInfos(classCallback, elementURL, filmsInfos, true);
				}

	          });

	        });

	      })
	      .catch((error) =>{
	        console.error(error);
	      });
	}

	// MARK : - GetStarship Or GetVehicle Information
	getStarshipOrVehicleInfos = (classCallback) => {
		const { params } = classCallback.props.navigation.state;

	    return fetch(params.url)
	      .then((response) => response.json())
	      .then((responseJson) => {

	        classCallback.setState({
	          refreshing: false,
	          dataSource: responseJson,
	        }, function(){

	          var pilotsInfos = []
	          classCallback.state.dataSource.pilots.forEach(function(elementURL, index) {
	          	APIManager.getPlanetsInfos(classCallback, elementURL, pilotsInfos, true);
	          });

	          var filmsInfos = []
	          classCallback.state.dataSource.films.forEach(function(elementURL, index) {
	          	
	          	if (index === classCallback.state.dataSource.films.length - 1) { 
	          		APIManager.getFilmsInfos(classCallback, starshipsInfos, filmsInfos, false);
				} else {
					APIManager.getFilmsInfos(classCallback, starshipsInfos, filmsInfos, true);
				}

	          });

	        });

	      })
	      .catch((error) =>{
	        console.error(error);
	      });
	}

	// MARK : - GetSpecie Information
	getSpecieInfos = (classCallback) => {
		const { params } = classCallback.props.navigation.state;

	    return fetch(params.url)
	      .then((response) => response.json())
	      .then((responseJson) => {

	        classCallback.setState({
	          refreshing: false,
	          dataSource: responseJson,
	        }, function(){
			  
			  var homeworldInfos = []
	          APIManager.getPlanetsInfos(classCallback, classCallback.state.dataSource.homeworld, peoplesInfos, true);

	          var peoplesInfos = []
	          classCallback.state.dataSource.people.forEach(function(elementURL, index) {
	          	APIManager.getPlanetsInfos(classCallback, elementURL, peoplesInfos, true);
	          });

	          var filmsInfos = []
	          classCallback.state.dataSource.films.forEach(function(elementURL, index) {
	          	
	          	if (index === classCallback.state.dataSource.films.length - 1) { 
	          		APIManager.getFilmsInfos(classCallback, starshipsInfos, filmsInfos, false);
				} else {
					APIManager.getFilmsInfos(classCallback, starshipsInfos, filmsInfos, true);
				}

	          });

	        });

	      })
	      .catch((error) =>{
	        console.error(error);
	      });
	}

	// MARK : - GetVechicle Information
	getVechicleInfos = (classCallback, url, array, isLoading) => {
		const { params } = classCallback.props.navigation.state;

	    return fetch(params.url)
	      .then((response) => response.json())
	      .then((responseJson) => {

	        classCallback.setState({
	          isLoading: isLoading,
	          refreshing: false,
	          dataSource: responseJson,
	        }, function(){

	          var pilotsInfos = []
	          classCallback.state.dataSource.pilots.forEach(function(elementURL, index) {
	          	APIManager.getPlanetsInfos(classCallback, elementURL, residentsInfos, true);
	          });

	          var filmsInfos = []
	          classCallback.state.dataSource.films.forEach(function(elementURL, index) {
	          	APIManager.getFilmsInfos(classCallback, elementURL, planetsInfos, true);
	          });

	        });

	      })
	      .catch((error) =>{
	        console.error(error);
	      });
	}

	// MARK : - GetFilms Informations
	getFilmsInfos = (classCallback, url, array, isLoading) => {

		return fetch(url)
			.then((response) => response.json())
	        .then((responseJson) => {
		     
			    array.push(responseJson)

			    if(!isLoading) {
			    	classCallback.setState({
				    	isLoading: isLoading,
				        refreshing: false,
				        filmDataSource: array,
				    }, function(){});
			    }
			    else {
					classCallback.setState({
					    refreshing: false,
					    filmDataSource: array,
					}, function(){});
				}

			})
			.catch((error) =>{
			    console.error(error);
	      	});
	}

  	// MARK : - GetCharacters Informations
  	getCharactersInfos = (classCallback, url, array, isLoading) => {

  		return fetch(url)
			.then((response) => response.json())
	        .then((responseJson) => {
		     
			    array.push(responseJson)

			    if(!isLoading) {
			    	classCallback.setState({
				    	isLoading: isLoading,
				        refreshing: false,
				        characterDataSource: array,
				    }, function(){});
			    } else {
			    	classCallback.setState({
				    	refreshing: false,
				    	characterDataSource: array,
					}, function(){});
			    }

			})
			.catch((error) =>{
			    console.error(error);
	      	});
  	}

  	// MARK : - GetPlanets Informations
  	getPlanetsInfos = (classCallback, url, array, isLoading) => {

  		return fetch(url)
			.then((response) => response.json())
			.then((responseJson) => {

				array.push(responseJson)

				if(!isLoading) {
					classCallback.setState({
				    	isLoading: isLoading,
				        refreshing: false,
				        planetDataSource: array,
				    }, function(){});
				}
				else {
					classCallback.setState({
					    refreshing: false,
					    planetDataSource: array,
					}, function(){});
				}

			})
			.catch((error) =>{
			     console.error(error);
	      	});
  	}

  	// MARK : - GetStarships Informations
  	getStarshipsInfos = (classCallback, url, array, isLoading) => {

  		return fetch(url)
			.then((response) => response.json())
	        .then((responseJson) => {

			    array.push(responseJson)

			    if(!isLoading) {
				    classCallback.setState({
				    	isLoading: isLoading,
				        refreshing: false,
				        starshipDataSource: array,
				    }, function(){});
				} else {
					classCallback.setState({
			        	refreshing: false,
			        	starshipDataSource: array,
			    	}, function(){});
				}

			})
			.catch((error) =>{
			    console.error(error);
	      	});
  	}

  	// MARK : - GetVehicles Informations
  	getVehiclesInfos = (classCallback, url, array, isLoading) => {

  		return fetch(url)
			.then((response) => response.json())
			.then((responseJson) => {

			    array.push(responseJson)

			    if(!isLoading) {
			    	classCallback.setState({
			    		isLoading: isLoading,
				        refreshing: false,
				        vehiclesDataSource: array,
			    	}, function(){});
			    } else {
			    	classCallback.setState({
			        	refreshing: false,
			        	vehiclesDataSource: array,
			    	}, function(){});
			    }

			})
			.catch((error) =>{
			    console.error(error);
	      	});
  	}

  	// MARK : - GetSpecies Informations
  	getSpeciesInfos = (classCallback, url, array, isLoading) => {

  		return fetch(url)
			.then((response) => response.json())
			.then((responseJson) => {

			    array.push(responseJson)

			    if(!isLoading) {
			    	classCallback.setState({
			    		isLoading: isLoading,
			        	refreshing: false,
			        	speciesDataSource: array,
			    	}, function(){});
			    } else {
			    	classCallback.setState({
			        	refreshing: false,
			        	speciesDataSource: array,
			    	}, function(){});
			    }

			})
			.catch((error) =>{
			    console.error(error);
	      	});
  	}
}