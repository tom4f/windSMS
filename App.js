import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Header         from './components/Header';
import ShowValues     from './components/ShowValues';
import LoginPage      from './components/LoginPage';
import ForgetPassword from './components/ForgetPassword';
import NewUser        from './components/NewUser';

const App = () => {

  const [ items, setItems ]               = useState( { } );
  const [ origSettings, setOrigSettings ] = useState( { } );
  const [ isLogged, setIsLogged ]         = useState( false );

  return (
    <View style={styles.container}>
        <Header title="Super!" />
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
            <ForgetPassword />
            <NewUser />
            </>
        }
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
    },
    btnText: {
        
        color: 'darkslateblue',
        fontSize: 15,
        textAlign: 'center',
    }
});

export default App;