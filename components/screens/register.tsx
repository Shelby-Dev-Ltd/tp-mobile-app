import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

import { useNavigation } from '@react-navigation/native'; 
import FormInput from "../ui/formInput";
import LoginButton from "../ui/loginButton";
import RegisterButton from "../ui/registerButton";

export default function Register() {
    // const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Image
                    style={styles.image}
                    source={require('../../assets/auth/register.png')}
                />
            </View>

            <View>
                <Text style={{
                    color: '#333333',
                    fontSize: 34,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    marginLeft: 25,
                    marginTop: 230,
                }}>
                    Register
                </Text>
            </View>

            <View style={styles.form}>

                <Text style={styles.text}>
                    Full Name
                </Text>

                <FormInput 
                placeholder="i.e. John Doe"
                iconName="user"
                secureTextEntry={false}
                />

                <Text style={styles.text}>
                    Email
                </Text>

                <FormInput 
                placeholder="Enter your email" 
                iconName='user' 
                secureTextEntry={false} 
                />

                <Text style={styles.text}>
                    Password
                </Text>

                <FormInput 
                placeholder="Create New Password" 
                iconName='password' 
                secureTextEntry={false} 
                />

                <LoginButton
                    textBtn="Create Account"
                    onPress={() => this._handleSubmit()}
                />

                <RegisterButton
                    text="Already have an account?"
                    textBtn="Login"
                    onPress={() => this._handleSubmit()}
                />

            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },

    containerHeader: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 150,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom: 30,
    },

    image: {
        width: 200,
        height: 250,
    },

    text: {
        paddingBottom: 10,
        color: '#333333',
        fontSize: 13,
        // fontWeight: 'bold',
        textAlign: 'left',
    },

    containerForm: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
    },

    formTitle: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
    },

    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
    },

    form: {
        marginLeft: 25,
        marginRight: 25,
        width: '100%',
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

});