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
                name="Buyback Price"
                value={(value*3/4).toFixed(2)}
            />
            <DataEntry
                name="Buy Price"
                value={(value*2/3).toFixed(2)}
            />
            <DataEntry
                name="Discount Price"
                value={(value/2).toFixed(2)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    }
})