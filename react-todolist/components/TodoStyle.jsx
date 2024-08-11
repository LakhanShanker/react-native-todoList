import { StyleSheet } from "react-native";
export const style = StyleSheet.create({
    card:{
backgroundColor:'white',
height:115,
shadowColor:'#000',
shadowOffset:{
    width:0,
    height:2
},
shadowOpacity:0.25,
shadowRadius:4,
elevation:5,
borderRadius:15,
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between',
paddingHorizontal:20
    },
    img:{
        height:35,
        width:35
    },
    title:{
fontSize:25
    }
});
