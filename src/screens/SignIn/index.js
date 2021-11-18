import React, {useState, useContext} from 'react';
//import {Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {UserContext} from '../../contexts/UserContext';

import {
	Container,
	InputArea,
	CustomButton,
	CustonButtonText,
	SignMessageButton,
	SignMessageButtonText,
	SignMessageButtonTextBold,
} from './styles';

import Api from '../../Api';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
	const {dispatch: userDispatch} = useContext(UserContext);
	const navigation = useNavigation();

	const [emailField, setEmailField] = useState('');
	const [passwordField, setPasswordField] = useState('');

	const handleSignClick = async () => {
		if (emailField != '' && passwordField != '') {

			let json = await Api.signIn(emailField, passwordField);
			//console.log(json);
			if (json.token) {
				// alert("DEU CERTO!!!");
				await AsyncStorage.setItem('token', json.token);

				userDispatch({
					type: 'setAvatar',
					payload: {
						avatar: json.data.avatar
					}
				});

				navigation.reset({
					routes: [{name: 'MainTab'}]
				});

			} else {
				alert("Email ou senha inválidos!");
			}

		} else {
			alert("Preencha todos os campos!");
		}
	}

	const handleMessageButtonClick = () => {
		navigation.reset({
			routes: [{name: 'SignUp'}]
		});
	}

	return (
		<Container>
			<BarberLogo width="100%" height="160" />

			<InputArea>
				<SignInput
					IconSvg={EmailIcon} 
					placeholder="Digite seu e-mail" 
					value={emailField} 
					onChangeText={t=>setEmailField(t)}
				/>
				<SignInput 
					IconSvg={LockIcon} 
					placeholder="Digite sua senha" 
					value={passwordField} 
					onChangeText={t=>setPasswordField(t)}
					password={true}
				/>
				<CustomButton onPress={handleSignClick}>
					<CustonButtonText>LOGIN</CustonButtonText>
				</CustomButton>
			</InputArea>
			<SignMessageButton onPress={handleMessageButtonClick}>
				<SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
				<SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
			</SignMessageButton>
		</Container>
	);
};
