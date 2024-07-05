import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Routes from './src/navigators/Routes';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Routes />
        <Toast />
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default App;
