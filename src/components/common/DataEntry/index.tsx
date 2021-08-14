import React from 'react'
import {View, Text, StyleSheet, ViewStyle} from 'react-native'

interface Props {
    name: string
    value: string
    style?: ViewStyle
}
export default ({name, value, style}: Props) => {
    return(
        <View style={style}>
            <View style={styles.container}>
                <Text style={styles.name}>
                    {name}
                </Text>
                <Text style={styles.value}>
                    {value}
                </Text>
            </View>
            <View style={styles.divider}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:5,
        paddingVertical:15,
    },
    value:{
        fontWeight:'bold'
    },
    name:{
        fontWeight:'bold',
        color:'grey'
    },
    divider:{
        height:1,
        alignSelf:'stretch',
        backgroundColor:'#ccc',
    }
})