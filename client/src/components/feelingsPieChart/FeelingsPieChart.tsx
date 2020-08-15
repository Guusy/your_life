import { PieChart } from 'react-minimal-pie-chart';

export default ({ data }) => {
  return (
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
          data={data}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          {data.map(feeling => (
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
  );
};
