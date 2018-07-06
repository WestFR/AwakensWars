import React, { Component } from "react";
import { Platform, Alert, ActionSheetIOS, Linking } from 'react-native';

import I18n from 'react-native-i18n';
import { strings } from '../Ressources/Localizables/localizables';


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
  				options: [I18n.t('aboutTitle'), I18n.t('rateMeTitle'), I18n.t('othersAppsTitle'), I18n.t('cancelTitle')],
  				cancelButtonIndex: 3,
  				title: I18n.t('alertMainTitle'),
  				message: I18n.t('alertMainDesc'),
			},
			(buttonIndex) => {
				
				if (buttonIndex === 0) { this.showAboutAlert(); }
  				if (buttonIndex === 1) { this.checkIOSRateMeLink(); }
  				if (buttonIndex === 2) { this.checkOthersAppsLink(); }
			});
		} else {
			Alert.alert(
		  		I18n.t('alertMainTitle'),
		  		I18n.t('alertMainDesc'),
		  			[
		    			{text: I18n.t('aboutTitle'), onPress: () => this.showAboutAlert() },
		    			{text: I18n.t('rateMeTitle'), onPress: () => this.checkAndroidRateMeLink() },
		    			{text: I18n.t('othersAppsTitle'), onPress: () => this.checkOthersAppsLink() },
		    			{text: I18n.t('cancelTitle'), onPress: () => console.log('cancel_pressed'), style: 'cancel'},
		  			],
		  		{ cancelable: true }
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

	showBasicAlert(title, message) {
		Alert.alert(title,message);
	}

	showAboutAlert() {
		Alert.alert(
			I18n.t('aboutTitle'),
			I18n.t('aboutDesc'));
		}

	showRateMeAlert() {
		Alert.alert(
  			I18n.t('rateMeTitle'),
  			I18n.t('rateMeError'));
	}

	showOthersAppAlert() {
		Alert.alert(
  			I18n.t('othersAppsTitle'),
  			I18n.t('othersAppsError'));
	}
}