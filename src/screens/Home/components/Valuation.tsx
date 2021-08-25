import React from 'react'
import {View, Text, StyleSheet, ViewStyle} from 'react-native'
import TextInput from '../../../components/common/TextInput'
import DataEntry from '../../../components/common/DataEntry'

interface ValuationProps{
    eps: string
    per: string
    growth: string
    style?: ViewStyle
}

export default (props: ValuationProps) => {
    const [value, setValue] = React.useState(0)
    const {eps, per, growth, style} = props

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
        <View style={[styles.container, style]}>
            <DataEntry
                name="Fair Price"
                value={value.toFixed(2)}
            />
            <DataEntry
                name="Margin 25%"
                value={(value*75/100).toFixed(2)}
            />
            <DataEntry
                name="Margin 33%"
                value={(value*66/100).toFixed(2)}
            />
            <DataEntry
                name="Margin 40%"
                value={(value*60/10).toFixed(2)}
            />
            <DataEntry
                name="Margin 50%"
                value={(value*50/100).toFixed(2)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    }
})