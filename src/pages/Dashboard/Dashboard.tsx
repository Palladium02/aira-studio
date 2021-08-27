import { Line } from 'react-chartjs-2';
import useFetch from '../../hooks/useFetch';
import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';
import './Dashboard.css';
import './DashboardLeft.css';
import './DashboardRight.css';

const Dashboard = (): JSX.Element => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-body">
        <DashboardLeft />
        <DashboardRight />
      </div>
    </div>
  );
};

export default Dashboard;
