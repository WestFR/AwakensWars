import React, { Component } from "react";
import { Platform, Alert, ActionSheetIOS, Linking } from 'react-native';


export default class AlertsManager extends React.Component {

	constructor(props) {
        super(props);
        this.websiteLink = "https://www.stevenfrancony.fr";

        this.appStoreLinkAndroid = "";
        this.appStoreLinkIOS = "";
    }

	showInformationsAlert = () => {

		if(Platform.OS == "ios") {
			ActionSheetIOS.showActionSheetWithOptions({
  				options: ['About', 'Rate me', 'Others apps', 'Cancel'],
  				cancelButtonIndex: 3,
  				title: 'App informations',
  				message: 'Please choose the desired action to get the information from the application.',
			},
			(buttonIndex) => {
				
				if (buttonIndex === 0) { this.showAboutAlert(); }
  				if (buttonIndex === 1) { this.checkIOSRateMeLink(); }
  				if (buttonIndex === 2) { this.checkOthersAppsLink(); }
			});
		} else {
			Alert.alert(
		  		'App informations',
		  		'Please choose the desired action to get the information from the application.',
		  			[
		    			{text: 'About', onPress: () => this.showAboutAlert() },
		    			{text: 'Rate me', onPress: () => this.checkAndroidRateMeLink() },
		    			{text: 'Others apps', onPress: () => this.checkOthersAppsLink() },
		    			{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
		  			],
		  		{ cancelable: false }
			)
		}
	}



	// MARK : - Custom Methods for helpers

	checkIOSRateMeLink() {
		if(this.appStoreLinkIOS != "") { Linking.openURL(this.appStoreLinkIOS); } else { this.showRateMeAlert(); } 
	}

	checkAndroidRateMeLink() {
		if(this.appStoreLinkAndroid != "") { Linking.openURL(this.appStoreLinkAndroid); } else { this.showRateMeAlert(); }
	}

	checkOthersAppsLink() {
		if(this.websiteLink != "") { Linking.openURL(this.websiteLink); } else { this.showOthersAppAlert(); }
	}

	showAboutAlert() {
		Alert.alert(
			'About',
			'First mobile application developed using React Native technology by an independent French developer !\n\nThis application uses an API for displaying game data.\n(https://swapi.co)\n\nThe wallpapers and images used in the application come from open-source sites and are not subject to copyright.\n\nThe source code of the application is available on GitHub for anyone interested in hybrid development (WestFR).');
	}

	showRateMeAlert() {
		Alert.alert(
  			'Error',
  			'The application is not published so no page of the store is available.\n\n See "AlertsManager.js" file if your app is published.');
	}

	showOthersAppAlert() {
		Alert.alert(
  			'Error',
  			'No website URL for this developer is defined, see AlertsManager.js');
	}
}