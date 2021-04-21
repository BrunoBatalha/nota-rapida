import React from 'react';
import { StatusBar, Text as TextNative, View } from 'react-native';

import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
// https://akveo.github.io/eva-icons/#/
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { default as theme } from './custom-theme.json';

import App from './src/container/App';

function Main() {
    return (
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            <IconRegistry icons={EvaIconsPack} />
            <StatusBar hidden={true} /> 
            
            <App/>
            
        </ApplicationProvider>
    );
}

export default Main;