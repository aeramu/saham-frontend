import React from 'react'
import {View, StyleSheet, Text, ScrollView, Dimensions, ActivityIndicator} from 'react-native'
import TextInput from '../../components/common/TextInput'
import {gql, useQuery} from '@apollo/client'
import Chart from './components/Chart'
import Table from './components/Table'
import Valuation from './components/Valuation'

export default () => {
    const [symbol, setSymbol] = React.useState("BBCA")
    const [eps, setEPS] = React.useState("0")
    const [per, setPER] = React.useState("0")
    const [growth, setGrowth] = React.useState("0")

    const {data, loading, error} = useQuery(STOCK, {
        variables:{
            symbol: symbol
        }
    })

    const handleSymbolChanged = (text: string) => {
        setSymbol(text.toUpperCase())
    }

    const handlePERChange = (text: string) => {
        const num = Number(text)
        if (!Number.isNaN(num)) {
            setPER(text)
        }
    }

    const handleEPSChange = (text: string) => {
        const num = Number(text)
        if (!Number.isNaN(num)) {
            setEPS(text)
        }
    }

    const handleGrowthChange = (text: string) => {
        const num = Number(text)
        if (!Number.isNaN(num)) {
            setGrowth(text)
        }
    }

    // growth
    React.useEffect(() => {
        if (loading || error || data.stock.error.isError) {
            return
        }
        const arr = data.stock.payload.incomeStatement.operatingProfit
        let res: number[] = []
        for(let i = 0; i < arr.length-1; i++) {
            res.push(((arr[i]-arr[i+1])/arr[i+1]*100))
        }
        setGrowth(average(res.slice(0, 5)).toFixed(2))
    }, [data])

    // eps
    React.useEffect(() => {
        if (loading || error || data.stock.error.isError) {
            return
        }
        setEPS(data.stock.payload.incomeStatement.eps[0].toString())
    }, [data])

    // per
    React.useEffect(() => {
        if (loading || error || data.stock.error.isError) {
            return
        }
        const arr: number[] = data.stock.payload.incomeStatement.per
        let avg = 0
        let length = 0
        arr.map((v) => {
            avg += v
            v !== 0 ? length++ : {}
        })
        avg /= length
        setPER(avg.toFixed(2))
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
                containerStyle={styles.symbolInput}
            />
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
            {loading
                ?<ActivityIndicator style={styles.loading} size={30}/> 
                :<View style={styles.dataContainer}>
                    <Valuation
                        eps={eps}
                        per={per}
                        growth={growth}
                        style={styles.valuation}
                    />
                    <Chart 
                        revenue={convertArrayStringToNumber(data.stock.payload.incomeStatement.revenue)}
                        gross={convertArrayStringToNumber(data.stock.payload.incomeStatement.grossProfit)}
                        operating={convertArrayStringToNumber(data.stock.payload.incomeStatement.operatingProfit)}
                        net={convertArrayStringToNumber(data.stock.payload.incomeStatement.netProfit)}
                    />
                    <ScrollView horizontal style={{width:Dimensions.get('window').width-50}}>
                        <Table
                            header={["EPS", "PER"]}
                            data={[data.stock.payload.incomeStatement.eps, data.stock.payload.incomeStatement.per]}
                        />
                    </ScrollView>
                    <Text>AVG 5Y Growth: {growth}%</Text>
                </View>
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
            error{
                isError
            }
        }
    }
`

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:25,
    },
    inputContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:5,
        marginBottom:5,
    },
    dataContainer:{

    },
    textInput:{
        marginRight:10
    },
    symbolInput:{
        alignSelf:'flex-start'
    },
    valuation:{
        marginBottom: 10,
        width: Dimensions.get('window').width > 500 ? 400 : '100%'
    },
    loading:{
        marginTop:30,
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