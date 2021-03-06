import React, { useState } from 'react';
import Header         from './Header';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { AlertBox }   from './AlertBox';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ForgetPassword = () => {

    const [ identification, setIdentification ] = useState({});

    const getPasw = () => {

        if (!identification.identification) {
          AlertBox('No item entered','Please enter username or password');
          return null
      }
    
          axios
              .post(
                  `https://www.frymburk.com/rekreace/api/pdo_sms_pasw.php`,
                  //`http://192.168.1.170/lipnonet/rekreace/api/pdo_sms_pasw.php`,
                  identification,
                  { timeout: 5000 }
              )
              .then(res => {
    
                    // allForum = JSON.parse(res.data); --> for native xhr.onload 
                    const resp = res.data[0] || res.data;
      
                    console.log(resp);
                    //console.log(res);
      
                    // if error in response
                    if (typeof resp.sms_pasw === 'string') {
                        resp.sms_pasw === 'error' && AlertBox('Error !','heslo se nepodařilo odeslat...');
                        resp.sms_pasw === 'password_sent' && AlertBox('Heslo bylo odesláno na email:',`${resp.email}...`);
                        return null
                    }
                    
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
            <Header title="Zapoměli jste heslo?" />
            <TextInput
                placeholder="Username or Email..."
                style={styles.input}
                onChangeText={ textValue => setIdentification( { identification: textValue } ) }
                value={identification.identification}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={(event) => {
                    getPasw(event);

                }}>
                <Text style={styles.btnText}>
                    <Icon name="sign-in" size={15 } /> Send Password
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

export default ForgetPassword ;