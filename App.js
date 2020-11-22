import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Header         from './components/Header';
import ShowValues     from './components/ShowValues';
import LoginPage      from './components/LoginPage';
import ForgetPassword from './components/ForgetPassword';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

const App = () => {

  const [ items, setItems ]               = useState( { } );
  const [ origSettings, setOrigSettings ] = useState( { } );
  const [ isLogged, setIsLogged ]         = useState( false );

  return (
    <View style={styles.container}>
        <Header title="Tomášova apka !" />
        { 
        isLogged
          ? <ShowValues
              items           = { items }
              setItems        = { setItems }
              origSettings    = { origSettings }
              setOrigSettings = { setOrigSettings }
          />
          : <>
            <LoginPage
                setOrigSettings = { setOrigSettings }
                setItems        = { setItems }
                setIsLogged     = { setIsLogged }
            /> 
            <Header title="Zapoměli jste heslo?" />
            <ForgetPassword />                 
            <Text style={styles.btnText}>
                <Icon name="user-plus" size={20} /> Registrace nového uživatele
            </Text>
            </>
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