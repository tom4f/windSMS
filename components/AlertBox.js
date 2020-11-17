
import Alert from 'react-native';

const AlertBox = (header = 'Failed !', text = 'try later...') => {
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

export default AlertBox;