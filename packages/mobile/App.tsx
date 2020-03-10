/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';

import styled from 'styled-components';

// import {elements} from './components';
// import {elements} from '@la-ferme/components/native';

declare var global: {HermesInternal: null | {}};

// const Button = elements.Button;

console.log(styled);

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Foo</Text>
        {/* <Subtitle>Bar</Subtitle> */}
        {/* <Button onPress={() => null}>Hello</Button> */}
      </SafeAreaView>
    </>
  );
};

// const Subtitle = styled.Text`
//   font-size: 20px;
//   color: #3c4560;
//   font-weight: 500;
//   margin-top: 10px;
//   margin-left: 25px;
//   text-transform: uppercase;
// `;

export default App;
