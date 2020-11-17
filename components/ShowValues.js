import React, { useState } from 'react';
import Icon  from 'react-native-vector-icons/dist/FontAwesome';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,                // alert info
    TouchableOpacity,     // for flicker effect
    KeyboardAvoidingView, // to see edited fields above keyboard
    ScrollView,           // to see edited fields above keyboard

} from 'react-native';

import MultiSelect from 'react-native-multiple-select';

// https://www.npmjs.com/package/react-native-picker-select
import RNPickerSelect from 'react-native-picker-select';


const ShowValues = ( { items, setItems, startEdit, origSettings } ) => {


    const multiSelectItems = [
        //{ id:  "0", name: 'Dummy' },
        { id:  "1", name: 'Neděle' },
        { id:  "2", name: 'Pondělí' },
        { id:  "4", name: 'Úterý' },
        { id:  "8", name: 'Středa' },
        { id: "16", name: 'Čtvrtek' },
        { id: "32", name: 'Pátek' },
        { id: "64", name: 'Sobota' },
        { id:"128", name: '[1] Posílat jednu SMS za den' },
        { id:"256", name: '[2] Dnes SMS již posláno' },
        { id:"512", name: 'Posilat jen při sílící tendenci, vypina [1] a [2]' },
    ];


    
    const RNPicker = [
      { value: "5", label: '> 5 m/s' },
      { value: "6", label: '> 6 m/s' },
      { value: "7", label: '> 7 m/s' },
      { value: "8", label: '> 8 m/s' },
      { value: "9", label: '> 9 m/s' },
      { value:"10", label: '> 10 m/s' },
      { value:"11", label: '> 11 m/s' },
      { value:"12", label: '> 12 m/s' },
      { value:"13", label: '> 13 m/s' },
      { value:"14", label: '> 14 m/s' },
      { value:"15", label: '> 15 m/s' },
      { value:"16", label: '> 16 m/s' },
      { value:"17", label: 'vypnuto' },
    ];




      // create initial multiselect array based on MySQL
      const initSelect = (items) => {
        // dec to binary
        if ( items.days === "0" ) return []; 
        const bin = (items.days >>> 0).toString(2);
        // bin to array
        const arr = [ ...bin ];
        // calculate array of selected values in multiSelectItems
        const selectedItemsArr = arr.map( (value, index) => ( value * Math.pow(2, index) ).toString() );
        return selectedItemsArr;
    }


    // storage of selected values in multiSelectItems
    const [selectedItems    , setSelectedItems    ] = useState( initSelect(items) );
    const [selectedWindSpeed, setSelectedWindSpeed] = useState( items.sms.toString() );
    const [passwordAgain    , setPasswordAgain    ] = useState( items.password.toString() );





    
    const onSelectedItemsChange = (selectedItems) => {
        // calculate value for MySQL
        const sum = selectedItems.reduce( (acc, item) => (acc + Number(item)), 0 );
        setItems( { ...items, days: sum } )
        console.log('sum: ');
        console.log(sum);
        setSelectedItems( selectedItems );
    };


  const changePassword = (textValue) => {
      setItems( { ...items, password:textValue } )
  }

    const setWindSpeed = (value) => {
      console.log(value);
      setItems( { ...items, sms: value } )
      setSelectedWindSpeed( value );
    }


  const sendEdit = (event) => {
      // password validation
      passwordAgain === items.password
          ? passwordAgain.length > 2
              ? startEdit(event)
              : Alert.alert(
                  'No change',
                  'short password?',
                  [
                    {
                      text: 'Understood',
                      style: 'cancel',
                    },
                  ],
                  {cancelable: true},
              )
          : Alert.alert(
              'No change',
              'wrong password?',
              [
                {
                  text: 'Understood',
                  style: 'cancel',
                },
              ],
              {cancelable: true},
          )
  }

return (

    <>


      <View style={styles.multiselectView}>
        <MultiSelect
            items={multiSelectItems}
            displayKey="name"
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Posílat v tyto dny"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={(text) => console.log(text)}
            hideTags
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"

            searchInputStyle={{color: '#CCC'}}
            submitButtonColor="#48d22b"
            submitButtonText="Submit"

            styleDropdownMenu={styles.dropdownMenu}

        />
        </View>

        <KeyboardAvoidingView style={{flex:1}} behavior="height" enabled={true}>
           
            <ScrollView>

              
                <View style={styles.oneItem}>
                    <Text style={styles.text}>id / user</Text>
                    <Text style={styles.textBig}>{items.id} / {items.username}</Text>
                </View>


            <View style={styles.oneItem}>
                <Text style={styles.text}>Wind limit</Text>
                <RNPickerSelect
                    placeholder={{
                      label: 'Select wind limit...',
                      //value: '',
                    }}
                    onValueChange={(value) => setWindSpeed( value )}
                    items={RNPicker}
                    //style={{ height: "50" }}
                    value={selectedWindSpeed}
                />
            </View>


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
                        ? Alert.alert(
                              'No change',
                              'blabla',
                              [
                                {
                                  text: 'Understood',
                                  style: 'cancel',
                                },
                              ],
                              {cancelable: true},
                          )
                 //       : startEdit(event);
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

      backgroundColor: 'lightgrey',
      marginTop: 5,
      marginHorizontal: 5,
  },

  text:{
      fontSize: 15,
    	padding: 3
  },

  textBig:{
    height: 25,

    margin: 0,
    fontSize: 20,
    paddingVertical: 0
  },

    input: {
      height: 25,
      padding: 1,
      margin: 5,
      fontSize: 20,
      backgroundColor: '#c2bad8',
      color: 'darkslateblue',
    },

});

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