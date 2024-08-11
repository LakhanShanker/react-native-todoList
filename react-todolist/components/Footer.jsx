import { Text, TouchableOpacity, View } from 'react-native';
import {style} from './FooterStyle'
export default function Footer({selectedTabName, onPress, todoList}) {
  const getTabStyle = (tabName) =>{
    return {
      fontSize:18,
      fontWeight:'bold',
      color: selectedTabName === tabName ? 'blue' : 'black'
    }
  }
  const countByStatus = todoList.reduce((acc,todo)=>{
    todo.isCompleted ? acc.done++ : acc.inProgress++;
    return acc;
  },{
    all:todoList.length,
    inProgress:0,
    done:0
  })
  return (
    <View style={style.root}>
   <TouchableOpacity onPress={()=>onPress('all')}>
    <Text style={getTabStyle('all')}>All ({countByStatus.all})</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>onPress('inProgress')}>
    <Text style={getTabStyle('inProgress')}>In progress ({countByStatus.inProgress})</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>onPress('done')}>
    <Text style={getTabStyle('done')}>Done ({countByStatus.done})</Text>
    </TouchableOpacity>
    </View>
  )
}
