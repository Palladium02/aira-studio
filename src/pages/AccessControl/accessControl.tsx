import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './accessControl.css';

const AccessControlContainer = (): JSX.Element => {
  const [wantsSignUp, setWantsSignUp] = useState(false);
  return (
    <div className="access-control">
      {wantsSignUp ? (
        <SignUp wantsSignUp={wantsSignUp} setWantsSignUp={setWantsSignUp} />
      ) : (
        <SignIn wantsSignUp={wantsSignUp} setWantsSignUp={setWantsSignUp} />
      )}
    </div>
  );
};

export default AccessControlContainer;
