import { Alert } from 'react-native';

export const AlertBox = (header = '', text = '') => {
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