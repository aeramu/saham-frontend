import React from 'react'
import {View, StyleSheet, Text, ScrollView, Dimensions, ActivityIndicator} from 'react-native'
import TextInput from '../../components/common/TextInput'
import {gql, useQuery} from '@apollo/client'
import Chart from './components/Chart'
import Table from './components/Table'
import Valuation from './components/Valuation'
import Calculator from './components/Calculator'

export default () => {
    const [symbol, setSymbol] = React.useState("BBCA")
    const [eps, setEPS] = React.useState("0")
    const [per, setPER] = React.useState("0")
    const [growth, setGrowth] = React.useState("0")
    const [growthList, setGrowthList] = React.useState<number[]>([0])

    const {data, loading, error} = useQuery(STOCK, {
        variables:{
            symbol: symbol
        }
    })

    const handleSymbolChanged = (text: string) => {
        setSymbol(text.toUpperCase())
    }

    const handlePERChange = (text: string) => {
        if (text == "-") {
            setPER(text)
        }
        const num = Number(text)
        if (!Number.isNaN(num)) {
            setPER(text)
        }
    }

    const handleEPSChange = (text: string) => {
        if (text == "-") {
            setEPS(text)
        }
        const num = Number(text)
        if (!Number.isNaN(num)) {
            setEPS(text)
        }
    }

    const handleGrowthChange = (text: string) => {
        if (text == "-") {
            setGrowth(text)
        }
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
        setGrowthList(res)
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
            {loading
                ?<ActivityIndicator style={styles.loading} size={30}/> 
                :<View style={styles.dataContainer}>
                    <TextInput
                        label="EPS"
                        placeholder="EPS"
                        value={eps}
                        onChangeText={handleEPSChange}
                        containerStyle={styles.textInput}
                    />
                    <Calculator
                        data={data.stock.payload.incomeStatement.eps}
                        setResult={(num) => setEPS(num.toFixed(2))}
                        initialState={[true]}
                    />
                    <TextInput
                        label="PER"
                        placeholder="PER"
                        value={per}
                        onChangeText={handlePERChange}
                        containerStyle={styles.textInput}
                    />
                    <Calculator
                        data={data.stock.payload.incomeStatement.per}
                        suffix='x'
                        setResult={(num) => setPER(num.toFixed(2))}
                        initialState={[true, true, true, true, true, true, true, true, true, true]}
                    />
                    <TextInput
                        label="Growth"
                        placeholder="Growth"
                        value={growth}
                        onChangeText={handleGrowthChange}
                        containerStyle={styles.textInput}
                    />
                    <Calculator
                        data={growthList}
                        suffix='%'
                        setResult={(num) => setGrowth(num.toFixed(2))}
                        initialState={[true, true, true, true, true]}
                    />
                    <Valuation
                        eps={eps}
                        per={per}
                        growth={growth}
                        style={styles.valuation}
                    />
                    <ScrollView horizontal style={{width:Dimensions.get('window').width-50}}>
                        <Chart
                            labels={years.slice(0, data.stock.payload.incomeStatement.revenue.length)}
                            revenue={convertArrayStringToNumber(data.stock.payload.incomeStatement.revenue)}
                            gross={convertArrayStringToNumber(data.stock.payload.incomeStatement.grossProfit)}
                            operating={convertArrayStringToNumber(data.stock.payload.incomeStatement.operatingProfit)}
                            net={convertArrayStringToNumber(data.stock.payload.incomeStatement.netProfit)}
                        />
                    </ScrollView>
                </View>
            }
        </View>
    )
}

const years = ["2020","2019","2018","2017","2016","2015","2014","2013","2012","2011",
                "2010","2009","2008","2007","2006","2005","2004","2003","2002","2001"]

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
        marginRight:10,
        alignSelf:'flex-start'
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