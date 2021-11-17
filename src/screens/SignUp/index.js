import React, {useState} from 'react';
//import {Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {

	const navigation = useNavigation();

	const [nameField, setNameField] = useState('');
	const [emailField, setEmailField] = useState('');
	const [passwordField, setPasswordField] = useState('');

	const handleSignClick = async () => {
		if (nameField != '' && emailField != '' && passwordField != '') {
			let res = await Api.signUp(nameField, emailField, passwordField);
			//console.log(res);

			if (res.token) {
				alert("DEU CERTO O CADASTRO!!");
			} else {
				alert("Erro: "+res.error);
			}
		} else {
			alert("Preencha todos os campos!");
		}
	}

	const handleMessageButtonClick = () => {
		navigation.reset({
			routes: [{name: 'SignIn'}]
		});
	}

	return (
		<Container>
			<BarberLogo width="100%" height="160" />

			<InputArea>
				<SignInput
					IconSvg={PersonIcon} 
					placeholder="Digite seu nome" 
					value={nameField} 
					onChangeText={t=>setNameField(t)}
				/>
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
					<CustonButtonText>CADASTRAR</CustonButtonText>
				</CustomButton>
			</InputArea>
			<SignMessageButton onPress={handleMessageButtonClick}>
				<SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
				<SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
			</SignMessageButton>
		</Container>
	);
};
