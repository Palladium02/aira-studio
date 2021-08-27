import useInput from '../../hooks/useInput';

interface SignUpProps {
  wantsSignUp: boolean;
  setWantsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp = ({ wantsSignUp, setWantsSignUp }: SignUpProps): JSX.Element => {
  let [email, handleEmailChange] = useInput('');
  let [username, handleUsernameChange] = useInput('');
  let [password, handlePasswordChange] = useInput('');

  const switchToSignIn = () => {
    setWantsSignUp(false);
  };

  const signUp = async () => {
    let response = await (
      await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      })
    ).json();

    if (response.success) {
      setWantsSignUp(false);
    }
  };

  return (
    <form
      className="login"
      onSubmit={(event) => {
        event.preventDefault();
        signUp();
      }}
    >
      <h1>Aira Studio - Sign up</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input type="submit" value="Sign in" />
      <button onClick={switchToSignIn}>
        Already have an account? Sign in here.
      </button>
    </form>
  );
};

export default SignUp;
