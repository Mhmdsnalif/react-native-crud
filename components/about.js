import React from 'react';
import { View, Text } from 'react-native';

const About = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>
        This is the About page. Here you can provide information about your app and its creators.
      </Text>
    </View>
  );
};

export default About;