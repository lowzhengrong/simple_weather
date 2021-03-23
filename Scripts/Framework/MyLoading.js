import React, {useState, useEffect} from 'react';
import 
{
  Platform, 
  View, 
  Text,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  isTablet,
} from 'react-native-device-info'

function MyLoading(props)
{
  const [textfontSize, setFontSize] = useState(isTablet() ? 24 : 22)

  let Loading_isLoading = false
  let Loading_BackgroundColor = "#000000"
  let Loading_DialogColor = "#FFFFFF"
  let Loading_Opacity = 0.6
  let Loading_IndicatorColor = "#FFFFFF"
  let Loading_Message = "Loading"
  if(props.isLoading != null)
  {
    Loading_isLoading = props.isLoading
  }
  if(props.backgroundColor != null)
  {
    Loading_BackgroundColor = props.backgroundColor
  }
  if(props.boxColor != null)
  {
    Loading_DialogColor = props.boxColor
  }
  if(props.opacity != null)
  {
    Loading_Opacity = props.opacity
  }
  if(props.message != null)
  {
    Loading_Message = props.message
  }
  if(props.indicatorColor != null)
  {
    Loading_IndicatorColor = props.indicatorColor
  }
  if(Platform.OS == "android")
  {
    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={Loading_isLoading}>
        <View 
          style={{flex: 1,}}>
          <View
            style={{flex: 1,
                    backgroundColor: Loading_BackgroundColor,
                    opacity: Loading_Opacity}}>
          </View>
          <View
            style={{flex: 1,
                    width:" 100%",
                    height: '100%',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',}}>
            <ActivityIndicator 
              size="large" 
              color={Loading_IndicatorColor}/>
            <Text
              style={{width: "100%",
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      paddingTop: 12,
                      textShadowColor: 'rgba(0, 0, 0, 2)',
                      textShadowOffset: {width: -2, height: 2},
                      textShadowRadius: 1,
                      textAlign: 'center',
                      fontSize: textfontSize,}}>
              {Loading_Message}
            </Text>
          </View>
        </View>
      </Modal>
    )
  } else
  {
    if(Loading_isLoading)
    {
      return(
        <View 
          style={{flex: 1,
                  width: "100%",
                  height: '100%',
                  position: 'absolute',}}>
          <View
            style={{flex: 1,
                    backgroundColor: Loading_BackgroundColor,
                    opacity: Loading_Opacity}}>
          </View>
          <View
            style={{flex: 1,
                    width: "100%",
                    height: '100%',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',}}>
            <ActivityIndicator 
              size="large" 
              color={Loading_IndicatorColor}/>
            <Text
              style={{width: "100%",
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      paddingTop: 12,
                      textShadowColor: 'rgba(0, 0, 0, 2)',
                      textShadowOffset: {width: -2, height: 2},
                      textShadowRadius: 1,
                      textAlign: 'center',
                      fontSize: textfontSize,}}>
              {Loading_Message}
            </Text>
          </View>
        </View>
      )
    } else
    {
      return(
        <View/>
      )
    }
  }
}

export default MyLoading