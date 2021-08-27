import { Copy, EyeOpen, EyeSlashed } from 'akar-icons';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import useInput from '../../hooks/useInput';
import './Settings.css';

const Settings = (): JSX.Element => {
  let { user, setUser } = useContext(UserContext);
  let [apiKeys, setApiKeys] = useState<string[]>([]);
  let [username, handleUsernameChange] = useInput(user.username);

  const generateAPIKey = async () => {
    let data = await (
      await fetch('/auth/getAPIToken', {
        method: 'POST',
      })
    ).json();
    setApiKeys([...apiKeys, data.token]);
  };

  useEffect(() => {
    const getKeys = async () => {
      let response = await (await fetch('/auth/getAPIKeys')).json();
      setApiKeys([...apiKeys, ...response.keys]);
    };

    getKeys();
  }, []);

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>
      <div className="settings-body">
        <div className="settings-section">
          <h2>Security</h2>
          <div className="section-body">
            <h3>API keys</h3>
            <ul>
              {apiKeys.map((key, index) => {
                return <APIKey keyValue={key} key={key + index} />;
              })}
            </ul>
            <span className="generate-key-btn" onClick={generateAPIKey}>
              Generate new key
            </span>
          </div>
        </div>
        <div className="settings-section">
          <h2>Username</h2>
          <div className="section-body username-settings">
            <input
              type="text"
              placeholder="Username"
              onChange={handleUsernameChange}
              value={username}
            />
            <span>Change username</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface APIKeyProps {
  keyValue: string;
}

const APIKey = ({ keyValue }: APIKeyProps): JSX.Element => {
  let [isVisible, setIsVisible] = useState(false);

  const handleVisibilityChange = () => {
    setIsVisible(!isVisible);
  };

  const copyAPIKey = () => {
    navigator.clipboard.writeText(keyValue);
  };

  return (
    <li>
      <span className="key">
        {isVisible ? keyValue : new Array(keyValue.length).fill('*').join('')}
      </span>
      <span style={{ cursor: 'pointer' }}>
        {isVisible ? (
          <EyeSlashed onClick={handleVisibilityChange} />
        ) : (
          <EyeOpen onClick={handleVisibilityChange} />
        )}
      </span>
      <span style={{ cursor: 'copy' }}>
        <Copy onClick={copyAPIKey} />
      </span>
    </li>
  );
};

export default Settings;
