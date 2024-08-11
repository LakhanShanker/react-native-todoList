import { Alert, ScrollView, View } from 'react-native';
import { s } from './styles'
import Header from '../components/Header'
import CardTodo from '../components/CardTodo'
import Footer from '../components/Footer'
import AddButton from '../components/AddButton'
import Dialog from 'react-native-dialog'
import { useEffect, useRef, useState } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
let isFirstRender = true;
let isLoadUpdated = false;
export default function HomeScreen() {
  const [todoList, setTodoList] = useState([]);
  const [selectedTabName,setSelectedTabName] = useState('all');
  const [showDialog, setShowDialog] = useState(false);
  const [inputValue, setInputValue]= useState('');
  const scrollRef = useRef();
  const renderTodoList = () => {
    return getFilteredList()?.map((todo)=> (
      <View style={s.cardItem} key={todo.id}>
        <CardTodo todo={todo} onPress={updateTodo} onLongPress={deleteTodo}/>
      </View>
    ) )
  }
  const deleteTodo = (todo) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo ?",[{
      text:'Delete',
      style:'destructive',
      onPress: ()=>{
       setTodoList( todoList.filter((curTodo)=> curTodo.id !== todo.id));
      }
    },{
      text:'Cancel',
      style:'cancel'
    }
  ])
  }
  const updateTodo = (todo) => {
    const updatedTodo = {
      ...todo,
      isCompleted : !todo.isCompleted
    }
    const updateTodoList = [...todoList];
    const idx = updateTodoList.findIndex((x)=>x.id === updatedTodo.id);
    updateTodoList[idx] = updatedTodo;
    setTodoList(updateTodoList);
  }
  const getFilteredList = () => {
    switch(selectedTabName){
      case 'all':
        return todoList;
      case 'inProgress':
        return todoList.filter((todo)=> !todo.isCompleted)
      case 'done':
        return todoList.filter((todo)=> todo.isCompleted)
      default:
        return todoList
    }
  }
  const addTodo = () =>{
    const newTodo = {
      id: uuid.v4(),
      content: inputValue,
      isCompleted: false
    }
    setTodoList([...todoList,newTodo]);
    setShowDialog(false);
    setInputValue('');
    setTimeout(()=>{
      scrollRef.current.scrollToEnd();
    },300)
  }

  useEffect(()=>{
    loadTodoList();
  },[]);
  useEffect(()=>{
    if(!isLoadUpdated){
      if(!isFirstRender){
        saveTodoList();
      }
      else{
        isFirstRender=false;
      }
    }
    else{
      isLoadUpdated = false;
    }

  },[todoList])
  const loadTodoList = async () =>{
    const stringTodo = await AsyncStorage.getItem('@todoList');
    const parsedTodoList = JSON.parse(stringTodo);
    isLoadUpdated = true;
    setTodoList(parsedTodoList || []);
  }
  const saveTodoList = async () =>{
    try{
      await AsyncStorage.setItem('@todoList', JSON.stringify(todoList));
    }catch(err){
      alert(err);
    }
  }
  return <><View style={s.app}>
    <View style={s.header}>
<Header />
</View>
<View style={s.body}>
  <ScrollView ref={scrollRef}>
{renderTodoList()}
</ScrollView>
  </View>
  <AddButton onPress={()=>setShowDialog(true)}/>
  <View style={s.footer}>
 <Footer selectedTabName={selectedTabName} onPress = {setSelectedTabName} todoList={todoList}/>
 </View>
  </View>
  <Dialog.Container visible={showDialog} onBackdropPress={()=>setShowDialog(false)}>
<Dialog.Title>Add new Todo</Dialog.Title>
<Dialog.Description>Choose a name for your todo</Dialog.Description>
<Dialog.Input placeholder='Ex: Go to gym...' onChangeText={setInputValue}/>
<Dialog.Button label='Cancel' color='grey' onPress={()=>{setShowDialog(false)}}/>
<Dialog.Button disabled={inputValue.length === 0} label='Save' onPress={addTodo}/>
  </Dialog.Container>
  </>
}
