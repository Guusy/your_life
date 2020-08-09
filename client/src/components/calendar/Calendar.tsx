import { Radio } from 'antd';
import { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Calendar, { RangeFilter } from '../../domain/Calendar';
import Thought from '../../domain/Thought';

interface CalendarProps {
  thoughts: Thought[];
}

export default ({ thoughts }: CalendarProps) => {
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>(RangeFilter.week);
  const calendar = new Calendar({ thoughts });
  const handleSizeChange = event => {
    const {
      target: { value }
    } = event;
    setRangeFilter(value);
  };
  const pieChartData = calendar.getListFeelingFromPieChart(rangeFilter);
  return (
    <div>
      <Radio.Group value={rangeFilter} onChange={handleSizeChange}>
        <Radio.Button value={RangeFilter.week}>Esta semana</Radio.Button>
        <Radio.Button value={RangeFilter.month}>Este mes</Radio.Button>
        <Radio.Button value={RangeFilter.year}>Este año</Radio.Button>
      </Radio.Group>
      <div style={{ display: 'flex' }}>
        <div style={{ maxWidth: '200px' }}>
          <PieChart
            style={{
              fontFamily:
                '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
              fontSize: '6px'
            }}
            radius={PieChart.defaultProps.radius - 6}
            lineWidth={60}
            animate
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
            labelPosition={100 - 60 / 2}
            labelStyle={{
              fill: '#fff',
              opacity: 0.75,
              pointerEvents: 'none'
            }}
            data={pieChartData}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            {pieChartData.map(feeling => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    height: '10px',
                    width: '10px',
                    backgroundColor: feeling.color,
                    marginRight: '3px'
                  }}
                />
                {feeling.title} : {feeling.value}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p>
        Tu sentimiento principal fue:{' '}
        {calendar.getThePrincipalFeelingOf(rangeFilter)}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {calendar.getDays(rangeFilter).map(day => {
          const dayThoughts = calendar.getThoughtsOf(day);
          return (
            <div style={{ border: '1px solid black', padding: '1em' }}>
              {day.date()} de {Calendar.getMonthName(day.month())}
              <p>Pensamientos: {dayThoughts.length}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
