import { Radio } from 'antd';
import { useState } from 'react';
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

  return (
    <div>
      <Radio.Group value={rangeFilter} onChange={handleSizeChange}>
        <Radio.Button value={RangeFilter.week}>Esta semana</Radio.Button>
        <Radio.Button value={RangeFilter.month}>Este mes</Radio.Button>
        <Radio.Button value={RangeFilter.year}>Este año</Radio.Button>
      </Radio.Group>
      <p>
        Tus sentimientos de esta semana fueron:
        {calendar.getAllFelingsOf(rangeFilter).map(feeling => `${feeling}, `)}
      </p>
      <p>
        Tu sentimiento principal fue:{' '}
        {calendar.getThePrincipalFeelingOf(rangeFilter)}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {calendar.getDays(rangeFilter).map(day => (
          <div style={{ border: '1px solid black', padding: '1em' }}>
            {day.day() + 1} de {Calendar.getMonthName(day.month())}
          </div>
        ))}
      </div>
    </div>
  );
};
