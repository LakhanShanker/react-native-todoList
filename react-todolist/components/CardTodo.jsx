import { Image, Text, TouchableOpacity } from 'react-native';
import checkImg from '../assets/images/check.png';
import {style} from './TodoStyle'
export default function Todo({todo, onPress, onLongPress}) {  
  return (
    <TouchableOpacity style={style.card} onPress={()=>onPress(todo)} onLongPress = {()=>onLongPress(todo)}>
      <Text style={[style.title, todo.isCompleted && {textDecorationLine:"line-through"}]}>{todo.content}</Text>
     {todo.isCompleted && <Image source={checkImg} style={style.img}/>}
    </TouchableOpacity>
  )
}