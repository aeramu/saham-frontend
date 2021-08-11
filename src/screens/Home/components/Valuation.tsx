import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import TextInput from '../../../components/common/TextInput'

interface ValuationProps{
    eps: number
    per: number
    growth: number
}

export default (props: ValuationProps) => {
    const [EPS, setEPS] = React.useState(props.eps.toString())
    const [PER, setPER] = React.useState(props.per.toString())
    const [growth, setGrowth] = React.useState(props.growth.toString())
    const [value, setValue] = React.useState(0)

    const handlePERChanged = (text: string) => {
        if (text[text.length-1] == "."){
            setPER(text)
            return
        }
        const num = Number(text)
        if (!Number.isNaN(num)) {
            setPER(text)
        }
    }

    const handleEPSChanged = (text: string) => {
        if (text[text.length-1] == "."){
            setEPS(text)
            return
        }
        const num = Number(text)
        if (!Number.isNaN(num)) {
            setEPS(text)
        }
    }

    const handleGrowthChanged = (text: string) => {
        if (text[text.length-1] == "."){
            setGrowth(text)
        }
        const num = Number(text)
        if (!Number.isNaN(num)) {
            setGrowth(text)
        }
    }

    React.useEffect(() => {
        const basicValue = Number(EPS)*Number(PER)
        let futureEPS = Number(EPS)
        for (let i = 0; i < 10; i++) {
            futureEPS *= 1+(Number(growth)/100)
            
        }
        const growthValue = futureEPS/4*Number(PER)
        setValue(Math.max(basicValue, growthValue))
    }, [EPS, PER, growth])

    return(
        <View>
            <Text>Fair Price: {value}</Text>
            <Text>Buyback Price: {value*3/4}</Text>
            <Text>Buy Price: {value*2/3}</Text>
            <Text>Discount Price: {value/2}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    label="EPS"
                    placeholder="EPS"
                    value={EPS}
                    onChangeText={handleEPSChanged}
                    containerStyle={styles.textInput}
                />
                <TextInput
                    label="PER"
                    placeholder="PER"
                    value={PER}
                    onChangeText={handlePERChanged}
                    containerStyle={styles.textInput}
                />
                <TextInput
                    label="Growth"
                    placeholder="Growth"
                    value={growth}
                    onChangeText={handleGrowthChanged}
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