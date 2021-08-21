import React from 'react'
import {Text, TouchableHighlight, View, ViewStyle, StyleSheet} from 'react-native'

interface Props {
    title: string
    toggle?: (bool: boolean) => void
    initialToggle?: boolean
    style?: ViewStyle
}

export default (props: Props) => {
    const {title, style} = props
    const [isToggle, setIsToggle] = React.useState(props.initialToggle || false)

    const toggle = () => {
        props.toggle && props.toggle(!isToggle)
        setIsToggle(!isToggle)
    }

    return (
        <TouchableHighlight
            onPress={toggle}
            style={[style, styles.container]}
            activeOpacity={1}
        >
            <View style={[style, styles.box, {backgroundColor: isToggle? '#999' : '#ddd'}]}>
                <Text style={{color: isToggle? 'white' : 'black'}}>{title}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 0,
        paddingVertical: 0,
        overflow:'hidden'
    },
    box:{
        margin: 0
    }
})