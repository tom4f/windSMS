import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    View,
    StyleSheet,
} from 'react-native';

import MultiSelect from 'react-native-multiple-select';

const ShowValuesMultiselect = ( { items, setItems } ) => {

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
    const [ selectedItems, setSelectedItems ] = useState( initSelect(items) );
  
    const onSelectedItemsChange = (selectedItems) => {
        // calculate value for MySQL
        const sum = selectedItems.reduce( (acc, item) => (acc + Number(item)), 0 );
        setItems( { ...items, days: sum } )
        console.log('sum: ');
        console.log(sum);
        setSelectedItems( selectedItems );
    };


    return (

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
                submitButtonText="Submit"

                styleDropdownMenu={{
                    margin: 0,
                    padding: 5,

                    backgroundColor: 'blue',
                }}

                styleDropdownMenuSubsection={{
                    height: 30,
                    backgroundColor: 'pink',
                    margin:0,
                    padding:5,
                }}

                styleMainWrapper={{

                    backgroundColor: 'red',
                    margin:0,
                    padding:5,

               }}

                styleTextDropdownSelected={{
                    backgroundColor: 'yellow',

                    margin:0,
                    padding:0,
                    fontSize: 15
               }}
               styleListContainer={{
                    backgroundColor: 'orange',
                    margin:0,
                    padding:3,
               }}

                // works
                selectedItemTextColor="#FF0000"
                selectedItemIconColor="#00FF00"
                itemTextColor="#0000FF"
                submitButtonColor="#0000FF"



                tagRemoveIconColor="#0000FF"
                tagBorderColor="#00FF00"
                tagTextColor="#CCC"
                
                searchInputStyle={{color: '#FF00'}}




            />
        </View>
    );
};

const styles = StyleSheet.create({

  multiselectView: {
    backgroundColor: 'green',
    padding: 5,
    margin: 3,

  },

});


ShowValuesMultiselect.propTypes = {
  items        : PropTypes.object,
  setItems     : PropTypes.func,
}

export { ShowValuesMultiselect };