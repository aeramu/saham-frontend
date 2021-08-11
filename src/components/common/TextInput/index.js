import React from 'react'
import {TextInput, View, StyleSheet, Text} from 'react-native'

export default (props) => {
    return(
        <View style={[styles.container, props.containerStyle]}>
            {props.label &&
                <View style={[styles.labelContainer]}>
                    <Text style={styles.label}>{props.label}</Text>
                </View>
            }
            <View style={[styles.inputContainer]}>
                <TextInput
                    {...props}
                    style={{outlineWidth:0}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        
    },
    labelContainer:{
        padding:5
    },
    inputContainer:{
        borderWidth:0.5,
        borderColor:'#ccc',
        borderRadius:5,
        padding:10
    },
    label:{
        fontWeight:'bold',
        color:'grey'
    }
})