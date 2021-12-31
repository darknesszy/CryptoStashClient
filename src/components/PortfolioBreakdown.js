import React from 'react'
import { useWindowDimensions } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

export default PortfolioBreakdown = ({ portfolio }) => {
  const layout = useWindowDimensions()

  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(255, 255, 255, .7)",
      legendFontColor: "#7F7F7F",
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "rgba(0, 0, 0, .5)",
      legendFontColor: "#7F7F7F",
    },
    {
      name: "Beijing",
      population: 527612,
      color: "rgba(255, 255, 255, .5)",
      legendFontColor: "#7F7F7F",
    },
    {
      name: "New York",
      population: 8538000,
      color: "rgba(0, 0, 0, .3)",
      legendFontColor: "#7F7F7F",
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgba(255, 255, 255, .3)",
      legendFontColor: "#7F7F7F",
    }
  ];
  return (
    <PieChart
      data={portfolio
        .map((data, index) => 
          ({ 
            ...data,
            color: `rgba(${index % 2 == 0 ? `255, 255, 255, ${(5 - index) * .1}` : `0, 0, 0, ${(5 - index) * .1}`})`,
            legendFontColor: '#7F7F7F'
          }))
      }
      width={layout.width - 48}
      height={layout.width / 2}
      accessor='balance'
      backgroundColor='orange'
      center={[10, 2]}
      chartConfig={{
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
      absolute
      style={{
        borderRadius: 10,
        marginLeft: 24,
      }}
    />
  )
}