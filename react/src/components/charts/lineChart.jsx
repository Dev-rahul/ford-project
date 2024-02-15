
import { ResponsiveLine } from '@nivo/line'


const data = [
    {
      "id": "japan",
      "color": "hsl(0, 70%, 50%)",
      "data": [
        {
          "x": "200",
          "y": 2
        },
        {
          "x": "300",
          "y": 235
        },
        {
          "x": "400",
          "y": 136
        },
        {
          "x": "500",
          "y": 97
        },
        {
          "x": "600",
          "y": 30
        },
        {
          "x": "700",
          "y": 224
        },
        {
          "x": "800",
          "y": 20
        },
        {
          "x": "900",
          "y": 115
        },
        {
          "x": "1000",
          "y": 256
        },
        {
          "x": "1100",
          "y": 12
        },
        {
          "x": "1200",
          "y": 199
        },
        {
          "x": "1300",
          "y": 236
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(78, 70%, 50%)",
      "data": [
        {
          "x": "200",
          "y": 36
        },
        {
          "x": "300",
          "y": 277
        },
        {
          "x": "400",
          "y": 21
        },
        {
          "x": "500",
          "y": 239
        },
        {
          "x": "600",
          "y": 99
        },
        {
          "x": "700",
          "y": 62
        },
        {
          "x": "800",
          "y": 13
        },
        {
          "x": "900",
          "y": 281
        },
        {
          "x": "1000",
          "y": 208
        },
        {
          "x": "1100",
          "y": 163
        },
        {
          "x": "1200",
          "y": 227
        },
        {
          "x": "1300",
          "y": 212
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(153, 70%, 50%)",
      "data": [
        {
          "x": "200",
          "y": 282
        },
        {
          "x": "300",
          "y": 250
        },
        {
          "x": "400",
          "y": 17
        },
        {
          "x": "500",
          "y": 34
        },
        {
          "x": "600",
          "y": 187
        },
        {
          "x": "700",
          "y": 13
        },
        {
          "x": "800",
          "y": 189
        },
        {
          "x": "900",
          "y": 120
        },
        {
          "x": "1000",
          "y": 16
        },
        {
          "x": "1100",
          "y": 221
        },
        {
          "x": "1200",
          "y": 196
        },
        {
          "x": "1300",
          "y": 199
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(104, 70%, 50%)",
      "data": [
        {
          "x": "200",
          "y": 246
        },
        {
          "x": "300",
          "y": 71
        },
        {
          "x": "400",
          "y": 148
        },
        {
          "x": "500",
          "y": 3
        },
        {
          "x": "600",
          "y": 26
        },
        {
          "x": "700",
          "y": 79
        },
        {
          "x": "800",
          "y": 168
        },
        {
          "x": "900",
          "y": 134
        },
        {
          "x": "1000",
          "y": 161
        },
        {
          "x": "1100",
          "y": 1
        },
        {
          "x": "1200",
          "y": 9
        },
        {
          "x": "1300",
          "y": 294
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(119, 70%, 50%)",
      "data": [
        {
          "x": "200",
          "y": 243
        },
        {
          "x": "300",
          "y": 241
        },
        {
          "x": "400",
          "y": 19
        },
        {
          "x": "500",
          "y": 168
        },
        {
          "x": "600",
          "y": 111
        },
        {
          "x": "700",
          "y": 126
        },
        {
          "x": "800",
          "y": 208
        },
        {
          "x": "900",
          "y": 264
        },
        {
          "x": "1000",
          "y": 291
        },
        {
          "x": "1100",
          "y": 288
        },
        {
          "x": "1200",
          "y": 212
        },
        {
          "x": "1300",
          "y": 98
        }
      ]
    }
]

const MyResponsiveLine = () => (<div className=''>
  <div className='flex flex-row gap-2 m-2 px-4'>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  TA
</button>
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  ANC
</button>
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  REHIT
</button>
  </div>
  <div className='w-[900px] h-[600px] p-2'>
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Dataset 1',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        // legends={[
        //     {
        //         anchor: 'bottom-right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 100,
        //         translateY: 0,
        //         itemsSpacing: 0,
        //         itemDirection: 'left-to-right',
        //         itemWidth: 80,
        //         itemHeight: 20,
        //         itemOpacity: 0.75,
        //         symbolSize: 12,
        //         symbolShape: 'circle',
        //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemBackground: 'rgba(0, 0, 0, .03)',
        //                     itemOpacity: 1
        //                 }
        //             }
        //         ]
        //     }
        // ]}
    />
    </div>
    </div>
)
export default MyResponsiveLine


