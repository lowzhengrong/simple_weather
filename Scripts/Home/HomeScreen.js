import React, {useState, useEffect} from 'react';
import 
{
  View,
  Text,
  BackHandler,
  Alert,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} 
from 'react-native';
import 
{
  trimText,
  alertDialog,
  requestApiWeather,
  noInternet,
  renderStatusBar,
} 
from '../../App.js';
import { 
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view'
import {
  ModalSelectList,
} from 'react-native-modal-select-list'
import MyLoading from '../Framework/MyLoading.js';

function HomeScreen(props)
{

  let modalRef = null
  const [bln_Loading, setLoading] = useState(false)
  const [strApiKey, setApiKey] = useState("")
  const [strLocation, setLocation] = useState("")
  const [arrayLocation, setArrayLocation] = useState([
    {
      name: "Kuala Lumpur",
    },
    {
      name: "Singapore",
    }
  ])
  const optionsData = () => {
    const optionsLocation = []
    if(arrayLocation != undefined && arrayLocation != null && arrayLocation.length > 0)
    {
      for(let x in arrayLocation)
      {
        const contentData = arrayLocation[x]
        optionsLocation.push({label: String(contentData.name), value: String(contentData.name)})
      }
    }
    return optionsLocation
  }
  const staticModalOptions = optionsData()

  useEffect(() => {
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
    Alert.alert(
      "Alert",
      "Are you sure you want to exit the application?",
      [
        {text: "NO", style: "destructive", onPress: () => {} },
        {text: "YES", onPress: () => {BackHandler.exitApp()}},
      ],
      { cancelable: false }
    )
  }

  const saveModalRef = (ref) => {
    modalRef = ref
  }

  const showModal = () => {
    if(modalRef)
    {
      modalRef.show()
    }
  }

  const onClosedModal = () => {
    setLocation("")
  }

  const onSelectedOption = (strValue) => {
    setLocation(strValue)
  }

  const clickPicklist = () => {
    showModal()
  }

  const clickSubmit = () => {
    const tempApiKey = trimText(strApiKey)
    const tempCityName = trimText(strLocation)
    if(tempApiKey.length == 0)
    {
      alertDialog("Alert", "Please do not leave the api key empty.", "OK")
      return
    }
    if(tempCityName.length == 0)
    {
      alertDialog("Alert", "Please do not leave the city name empty.", "OK")
      return
    }
    setLoading(true)
  }

  useEffect(() => {
    if(bln_Loading)
    {
      const tempApiKey = trimText(strApiKey)
      const tempCityName = trimText(strLocation)
      requestApiWeather(tempApiKey, tempCityName).then(responseData => {
        const data = responseData
        if(String(data) == "NO_INTERNET")
        {
          dismissLoading()
          noInternet()
          return
        }
        if(data.error)
        {
          dismissLoading()
          alertDialog("Error:" + data.error.code, data.error.message, "OK")
          return
        }
        if(data.location && data.current)
        {
          dismissLoading()
          props.navigation.navigate("MyDetails", {informationData: data, title: strLocation})
        }
      })
    }
  }, [bln_Loading])
  
  const dismissLoading = () => {
    setLoading(false)
  }

  return (
    <View
      style={{flex: 1,}}>
      {renderStatusBar()}
      <SafeAreaView 
        style={{flex: 1,
                backgroundColor: "#37474f",}}>
        <KeyboardAwareScrollView
          scrollEnabled={false}>
          <View
            style={{width: '100%',
                    height: '100%',
                    flex: 1,
                    padding: 16,}}>
            <Image
              style={{width: "70%",
                      height: 120,
                      marginTop: 32,
                      alignSelf: "center",}}
              resizeMode={"contain"}
              source={{uri: "https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"}}/>
            <Text
              style={{fontSize: 16,
                      marginTop: 32,
                      fontWeight: "bold",
                      color: "#dd6346",}}>
              Your API Key
            </Text>
            <View
              style={{marginTop: 8,}}>
              <TextInput
                placeholder={'API KEY'}
                placeholderTextColor="#D3D3D3"
                underlineColorAndroid = 'transparent'
                style={{borderColor: "#CFCFCF",
                        borderWidth: 1,
                        height: 40,
                        borderRadius: 6,
                        fontSize: 16,
                        width: "100%",
                        color: "#FFFFFF",
                        justifyContent: "center",
                        paddingLeft: 12,
                        paddingRight: 12,}}
                onChangeText={(strValue) => {setApiKey(strValue)}} 
                value={strApiKey}/>
            </View>
            <Text
              style={{fontSize: 16,
                      marginTop: 16,
                      fontWeight: "bold",
                      color: "#dd6346",}}>
              City Name
            </Text>
            <TouchableOpacity
              style={{height: 40,
                      marginTop: 8,
                      borderColor: "#CFCFCF",
                      borderWidth: 1,
                      borderRadius: 6,
                      justifyContent: "center",
                      alignItems: "center",}}
              onPress={()=> {clickPicklist()}}>
              <Text
                style={{fontSize: 16,
                        color: "#FFFFFF",
                        width: "100%",
                        paddingLeft: 12,
                        paddingRight: 40,}}>
                {strLocation}
              </Text>
              <Image
                style={{width: 30,
                        height: 30,
                        position: "absolute",
                        right: 6,}}
                source={require("../../Images/Home/arrow_down.png")}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={{height: 44,
                      marginTop: 22,
                      borderRadius: 6,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#dd6346",}}
              onPress={()=> {clickSubmit()}}>
              <Text
                style={{fontSize: 16,
                        color: "#FFFFFF",
                        width: "100%",
                        fontWeight: "bold",
                        textAlign: "center",}}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
          <ModalSelectList
            ref={saveModalRef}
            placeholder={"Search"}
            closeButtonText={"Close"}
            options={staticModalOptions}
            onSelectedOption={onSelectedOption}
            onClosedModal={onClosedModal}
            disableTextSearch={false}
            numberOfLines={2}/>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <MyLoading
        isLoading={bln_Loading}
        indicatorColor={"#FFFFFF"}
        message={"Please Wait"}>
      </MyLoading>
    </View>
  )

}

export default HomeScreen 