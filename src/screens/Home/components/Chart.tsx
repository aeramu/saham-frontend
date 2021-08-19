import React from 'react'
import {LineChart} from 'react-native-chart-kit'

interface ChartProps {
    labels: string[]
    revenue: number[]
    gross: number[]
    operating: number[]
    net: number[]
}

export default ({revenue, gross, operating, net, labels}: ChartProps) => {
    return(
        <LineChart
            data={{
                labels: labels,
                datasets: [
                    {
                        data: revenue,
                        color: () => ('blue')
                    },
                    {
                        data: gross,
                        color: () => ('red')
                    },
                    {
                        data: operating,
                        color: () => ('orange')
                    },
                    {
                        data: net,
                        color: () => ('green')
                    },
                ],
            }}
            width={50*labels.length}
            height={220}
            chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                decimalPlaces: 0,
                color: () => 'grey',
                labelColor: () => 'black',
                strokeWidth: 2,
            }}
            formatYLabel={(y: string) => {
                if (y.length > 13) {
                    return y.slice(0, y.length-12) + 'T'    
                }
                else if (y.length > 10) {
                    return y.slice(0, y.length-9) + 'B'  
                }
                else if (y.length > 7) {
                    return y.slice(0, y.length-6) + 'M'  
                }
                else if (y.length > 4) {
                    return y.slice(0, y.length-3) + 'K'  
                }
                return y
            }}
            style={{
                marginVertical: 8,
            }}
        />
    )
}
