import { TriangleFill } from 'akar-icons';
import useFetch from '../../hooks/useFetch';

const DashboardLeft = (): JSX.Element => {
  const cpuUsage = useFetch('/api/db/getCPUUsage', {}, 0).data.usage;
  // const [cpuUsage, setCpuUsage] = useState(34);
  const uptime = useFetch('api/db/getUptime', {}, 0).data.uptime;

  return (
    <div className="dashboard-left">
      <div className="dashboard-left-row dlr-1">
        <div className="dashboard-item" id="amountOfTables">
          <div>3</div>
          <div>no. of tables</div>
        </div>
        <div className="dashboard-item" id="totalStorageUsage">
          <div>3kB</div>
          <div>used storage</div>
        </div>
        <div className="dashboard-item" id="uptime">
          <div>
            <TriangleFill fill="#32CD32" />
            <span>Uptime</span>
          </div>
          <div>{uptime}sec</div>
        </div>
      </div>
      <div className="dashboard-left-row  dlr-2">
        <div className="dashboard-item" id="cpuUsage">
          <div
            className={cpuUsage < 50 ? 'ok' : cpuUsage < 70 ? 'warning' : 'bad'}
          >
            {cpuUsage}% / 100%
          </div>
          <div>CPU Usage</div>
        </div>
        <div className="dashboard-item"></div>
      </div>
      <div className="dashboard-left-row  dlr-3">
        <div className="dashboard-item"></div>
        <div className="dashboard-item"></div>
      </div>
    </div>
  );
};

export default DashboardLeft;
