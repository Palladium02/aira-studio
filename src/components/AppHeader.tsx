import './AppHeader.css';

interface Props {
  username: string;
}

const AppHeader = ({ username }: Props): JSX.Element => {
  return (
    <div className="app-header">
      <div className="header-left"></div>
      <div className="header-center">AiraDB Studio - {username}</div>
      <div className="header-right"></div>
    </div>
  );
};

export default AppHeader;
