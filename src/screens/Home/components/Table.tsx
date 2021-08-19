import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

interface TableProps {
    header: string[]
    data: any[][]
}

export default ({header, data}: TableProps) => {
    return (
        <View style={styles.tableContainer}>
            {data.map((v, i) => {
                return (
                    <Row
                        head={header[i]}
                        data={v}
                    />
                )
            })}
        </View>
    )
}

interface RowProps {
    head: any
    data: any[]
}

const Row = ({head, data}: RowProps) => {
    return(
        <View style={styles.rowContainer}>
            <View style={styles.cellContainer}>
                <Text style={styles.rowHead}>{head}</Text>
            </View>
            {data.map((i) => (
                <View style={styles.cellContainer}>
                    <Text>{i}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    rowContainer:{
        flex:1,
        alignSelf:'stretch',
        flexDirection:'row',
    },
    cellContainer:{
        flex:1,
        alignSelf:'stretch',
        padding:10,
        width:100,
        borderColor:'grey',
        borderWidth:1
    },
    tableContainer:{
        alignSelf:'stretch',
        alignItems:'center',
        justifyContent:'center',
    },
    rowHead:{
        fontWeight:'bold'
    }
})