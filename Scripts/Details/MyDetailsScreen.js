import React, {useReducer, useEffect} from 'react';
import 
{
  View, 
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import 
{
  renderStatusBar,
} 
from '../../App.js';

function MyDetailsScreen(props)
{
  
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      strTitle: "",
      strCelsius: "",
      strFahrenheit: "",
    }
  )

  useEffect(() => {
    const {params} = props.route
    if(params != undefined && params != null)
    {
      let strTitle = ""
      let strCelsius = ""
      let strFahrenheit = ""
      if(params.title != null && params.title != undefined)
      {
        strTitle = params.title
      }
      if(params.informationData != null && params.informationData != undefined)
      {
        if(params.informationData.current && params.informationData.current != null)
        {
          if(params.informationData.current.temp_c != undefined && params.informationData.current.temp_c != null)
          {
            strCelsius = (params.informationData.current.temp_c * 1).toFixed(0)
          }
          if(params.informationData.current.temp_f != undefined && params.informationData.current.temp_f != null)
          {
            strFahrenheit = (params.informationData.current.temp_f * 1).toFixed(0)
          }
        }
      }
      setState({
        strTitle: strTitle,
        strCelsius: strCelsius,
        strFahrenheit: strFahrenheit,
      })
    }
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
    }
  }, [])

  const handleBackPress = () => {
    processBack()
    return true
  }

  const processBack = () => {
    props.navigation.goBack()
  }

  return(
    <View
      style={{flex: 1,}}>
      {renderStatusBar()}
      <SafeAreaView 
        style={{flex: 1,
                backgroundColor: "#37474f",}}>
        <View
          style={{width: '100%',
                  height: 48,
                  justifyContent: "center",}}>
          <View
            style={{width: '100%',
                    alignItems:  "center" ,
                    justifyContent: "center",}}>
            <Text
              style={{color: "#FFFFFF",
                      fontSize: 18,
                      fontWeight: "bold",
                      textAlign: 'center',}}>
              {state.strTitle}
            </Text>
            <TouchableOpacity
              style={{width: 48,
                      height: 48,
                      padding: 5,
                      left: 0,
                      position:'absolute',
                      alignItems:  "center" ,
                      justifyContent: "center",}}
              onPress={()=> {processBack()}}>
              <Image 
                style={{width: 24,
                        height: 24,}}
                source={require("../../Images/General/back24.png")}/>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{width: "100%",
                  height: "100%",
                  padding: 16,}}>
          <Text
            style={{color: "#dd6346",
                    fontSize: 18,
                    fontWeight: "bold",}}>
            Celsius
          </Text>
          <View
            style={{marginTop: 6,
                    borderRadius: 6,
                    borderWidth: 2,
                    height: 40,
                    paddingLeft: 12,
                    paddingRight: 12,
                    borderColor: "#FFFFFF",
                    justifyContent: "center",}}>
            <Text
              style={{color: "#FFFFFF",
                      fontSize: 16,
                      justifyContent: "center",}}>
              {state.strCelsius + " °C"}
            </Text>
          </View>
          <Text
            style={{color: "#dd6346",
                    fontSize: 18,
                    marginTop: 16,
                    fontWeight: "bold",}}>
            Fahrenheit
          </Text>
          <View
            style={{marginTop: 6,
                    borderRadius: 6,
                    borderWidth: 2,
                    height: 40,
                    paddingLeft: 12,
                    paddingRight: 12,
                    borderColor: "#FFFFFF",
                    justifyContent: "center",}}>
            <Text
              style={{color: "#FFFFFF",
                      fontSize: 16,
                      justifyContent: "center",}}>
              {state.strFahrenheit + " °F"}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default MyDetailsScreen