import {Chart} from "react-charts"


export default function Dashboard({metrics}){
    const chartContainer = `flex flex-col h-96 mt-6`
    const chartStyle = `flex-1 w-full`
    const h2 = `font-bold text-indigo-700 text-xl mb-6`
    //creating the chartdata, primaryAxis, secondaryAxis
    console.log("metrics: ", metrics)
    const chartData = [
        {
            data : metrics.map( m => ({primary : m.name, secondary : Number(m.sum)}))
        }
    ]
    const primaryAxis = {
        getValue : d => d.primary,
        scaleType : "band",
        padding : 0.2,
        position : "bottom"
    }
    const y_max = () => {
        if(metrics.length > 0){
            const maxSum = Math.max(...metrics.map(m => m.sum))
            return maxSum + 2000
        }
        return 5000
    }
    const secondaryAxes = [{
        getValue : d => d.secondary,
        scaleType : "linear",
        min: 0,
        max: y_max(),
        padding : {top : 20, bottom : 40},
    }]

    return(
        <div className={chartContainer}>
            <h2 className={h2}>Total sales:</h2>
            <div className={chartStyle}>
                <Chart 
                  options={{
                    data : chartData,
                    primaryAxis,
                    secondaryAxes,
                    type : "bar",
                    defaultColors : ["#4338ca"],
                    tooltip : {show : false}
                  }}
                />
            </div>
        </div>
    )
}