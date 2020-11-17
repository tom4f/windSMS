import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const LoginPage = ({ startLogin, loginUserName, setLoginUserName, loginPassword, setLoginPassword }) => {

    return (
        <View>
            <TextInput
                placeholder="Username..."
                style={styles.input}
                onChangeText={textValue => setLoginUserName(textValue)}
                value={loginUserName}
            />
            <TextInput
                secureTextEntry = { true }
                placeholder="Password..."
                style={styles.input}
                onChangeText={ textValue => setLoginPassword(textValue)}
                value={loginPassword}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={(event) => {
                    startLogin(event);
                    setLoginUserName('');
                    setLoginPassword('');
                }}>
                <Text style={styles.btnText}>
                    <Icon name="plus" size={20} /> Login
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

export default LoginPage;