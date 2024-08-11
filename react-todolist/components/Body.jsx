import { Text, View } from 'react-native';
import { style } from '../components/BodyStyle'

export default function Body() {
const TODO = [{id:'1', content:'To go to gym', isCompleted:true},
  {id:'2', content:'To go to work', isCompleted:false},
  {id:'3', content:'do chores', isCompleted:true}
]
  return (
   <>
    <View>{TODO.map((todo)=>{
      return <View>
        <Text>{todo.content}</Text></View>
    })}</View>
    </>
  )
}
