import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { AlertBox }   from './AlertBox';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const LoginPage = ( { setOrigSettings, setItems, setIsLogged } ) => {

    const [ loginParams, setLoginParams ]   = useState( { username: '', password: '' } );

    const getData = () => {

        if (!loginParams.username || !loginParams.password) {
          AlertBox('No item entered','Please enter username and password');
          return null
      }
    
          axios
              .post(
                  //`http://192.168.1.170/lipnonet/rekreace/api/pdo_read_sms.php`,
                  `https://www.frymburk.com/rekreace/api/pdo_read_sms.php`,
                  loginParams,
                  { timeout: 5000 }
              )
              .then(res => {
    
                    // allForum = JSON.parse(res.data); --> for native xhr.onload 
                    const resp = res.data[0] || res.data;
      
                    console.log(resp.sms_read);
                    console.log(resp.id);
      
                    // if error in response
                    if (typeof resp.sms_read === 'string') {
                        resp.sms_read === 'error' && AlertBox('login Error !','try later...');
                        return null
                    }
      
                    // if no user data
                    if (typeof resp.id === 'string') {
                        setOrigSettings( resp );
                        setItems( resp ); 
                        setIsLogged( true );
                        AlertBox('login Success !','see actual settings...');
                        return null
                    }
                    
                    console.log(res);
                    AlertBox('unknown Error !','try later...');
    
      
              })
              .catch(err => {
                  if (err.response) {
                    // client received an error response (5xx, 4xx)
                    AlertBox('Failed !','error response (5xx, 4xx)');
                    console.log(err.response);
                  } else if (err.request) {
                    // client never received a response, or request never left
                    AlertBox('Failed !','never received a response, or request never left');
                    console.log(err.request);
                  } else {
                    // anything else
                    AlertBox('Failed !','Error: anything else');
                    console.log(err);
                  }
              });   
      }
    

    return (
        <View>
            <TextInput
                placeholder="Username or Email..."
                style={styles.input}
                onChangeText={    textValue => setLoginParams( current => ({ ...current,  username: textValue }) )     }
                value={loginParams.username}
            />
            <TextInput
                secureTextEntry = { true }
                placeholder="Password..."
                style={styles.input}
                onChangeText={ textValue => setLoginParams( current => ({ ...current,  password: textValue }) )     }
                value={loginParams.password}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={(event) => {
                    getData(event);
                    setLoginParams({ username: '', password: '' });
                }}>
                <Text style={styles.btnText}>
                    <Icon name="sign-in" size={15} /> Login
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        padding: 3,
        margin: 3,
        fontSize: 15
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 3,
        margin: 3,
    },
    btnText: {
        height: 25,
        color: 'darkslateblue',
        fontSize: 15,
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