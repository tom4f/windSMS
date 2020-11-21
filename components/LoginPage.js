import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const LoginPage = ({ getData, loginParams : { username }, loginParams : { password }, setLoginParams }) => {

    return (
        <View>
            <TextInput
                placeholder="Username..."
                style={styles.input}
                onChangeText={    textValue => setLoginParams( current => ({ ...current,  username: textValue }) )     }
                value={username}
            />
            <TextInput
                secureTextEntry = { true }
                placeholder="Password..."
                style={styles.input}
                onChangeText={ textValue => setLoginParams( current => ({ ...current,  password: textValue }) )     }
                value={password}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={(event) => {
                    getData(event);
                    setLoginParams({ username: '', password: '' });
                }}>
                <Text style={styles.btnText}>
                    <Icon name="sign-in" size={20} /> Login
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        margin: 5,
        fontSize: 20
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
    }
});

// type checking
LoginPage.propTypes = {
    loginParams      : PropTypes.object,
    setLoginParams   : PropTypes.func,
    getData       : PropTypes.func
}

export default LoginPage;