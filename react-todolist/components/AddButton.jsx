import { Text, TouchableOpacity } from 'react-native';
import {style} from './AddButtonStyle'
export default function AddButton({onPress}) {  
  return (
    <TouchableOpacity style={style.button} onPress={()=>onPress()}>
      <Text style={style.text}>+ Add New</Text>
    </TouchableOpacity>
  )
}

