import React from 'react'
import {Dimensions} from 'react-native'
import {LineChart, BarChart} from 'react-native-chart-kit'

interface ChartProps {
    revenue: number[]
    gross: number[]
    operating: number[]
    net: number[]
}

export default ({revenue, gross, operating, net}: ChartProps) => {
    return(
        <LineChart
            data={{
            labels: years.slice(0,revenue.length),
            datasets: [
                {
                    data: revenue,
                },
                {
                    data: gross,
                },
                {
                    data: operating,
                },
                {
                    data: net,
                },
            ],
            }}
            width={Dimensions.get('window').width - 50} // from react-native
            height={220}
            yAxisLabel={'Rs'}
            chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 0) => `rgba(100, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 16,
                },  
            }}
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
        />
    )
}

const years = ["2020","2019","2018","2017","2016","2015","2014","2013","2012","2011",
                "2010","2009","2008","2007","2006","2005","2004","2003","2002","2001"]