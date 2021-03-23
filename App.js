/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  StatusBar,
  View,
  Alert,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import NetInfo from "@react-native-community/netinfo"

import HomeScreen from './Scripts/Home/HomeScreen'
import MyDetailsScreen from './Scripts/Details/MyDetailsScreen'

export function requestApiWeather(strKey, strLabel)
{
  return NetInfo.fetch().then(state => {
    if(state.isInternetReachable && state.isConnected)
    {
      const dataParams = `?key=${encodeURIComponent(strKey)}&q=${encodeURIComponent(strLabel)}`
      return fetchTimeout("https://api.weatherapi.com/v1/current.json" + dataParams, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': "application/json",
        },
      }).then(response=>{return response.json();})
    } else
    {
      return "NO_INTERNET"
    }
  })
}

export function noInternet()
{
  Alert.alert(
    "Alert",
    "No internet connection was detected.\nPlease check your internet connectivity and try again.",
    [
      {text: "OK"},
    ],
    { cancelable: false }
  )
}

export function trimText(value)
{
  if(value != undefined && value != null && value != "")
  {
    return String.prototype.trim.call(value)
  }
  return ""
}

export function renderStatusBar()
{
  if(Platform.OS === "android")
  {
    return(
      <View>
        <StatusBar
          backgroundColor={"#37474f"}/>
      </View>
    )
  } else if(Platform.OS === "ios")
  {
    let barHeight = getStatusBarHeight()
    return(
      <View 
        style={{width: '100%',
                height: barHeight, 
                backgroundColor: "#37474f",}}/>
    )
  }
}

export function alertDialog(title , msg , action)
{
  let strTitle = "Alert"
  let strMsg = ""
  let strAction = "OK"
  if(title != undefined && title != null && title.length != 0)
  {
    strTitle = title
  }
  if(msg != undefined && msg != null && msg.length != 0)
  {
    strMsg = msg
  }
  if(action != undefined && action != null && action.length != 0)
  {
    strAction = action
  }
  Alert.alert(
    strTitle,
    strMsg,
    [
      {text: strAction},
    ],
    { cancelable: false }
  )
}

export function fetchTimeout(url, options)
{
  options = options || {};
  //default 30s
  let timeout = 1000 * 30
  if(options != undefined && options != null)
  {
    if(options.body != undefined && options.body != null)
    {
      if(options.body._parts != undefined && options.body._parts != null)
      {
      } else
      {
      }
    }
  }
  const errorMessage = {
    message: "Timeout:" + (timeout / 1000) + "s"
  }
  return timeoutPromise(fetch(url, options), timeout, errorMessage);
}

export function timeoutPromise(promise, timeout, error) {
  let fetch_promise = new Promise((resolve, reject) => {
    promise.then(resolve, reject)
  })
  let abort_promise =  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(error)
    }, timeout)
  })
  let abortable_promise = Promise.race([
    fetch_promise,
    abort_promise
  ])
  return abortable_promise
}

const Stack = createStackNavigator()

function App()
{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          options={{
            headerShown: false, 
            gestureEnabled: false,
          }} 
          component={HomeScreen}/>
        <Stack.Screen 
          name="MyDetails" 
          options={{
            headerShown: false, 
          }} 
          component={MyDetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
