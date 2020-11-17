import React, {useState} from 'react';
import { 
  View,
  StyleSheet,
  Alert,   // alert info
} from 'react-native';

import Header     from './components/Header';
import ShowValues from './components/ShowValues';
import LoginPage  from './components/LoginPage';
//import AlertBox   from './components/AlertBox'

import axios from 'axios';

const App = () => {


  const AlertBox = (header = '', text = '') => {
    Alert.alert(
      header,
      text,
      [
        {
          text: 'Understood',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }

  const [ items, setItems ] = useState( { } );
  const [ origSettings, setOrigSettings ] = useState( { } );

  const [ loginUserName, setLoginUserName ] = useState('');
  const [ loginPassword, setLoginPassword ] = useState('');

  const [ isLogged, setIsLogged ] = useState( false );

  const getData = () => {
    axios
      .post(`http://192.168.1.170/lipnonet/rekreace/api/pdo_read_sms.php`,
        {
          "username": loginUserName,
          "password": loginPassword
        },
        { timeout: 5000 }
      )
    .then(res => {
            // allForum = JSON.parse(res.data); --> for native xhr.onload 
            const resp = res.data[0];

            console.log('status : resp ?');
            console.log(resp);

            setOrigSettings( resp );
            setItems( resp );

            if (res.data.sms_read === 'error') {
              AlertBox('Failed !','try later...');
            }
            else{
              resp.id ? setIsLogged( true ) : null;
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
            //console.log(resp );
            if (resp.smsResult === 'value_changed') {
              setOrigSettings( items );
              AlertBox('Success !','data updated...');
            } else {
              AlertBox('Error...','Please try later...');
            }

    })
    .catch(err => {
        AlertBox('Error...',err);
        console.error(err);
      }
      
      );

  }

 
  const startLogin = () => {
      if (!loginUserName || !loginPassword) {
          AlertBox('No item entered','Please enter username and password');
      } else {
          getData();
      }
  };

  const startEdit = () => {
    //if (!username || !password) {
    if ( 1 === 2 ) {
      AlertBox('No item entered','Please enter username and password');
    } else {
      updateData();

    }
  };


  return (
    <View style={styles.container}>
      <Header title="Tomášova apka !" />
      { 
      isLogged
        ? <ShowValues
            items = { items }
            setItems = { setItems }
            startEdit  = { startEdit }
            origSettings = { origSettings }
         />
        : <LoginPage
            startLogin  = { startLogin }
            loginUserName    = { loginUserName }
            setLoginUserName = { setLoginUserName }
            loginPassword    = { loginPassword }
            setLoginPassword = { setLoginPassword }
          />  
      }
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
});

export default App;