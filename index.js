/**
 * @format
 */

import './shim.js'
import crypto from 'crypto';
import 'text-encoding-polyfill'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
