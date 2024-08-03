import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface EChartsComponentProps {
  option: echarts.EChartsOption;
  style?: React.CSSProperties;
}

const EChartsComponent: React.FC<EChartsComponentProps> = ({ option, style }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chartInstance: echarts.ECharts | undefined;

    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);
      chartInstance.setOption(option);
    }

    const handleResize = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (chartInstance) {
        chartInstance.dispose();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [option]);

  return <div ref={chartRef} style={style} />;
};

export default EChartsComponent;
