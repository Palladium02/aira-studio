import { Line } from 'react-chartjs-2';
import useFetch from '../../hooks/useFetch';

const DashboardRight = (): JSX.Element => {
  let requestData = useFetch(
    '/api/db/getTotalAmountOfRequests',
    {},
    [0, 0, 0, 0, 0, 0, 0]
  ).data.requests;

  let chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Son'],
    datasets: [
      {
        label: 'Requests on that day',
        data: requestData,
        fill: false,
        borderColor: 'rgb(86, 88, 214)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="dashboard-right">
      <div className="dashboard-item">
        <Line
          data={chartData}
          height={600}
          width={1000}
          options={{ maintainAspectRatio: false }}
        />
      </div>
      <div className="dashboard-item" id="recentActions">
        <div className="recent-actions-header">
          <p>Recent activity</p>
        </div>
        <div className="recent-actions-feed"></div>
      </div>
    </div>
  );
};

export default DashboardRight;
