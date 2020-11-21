import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity }           from 'react-native';

import Header         from './components/Header';
import ShowValues     from './components/ShowValues';
import LoginPage      from './components/LoginPage';
import { AlertBox }   from './components/AlertBox';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import axios from 'axios';

const App = () => {


  const [ items, setItems ]               = useState( { } );
  const [ origSettings, setOrigSettings ] = useState( { } );
  const [ loginParams, setLoginParams ]   = useState( { username: '', password: '' } );
  const [ isLogged, setIsLogged ]         = useState( false );


  useEffect( () => console.log(loginParams), [loginParams] );


  const getData = () => {

    if (!loginParams.username || !loginParams.password) {
      AlertBox('No item entered','Please enter username and password');
      return null
  }

      axios
          .post(
              `http://192.168.1.170/lipnonet/rekreace/api/pdo_read_sms.php`,
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
                
                //console.log(res);
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

  
  const updateData = () => {
    const { id, name, email, sms, username, password, days } = items;
    const dataForAxios = {
      id,
      name,
      email,
      sms,
      username,
      password,
      days
  };

    axios
      .post(
            `http://192.168.1.170/lipnonet/rekreace/api/pdo_update_sms.php`,
            dataForAxios,
            { timeout: 5000 }
      )
      .then(res => {
          // allForum = JSON.parse(res.data); --> for native xhr.onload 
          // in axios res.data is already object
          const resp = res.data;
          
           if (typeof resp.smsResult === 'string') {
              if (resp.smsResult === 'value_changed') {
                setOrigSettings( items );
                AlertBox('Success !','data updated...');
              } else AlertBox('Error...resp.smsResult','Please try later...');
           } else {
              AlertBox('Error...other...','Please try later...');
          }
      })
      .catch( () => {
        //console.error('Error!!!');
        AlertBox('Error...','no');
      });

  }

  return (
    <View style={styles.container}>
      <Header title="Tomášova apka !" />
      { 
      isLogged
        ? <ShowValues
            items        = { items }
            setItems     = { setItems }
            updateData    = { updateData }
            origSettings = { origSettings }
         />
        : <LoginPage
            getData        = { getData }
            loginParams    = { loginParams }
            setLoginParams = { setLoginParams }
          />  
      }
            <TouchableOpacity
                style={styles.btn}
                onPress={(event) => {
                    getData(event);
                    setLoginParams({ username: '', password: '' });
                }}>
                <Text style={styles.btnText}>
                    <Icon name="question-circle" size={20} /> Zapoměli jste heslo?
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btn}
                onPress={(event) => {
                    getData(event);
                    setLoginParams({ username: '', password: '' });
                }}>
                <Text style={styles.btnText}>
                    <Icon name="user-plus" size={20} /> Registrace nového uživatele
                </Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 100,
    height: 100,
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



export default App;