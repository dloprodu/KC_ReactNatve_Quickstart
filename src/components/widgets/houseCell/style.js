import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
    cellContainer: {
        height: 280, 
        width: '50%',
        backgroundColor: 'rgb(24,24,24)'
    }
})