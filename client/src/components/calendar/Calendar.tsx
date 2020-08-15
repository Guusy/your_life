import { Radio } from 'antd';
import { useState } from 'react';
import Link from 'next/link';
import Calendar, { RangeFilter } from '../../domain/Calendar';
import Thought from '../../domain/Thought';
import FeelingsPieChart from '../feelingsPieChart/FeelingsPieChart';

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
      <FeelingsPieChart data={pieChartData} />
      <p>
        Tu sentimiento principal fue:{' '}
        {calendar.getThePrincipalFeelingOf(rangeFilter)}
      </p>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {calendar.getDays(rangeFilter).map(day => {
          const dayThoughts = calendar.getThoughtsOf(day);
          return (
            <Link href={`/day/${day.format('DD-MM-YYYY')}`}>
              <div
                style={{
                  border: '1px solid black',
                  padding: '1em',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  margin: '0.3em'
                }}
              >
                {day.date()} de {Calendar.getMonthName(day.month())}
                <p>Pensamientos: {dayThoughts.length}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
