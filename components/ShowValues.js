import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AlertBox }   from './AlertBox';
import { ShowValuesMultiselect } from './ShowValuesMultiselect';
import { ShowValuesRNPicker } from './ShowValuesRNPicker';
import axios from 'axios';

import Icon  from 'react-native-vector-icons/dist/FontAwesome';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,     // for flicker effect
    KeyboardAvoidingView, // to see edited fields above keyboard
    ScrollView,           // to see edited fields above keyboard

} from 'react-native';

const ShowValues = ( { items, setItems, origSettings, setOrigSettings } ) => {

    // storage of selected values in multiSelectItems
    const [passwordAgain    , setPasswordAgain    ] = useState( items.password.toString() );

  const changePassword = (textValue) => {
      setItems( { ...items, password:textValue } )
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
            //`http://192.168.1.170/lipnonet/rekreace/api/pdo_update_sms.php`,
            `https://www.frymburk.com/rekreace/api/pdo_update_sms.php`,
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

  const sendEdit = (event) => {
      // password validation
      passwordAgain === items.password
          ? passwordAgain.length > 2
              ? updateData(event)
              : AlertBox('No change', 'short password?')
          : AlertBox('No change', 'wrong password?' )
  }

return (

    <>

        <ShowValuesMultiselect items={items} setItems={setItems} />

        <KeyboardAvoidingView style={{flex:1}} behavior="height" enabled={true}>
           
            <ScrollView>

                <View style={styles.oneItem}>
                    <Text style={styles.text}>id / user</Text>
                    <Text style={styles.textBig}>{items.id} / {items.username}</Text>
                </View>

                <ShowValuesRNPicker items={items} setItems={setItems} />

                <View style={styles.oneItem}>
                    <Text  style={styles.text} >password:</Text>
                    <TextInput
                        secureTextEntry = { true }
                        placeholder="Password..."
                        style={styles.input}
                        onChangeText={textValue => changePassword(textValue)}
                        value={items.password}
                    />
                    <TextInput
                        secureTextEntry = { true }
                        placeholder="Password again..."
                        style={styles.input}
                        onChangeText={textValue => setPasswordAgain(textValue)}
                        value={passwordAgain}
                    />
                </View>

                <View style={styles.oneItem}>
                  <Text  style={styles.text}>full name:</Text>
                  <TextInput
                      placeholder="Full Name..."
                      style={styles.input}
                      onChangeText={textValue => setItems( { ...items, name:textValue } )}
                      value={items.name}
                    />
                </View>

                <View style={styles.oneItem}>
                    <Text  style={styles.text}>
                        email
                    </Text>
                    <TextInput
                        placeholder="Email..."
                        style={styles.input}
                        onChangeText={textValue => setItems( { ...items, email:textValue } )}
                        value={items.email}
                    />
                </View>

                <TouchableOpacity style={styles.btn} onPress={(event) => {
                    origSettings == items
                        ? AlertBox('No change', 'blabla' )
                        : sendEdit(event);
                    }}>
                    <Text style={styles.btnText}>
                      <Icon name="plus" size={20} /> Update
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
</>

    );
};

const styles = StyleSheet.create({


  pickerSelectStyles:{
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },

  btn: {
    backgroundColor: 'lime',
    padding: 9,
    margin: 5,
},
btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
},


  multiselectView: {
    backgroundColor: 'green',
    marginHorizontal: 5,
    marginTop: 0,
    padding: 0,

  },

  dropdownMenu: {

    marginHorizontal: 0,

    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    height: 0
  },

  oneItem: {
      padding: 0,      
      backgroundColor: 'lightgrey',
      marginTop: 3,
      marginHorizontal: 3,
  },

  text:{
      fontSize: 10,
    	padding: 3
  },

  textBig:{
    height: 25,
    margin: 0,
    fontSize: 15,
    paddingVertical: 0
  },

    input: {
      height: 30,
      padding: 3,
      margin: 3,
      fontSize: 15,
      backgroundColor: '#c2bad8',
      color: 'darkslateblue',
    },

});


ShowValues.propTypes = {
  items        : PropTypes.object,
  origSettings : PropTypes.object,
  setItems     : PropTypes.func,
  updateData     : PropTypes.func
}

export default ShowValues;


// (items.days >>> 0).toString(2);
//         1 >>> 0 // 1 -- Number cast to 32-bit integer then back to Number
//       "1" >>> 0 // 1 -- String cast to 32-bit integer then back to Number
// undefined >>> 0 // 0 -- failed cast yields zero

// toString
//  2 - The number will show as a binary value
//  8 - The number will show as an octal value
// 16 - The number will show as an hexadecimal value


        
    // npm install --save react-native-keyboard-aware-scroll-view

    
    // multiple-select
    // npm install react-native-multiple-select --save
    // npm install react-native-vector-icons --save
    // react-native link react-native-vector-icons