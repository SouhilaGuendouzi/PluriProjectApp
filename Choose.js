
  import React , {useEffect}from 'react';
  import {Text , View,Pressable,Image ,BackHandler} from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import chooseStyle from '../Styles/chooseStyle';

  
  const Choose = (props)=>{
    
    const backAction=()=>{
      BackHandler.exitApp()
    }
    useEffect(() => {
      
      BackHandler.addEventListener("hardwareBackPress", backAction);
      },[])

  
        const storeUser = async (value) => {

          try {
            await AsyncStorage.setItem('@storage_User', value)
          
          } 
          catch (e) {
            // saving error
          }
        }
        const goDeaf=async()=>{
      
           await storeUser("deaf")
           await props.navigation.navigate('GuideDeaf')
      }

        const goBlind=async()=>{
            await props.navigation.navigate('GuideBlind') 
        }
          return (

     <View>
     <Pressable
       onPress={()=> {  goDeaf() }
       }style={chooseStyle.deafView} >
     <Text style={chooseStyle.text1D}> EVERY ONE UNDERSTAND</Text>
     <Image source={require('../Icons/deaf.png')} style={chooseStyle.deafIcon}/> 
     <Text style={chooseStyle.text2D}> DEAF</Text>
     </Pressable>


       <Pressable
       onPress={()=> { goBlind() }}
       style={chooseStyle.blindView} >
         <Text style={chooseStyle.text1B}>BLIND</Text>
         <Image style={chooseStyle.blindIcon}
         source=  {require('../Icons/blind.png')}  />
         <Text style={chooseStyle.text2B}>LIFE IS EASIER </Text>
       </Pressable>   
   </View>
 )
  }     
   export default Choose;    
      
