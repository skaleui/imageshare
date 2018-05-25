import React from 'react';
import { View, ScrollView } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Icon } from 'native-base';

import Header from '../components/Header';
import Gallery from '../components/Gallery';
import ActivityIndicator from '../components/ActivityIndicator';

class ImagesList extends React.component {
	static navigationOptions = {
		tabBarIcon: ({tintColor}) => (
			<Icon name='list' style={{fontSize: 40, color: tintColor}} />
		),
		drawerLabel: 'All Images'
	};

	componentWillMount(){
		this.props.fetchImages();
	}

	componentWillReceiveProps(nextProps){
		if(!this.props.addImage && nextProps.addingImage){
			this.scrollable.scrollTo({y: 0});
		}
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<header 
					onMenuButtonPress{() => 
						this.props.navigation.navigate('DrawOpen')
					}
					onCameraButtonPress{() =>
						this.props.navigation.navigate('Camera')
					}
				/>
				<ScrollView ref={(scrollable) => { this.scrollable = scrollable; }}>
					{ this.props.addinfImage && <ActivityIndicator message='Adding image'/> }
					<Gallery iageList={this.props.images} loading={this.props.fetchingImages} />
				</ScrollView>
			</View>
		);
	}
} 

function mapstateToProps(state) {
	return { 
		images: state.imageReducer.images, 
		addingImage: state.imageReducer.addingImage,
		fetchingImages: state.imageReducer.fetchingImages
	};
}

function mapStateActionsToProps(dispatch) {
	return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapStateActionsToProps)(ImagesList);
