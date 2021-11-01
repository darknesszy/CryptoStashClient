import React from 'react'
import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import dayjs from 'dayjs'

export default ({ hashrates }) => {
    return (
        <LineChart
            data={{
                labels: hashrates.map(hashrate => dayjs(hashrate.created).format('HH:mm:ss')),
                datasets: [
                    {
                        data: hashrates.map(hashrate => hashrate.average / 1000000)
                    }
                ]
            }}
            width={Dimensions.get("window").width - 48} // from react-native
            height={220}
            yAxisSuffix="Mh/s"
            yAxisInterval={1} // optional, defaults to 1
            // verticalLabelRotation={15}
            chartConfig={{
                yLabelsOffset: 10,
                xLabelsOffset: 10,
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForLabels: {
                    fontSize: 8
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
            }}
            bezier
            style={{ 
                borderRadius: 10,
                marginLeft: 24
            }}
        />
    )
}