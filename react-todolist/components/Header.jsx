import { Image, Text, View } from 'react-native';
import logoImage from '../assets/images/todo-header.png'
import {style} from './HeaderStyle'
function Header() {
  return (
    <>
      <Image source={logoImage} style={style.img} resizeMode='contain'/>
    <Text style={style.subTitle}>You probably have something to do</Text>
  </>
  )
}

export default Header