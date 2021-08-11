import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import TextInput from '../../components/common/TextInput'
import {gql, useQuery} from '@apollo/client'
import Chart from './components/Chart'
import Table from './components/Table'
import Valuation from './components/Valuation'

export default () => {
    const [symbol, setSymbol] = React.useState("BBCA")
    const [growth, setGrowth] = React.useState(0)

    const {data, loading, error} = useQuery(STOCK, {
        variables:{
            symbol: symbol
        }
    })

    const handleSymbolChanged = (text: string) => {
        setSymbol(text.toUpperCase())
    }

    const tableData = () => {
        let arr: any[][] = []
        let eps = data.stock.payload.incomeStatement.eps
        let per = data.stock.payload.incomeStatement.per
        arr.push(eps)
        arr.push(per)
        return arr
    }

    React.useEffect(() => {
        if (loading) {
            return
        }
        if (error) {
            return
        }
        const arr = data.stock.payload.incomeStatement.operatingProfit
        let res: number[] = []
        for(let i = 0; i < arr.length-1; i++) {
            res.push(((arr[i]-arr[i+1])/arr[i+1]*100))
        }
        setGrowth(average(res.slice(0, 5)))
    }, [data])

    if (error) {
        return(
            <View style={styles.container}>
                <Text>{error.message}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="Symbol"
                placeholder="Symbol"
                value={symbol}
                onChangeText={handleSymbolChanged}
            />
            {
                !loading && 
                <>
                <Valuation
                    eps={data.stock.payload.incomeStatement.eps[0]}
                    per={data.stock.payload.incomeStatement.per[0]}
                    growth={growth}
                />
                <Chart 
                    revenue={convertArrayStringToNumber(data.stock.payload.incomeStatement.revenue)}
                    gross={convertArrayStringToNumber(data.stock.payload.incomeStatement.grossProfit)}
                    operating={convertArrayStringToNumber(data.stock.payload.incomeStatement.operatingProfit)}
                    net={convertArrayStringToNumber(data.stock.payload.incomeStatement.netProfit)}
                />
                <Table
                    header={["EPS", "PER"]}
                    data={tableData()}
                />
                <Text>AVG 5Y Growth: {growth.toPrecision(3)}%</Text>
                </>
            }
        </View>
    )
}

const STOCK = gql`
    query($symbol:String!){
        stock(symbol:$symbol){
            payload{
                symbol
                incomeStatement{
                    revenue
                    grossProfit
                    operatingProfit
                    netProfit
                    eps
                    per
                }
            }
        }
    }
`

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:25,
        alignItems:'flex-start'
    }
})

const convertArrayStringToNumber = (array : string[]) => {
    return array.map((i) => {
        return Number(i)
    })
}

const average = (array: number[]) => {
    var sum = 0
    array.map((v) => {
        sum += v
    })
    return sum/array.length
}