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

const NewUser = () => {

    const [ newUser, setNewUser ] = useState({});

    const createUser = () => {


        //console.log(newUser);

        if (!newUser.username || !newUser.email) {
          AlertBox('No item entered','Please enter username or password');
          return null
      }
    
          axios
              .post(
                  `https://www.frymburk.com/rekreace/api/pdo_sms_new.php`,
                  //`http://192.168.1.170/lipnonet/rekreace/api/pdo_sms_new.php`,
                  newUser,
                  { timeout: 5000 }
              )
              .then(res => {
    
                    // allForum = JSON.parse(res.data); --> for native xhr.onload 
                    const resp = res.data[0] || res.data;
      
                    //console.log(res); 
                    //console.log(resp.sms_new);
                    //console.log(resp);
      
                    // if error in response
                    if (typeof resp.sms_new === 'string') {
                        if (resp.sms_new === 'user_exists' ) { AlertBox('Error !','user exists...' ); };
                        if (resp.sms_new === 'email_exists') { AlertBox('Error !','email exists...'); };
                        if (resp.sms_new === 'error'       ) { AlertBox('Error !','heslo se nepodařilo odeslat...'); };
                        if (resp.sms_new === 'user_added'  ) { AlertBox(`Heslo pro ${resp.username} odesláno na`,`${resp.email}...`) };
                    } else {
                        AlertBox('unknown Error !','try later...');
                    }

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
            <Header title="Registrace nového uživatele" />        
            <TextInput
                placeholder="your new username..."
                style={styles.input}
                onChangeText={ textValue => setNewUser( current => ({ ...current, username: textValue }) ) }
                value={newUser.username}
            />
            <TextInput
                placeholder="your email..."
                style={styles.input}
                onChangeText={ textValue => setNewUser( current => ({ ...current, email: textValue }) ) }
                value={newUser.email}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={(event) => {
                    createUser(event);

                }}>
                <Text style={styles.btnText}>
                    <Icon name="user-plus" size={15} /> create user
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

export default NewUser ;