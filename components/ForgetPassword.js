import React, { useState } from 'react';
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
      
                    console.log(resp.sms_pasw);
                    console.log(resp);
      
                    // if error in response
                    if (typeof resp.sms_pasw === 'string') {
                        resp.sms_pasw === 'error' && AlertBox('Error !','heslo se nepodařilo odeslat...');
                        resp.sms_pasw !== 'error' && AlertBox('Heslo bylo odesláno na email:',`${resp.sms_pasw}...`);
                        return null
                    }
                    
                    console.log(resp); 
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
                onChangeText={ textValue => setIdentification( { identification: textValue } ) }
                value={identification.identification}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={(event) => {
                    getPasw(event);

                }}>
                <Text style={styles.btnText}>
                    <Icon name="sign-in" size={20} /> Send Password
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

export default ForgetPassword ;