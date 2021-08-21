import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import ToggleBox from '../../../components/common/ToggleBox'

interface Props {
    data: number[]
    setResult?: (num: number) => void
    initialState?: boolean[]
    suffix?: string
}

export default ({data, suffix, initialState, setResult}: Props) => {
    const [toggleList, setToggleList] = React.useState<boolean[]>(initialState || [])

    const onToggle = (index: number, value: boolean) => {
        let arr: boolean[] = []
        toggleList.map((v) => {
            arr.push(v)
        })
        arr[index] = value
        setToggleList(arr)
    }

    React.useEffect(() => {
        let sum = 0
        let length = 0
        data.map((v, i) => {
            if (toggleList[i]){
                sum += v
                length++
            }
        })
        setResult && setResult(sum/length)
    }, [data, toggleList])

    return(
        <View style={styles.container}>
            {data.map((v, i) => (
                <ToggleBox
                    title={v.toFixed(1) + (suffix || "")}
                    style={styles.toggleBox}
                    toggle={(v) => {
                        onToggle(i, v)
                    }}
                    initialToggle={toggleList[i]}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    },
    toggleBox:{
        paddingHorizontal:20,
        paddingVertical:10,
        alignItems:'center',
        borderRadius:5,
        width:80,
        margin:5,
    },
})