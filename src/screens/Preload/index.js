import React, {useEffect, useContext} from 'react';
//import {Text} from 'react-native';
import {Container, LoadingIcon} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import { UserContext } from '../../contexts/UserContext';
import Api from '../../Api';

import BarberLogo from '../../assets/barber.svg';

export default () => {
	const {dispatch: userDispatch} = useContext(UserContext);
	const navigation = useNavigation();

	useEffect(() => {
		const checkToken = async () => {
			const token = await AsyncStorage.getItem('token');
			if (token !== null) {
				//valida o token
				let res = await Api.checkToken(token);
				if (res.token) {
					// console.log(token); // introduzido
				 	await AsyncStorage.setItem('token', res.token);

				 	userDispatch({
				 		type: 'setAvatar',
				 		payload: {
				 			avatar: res.data.avatar
				 		}
				 	});

				 	navigation.reset({
				 		routes: [{name: 'MainTab'}]
				 	});

				} else {
					// console.log('Achou um token, mas não é válido');
				 	navigation.navigate('SignIn');
				}
			} else {
				//manda pro login
				// console.log('Não achou um token');
				navigation.navigate('SignIn');
			}
		};
		checkToken();
	}, []);

	return (
		<Container>
			<BarberLogo width="100%" height="160" />
			<LoadingIcon size="large" color="#FFFFFF" />
		</Container>
	);
};
