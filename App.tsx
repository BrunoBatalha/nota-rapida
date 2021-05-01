import React from 'react';
import { StatusBar } from 'react-native';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './custom-theme.json';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
// https://akveo.github.io/eva-icons/#/

import App from './src/features/note/containers/App';

import { initDatabase } from './src/services/database';

function Main() {

    initDatabase();

    return (
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            <IconRegistry icons={EvaIconsPack} />
            <StatusBar hidden={true} />

            <App />

        </ApplicationProvider>
    );
}

export default Main;