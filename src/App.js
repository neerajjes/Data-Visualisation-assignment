import './App.css';
import * as echarts from 'echarts'; //Importing Echart dependecies
import data from './Wine_data.json'; //Importing Json file from directory

function App() {
  return;
}

var data1 = data.map((alco_val) => {
  return alco_val["Alcohol"];
 }); //Returns Alcohol data from Json file 

var data2 = data.map((mal_val) => {
  return mal_val["Malic Acid"];
}); //Returns Malic Acid data from Json file

var data3 = data.map((hue_val) => {
  return hue_val["Hue"];
}); //Returns Hue data from Json file 

var data4 = data.map((ci_val) => {
  return ci_val["Color intensity"];
}); //Returns color Intensity data from Json file 

function BarChart(data){  //Bar Chart Compelete Function 

  var chartDom = document.getElementById('main');
  var myChart = echarts.init(chartDom, 'dark');
  var option;
  
  
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        name: 'Alcohol Category',
        nameLocation: 'center',
        data: data1,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Mallic Acid',
        nameLocation: 'center',
        nameRotate: '90',
      }
    ],
    series: [
      {
        name: 'Mallic Acid',
        type: 'bar',
        barWidth: '60%',
        data: data2
      }
    ]
  };
  
  myChart = echarts.init(document.getElementById('main'));
  window.onresize = function() {
    myChart.resize(); //Requied to resize chart after page loading via CSS
  };
  
  option && myChart.setOption(option);
};
  
function ScatterChart(data){ //Scatter Chart Compelete Function
 
  var chartDom2 = document.getElementById('main2');
  var myChart2 = echarts.init(chartDom2, 'dark');
  var option;
  
  option = {
    title: {
      text: 'Alcohol, Hue and Color Intensity distribution'
    },
    grid: {
      left: '3%',
      right: '7%',
      bottom: '7%',
      containLabel: true
    },
    tooltip: {
      // trigger: 'axis',
      showDelay: 0,
      formatter: function (params) {
        if (params.value.length > 1) {
          return (
            params.seriesName +
            ' :<br/>' +
            params.value[0] +
            '' +
            params.value[1] +
            ' '
          );
        } else {
          return (
            params.seriesName +
            ' :<br/>' +
            params.name +
            ' : ' +
            params.value +
            ' '
          );
        }
      },
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      }
    },
    toolbox: {
      feature: {
        dataZoom: {},
        brush: {
          type: ['rect', 'polygon', 'clear']
        }
      }
    },
    brush: {},
    legend: {
      data: ['Hue', 'Color Intensity'],
      left: 'center',
      bottom: 10
    },
    xAxis: [
      {
        type: 'value',
        scale: true,
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: 'Hue',
        type: 'scatter',
        emphasis: {
          focus: 'series'
        },
        // prettier-ignore
        data: data3,
        markArea: {
          silent: true,
          itemStyle: {
            color: 'transparent',
            borderWidth: 1,
            borderType: 'dashed'
          },
          data: [
            [
              {
                name: 'Hue Data Range',
                xAxis: 'min',
                yAxis: 'min'
              },
              {
                xAxis: 'max',
                yAxis: 'max'
              }
            ]
          ]
        },
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          lineStyle: {
            type: 'solid'
          },
          data: [{ type: 'average', name: 'AVG' }, { xAxis: 160 }]
        }
      },
      {
        name: 'Color Intensity',
        type: 'scatter',
        emphasis: {
          focus: 'series'
        },
        // prettier-ignore
        data: data4,
        markArea: {
          silent: true,
          itemStyle: {
            color: 'transparent',
            borderWidth: 1,
            borderType: 'dashed'
          },
          data: [
            [
              {
                name: 'Color Data Range',
                xAxis: 'min',
                yAxis: 'min'
              },
              {
                xAxis: 'max',
                yAxis: 'max'
              }
            ]
          ]
        },
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          lineStyle: {
            type: 'solid'
          },
          data: [{ type: 'average', name: 'Average' }, { xAxis: 170 }]
        }
      }
    ]
  };
  
  option && myChart2.setOption(option);
  
  myChart2 = echarts.init(document.getElementById('main2'));
  window.onresize = function() {
    myChart2.resize(); //Requied to resize chart after page loading via CSS
  };
};
BarChart(); //Calling Barchart Function
ScatterChart(); //Calling ScatterChart Function

export default App;