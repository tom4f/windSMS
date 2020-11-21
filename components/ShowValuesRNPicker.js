import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

// https://www.npmjs.com/package/react-native-picker-select
import RNPickerSelect from 'react-native-picker-select';


const ShowValuesRNPicker = ( { items, setItems } ) => {

    
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


    // storage of selected values in multiSelectItems
    const [selectedWindSpeed, setSelectedWindSpeed] = useState( items.sms.toString() );


    const setWindSpeed = (value) => {
      console.log(value);
      setItems( { ...items, sms: value } )
      setSelectedWindSpeed( value );
    }


return (

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

  oneItem: {

      backgroundColor: 'lightgrey',
      marginTop: 5,
      marginHorizontal: 5,
  },

  text:{
      fontSize: 15,
    	padding: 3
  },
});


ShowValuesRNPicker.propTypes = {
  items        : PropTypes.object,
  origSettings : PropTypes.object,
  setItems     : PropTypes.func,
  updateData    : PropTypes.func
}

export { ShowValuesRNPicker };