import React from 'react';
import { 
	View, 
	Text, 
	TextInput, 
	StyleSheet, 
	Button, 
	ActivityIndicator 
} from 'react-native';

import firebase from '@firebase/app';
import '@firebase/auth';

import FormRow from '../components/FormRow';

export default class LoginPage extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			mail: '',
			password: '',
			isLoading: false,
			message: ''
		}
	}

	componentDidMount() {
		// Your web app's Firebase configuration
		var firebaseConfig = {
			apiKey: "AIzaSyBoB9lcpYM4Qn2eNY_QvHaWj-ZvyJkR3_o",
			authDomain: "series-9f111.firebaseapp.com",
			databaseURL: "https://series-9f111.firebaseio.com",
			projectId: "series-9f111",
			storageBucket: "series-9f111.appspot.com",
			messagingSenderId: "876614857373",
			appId: "1:876614857373:web:dad6d5b2ab9429caa41a74"
		};
		// Initialize Firebase
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}

	}

	onChangeHandler(field, value){
		this.setState({
			[field]: value
		});
	}

	tryLogin() {
		this.setState({ isLoading: true, message: '' });
		const { mail, password } = this.state;

		firebase
			.auth()
			.signInWithEmailAndPassword(mail,password)
			.then(user => {
				this.setState({ message: 'Sucesso!' });
				console.log('Usuário logado', user);
			})
			.catch(error => {
				this.setState({ 
					message: this.getMessageByErrorCode(error.code)
				});
				// console.log('Usuário Não encontrado',error);
			})
			.then(() => this.setState({ isLoading: false }))
	}

	getMessageByErrorCode(errorCode) {
		switch (errorCode) {
			case 'auth/wrong-password':
				return 'Senha incorreta';
			case 'auth/user-not-found':
				return 'Usuário não encontrado';
			default:
				return 'Erro desconhecido';
		}
	}

	renderButton() {

		if (this.state.isLoading)
			return <ActivityIndicator />;

		return (
			<View style={styles.button}>
					<Button 
						title="Entrar" 
						onPress={() => this.tryLogin() }/>
				</View>
		)
	}

	renderMessage() {
		const { message } = this.state;
		if (!message)
			return null;
		
			return (
				<View>
					<Text>{ this.state.message }</Text>
				</View>
			);
	}

	render() {
		return (
			<View style={styles.container}>
				<FormRow first>
					<TextInput 
						style={styles.input}
						placeholder="user@mail.com"
						value={this.state.mail} 
						onChangeText={value => this.onChangeHandler('mail',value) }
						/>
				</FormRow>
				<FormRow last>
					<TextInput
						style={styles.input} 
						placeholder="******"
						secureTextEntry
						value={this.state.password} 
						onChangeText={value => this.onChangeHandler('password',value) }
						/>
				</FormRow>

				{ this.renderButton() }
				{ this.renderMessage() }
			
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 10,
		paddingRight: 10
	},
	input: {
		paddingLeft: 5,
		paddingRight:5,
		paddingBottom: 5,
	},

})