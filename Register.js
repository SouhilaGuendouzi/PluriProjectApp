import React ,{useState , useEffect} from 'react'
import {Text, View,LogBox,TextInput ,Pressable} from 'react-native'
import {Button, } from 'react-native-paper'
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerStyle from '../Styles/registerStyle';
import HomeAveugle from './HomeAveugle';


 const Register=(props)=> {
     
    const [token,setToken]=useState();

    const storeData = async (value) => {
  
        try {
          await AsyncStorage.setItem('@storage_Key', value)
         
        } catch (e) {
          console.log("souhila kayan erreur")
        }
      }

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@storage_Key')
          if(value !== null) {
            
            props.navigation.navigate("HomeAveugle",{data:token})
          }
        } catch(e) {
          // error reading value
        }
      }
 
   

    const Verifier= ()=>{
     
        database()
     .ref(token+'/')
     .on('value', snapshot => {
      if (snapshot.val()!=null) 
      {  storeData(token)
        return (
          <HomeAveugle token={token}/>
        )
        }
      else console.log("Token Error ")
  });
    }

    useEffect(() => {
        getData();
          });
    
        
    return (
     <View style={registerStyle.container}>
         {LogBox.ignoreLogs(['Setting a timer'])}
        <Text style={registerStyle.description}>
        Please enter the code located in your electric arm
        </Text>
         <TextInput
         style={registerStyle.input}
         placeholder="Enter Token"
         value={token}
         mode="outlined"
         onChangeText={text=>
            {
                setToken(text)
               
            }
            }
        />

         
         <Pressable style={registerStyle.sub}
         onPress={()=>
            {  console.log('hawala token',token)
               Verifier();
            }}
         >
            <Text style={registerStyle.subText}> 
              Submit
            </Text>
         </Pressable>
     </View>
    )
   }
   export default Register;
