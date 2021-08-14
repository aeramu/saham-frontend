import React from 'react'
import {View, Text, StyleSheet, ViewStyle} from 'react-native'
import TextInput from '../../../components/common/TextInput'

interface ValuationProps{
    eps: string
    per: string
    growth: string
    handleEPSChange: (text: string) => void
    handlePERChange: (text: string) => void
    handleGrowthChange: (text: string) => void
    style?: ViewStyle
}

export default (props: ValuationProps) => {
    const [value, setValue] = React.useState(0)
    const {eps, per, growth, handleEPSChange, handleGrowthChange, handlePERChange, style} = props
    

    React.useEffect(() => {
        const basicValue = Number(eps)*Number(per)
        let futureEPS = Number(eps)
        for (let i = 0; i < 10; i++) {
            futureEPS *= 1+(Number(growth)/100)
        }
        const growthValue = futureEPS/4*Number(per)
        setValue(Math.max(basicValue, growthValue))
    }, [eps, per, growth])

    return(
        <View style={style}>
            <Text>Fair Price: {value.toFixed(2)}</Text>
            <Text>Buyback Price: {(value*3/4).toFixed(2)}</Text>
            <Text>Buy Price: {(value*2/3).toFixed(2)}</Text>
            <Text>Discount Price: {(value/2).toFixed(2)}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    label="EPS"
                    placeholder="EPS"
                    value={eps}
                    onChangeText={handleEPSChange}
                    containerStyle={styles.textInput}
                />
                <TextInput
                    label="PER"
                    placeholder="PER"
                    value={per}
                    onChangeText={handlePERChange}
                    containerStyle={styles.textInput}
                />
                <TextInput
                    label="Growth"
                    placeholder="Growth"
                    value={growth}
                    onChangeText={handleGrowthChange}
                    containerStyle={styles.textInput}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput:{
        marginRight:10
    },
    inputContainer:{
        flexDirection:'row',
        flexWrap:'wrap'
    }
})