import React from 'react'
import { Line, Pie } from '@ant-design/charts';
import { Card, Row } from "antd";

function ChartComponent({sortedTransactions}) {
   
        const data = sortedTransactions.map((item) => {
            return {date:item.date , amount: item.amount}
        })
        let spendingData = sortedTransactions.filter((transaction)=>{
            if(transaction.type == 'expense'){
                return {tag: transaction.tag,amount:transaction.amount}
            }
        })
        let finalSpendings = spendingData.reduce((acc,obj)=>{
            let key = obj.tag;
            if(!acc[key]){
                acc[key] = {tag:obj.tag,amount:obj.amount};
            }else{
                acc[key].amount += obj.amount;
            }
            return acc;
        },{});
        const config = {
          data:data,
          width: 500,
          autoFit: true,
          xField: 'date',
          yField: 'amount',
        };
       const spendingConfig = {
        data:Object.values(finalSpendings),
        width: 500,
        angleField:"amount",
        colorField:"tag",
       };
     
       let chart;
       let pieChart;
       const cardStyle = {
        boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)",
        margin: "2rem",
        borderRadius: "0.5rem",
        minWidth: "400px",
        flex: 1,
      };
       
  return (
    <Row gutter={16}>
    <Card bordered={true} style={cardStyle}>
            <h2>Financial Statistics</h2>
         <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
         </Card>
         <Card bordered={true} style={{ ...cardStyle, flex: 0.45 }}>

            <h2>Your Spendings</h2>
            <Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
            </Card>
   
   </Row>
  )
}

export default ChartComponent;