<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- path点击会去/home -->
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
             <div id="main" style="width: 750px;height:400px;"></div>
        </el-card>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import _ from 'lodash'
export default {
    data(){
        return{
            // 需要合并的数据
            options: {
            title: {
                text: '用户来源'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#E9EEF3'
                }
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
                boundaryGap: false
                }
            ],
            yAxis: [
                {
                type: 'value'
                }
            ]
            }
         }
    },
    created(){
    },
    // 此时,页面上的元素,已经被渲染完毕了
    async mounted(){
        // 3. 基于准备好的dom，初始化echarts实例
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        const {data:res}= await this.$http.get('reports/type/1');
        if(res.meta.status!==200){
            return this.$message.error('获取折线图数据失败!');
        }
        // 4. 指定图表的配置项和数据
        // var option;
        const result = _.merge(res.data, this.options)
        // 5. 使用刚指定的配置项和数据显示图表。
        // this.options && myChart.setOption(res.data);
        myChart.setOption(result);
    },
    methods:{
    }
}
</script>
<style lang="less" scoped>
</style>