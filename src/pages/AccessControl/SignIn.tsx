import useInput from '../../hooks/useInput';

interface SignInProps {
  wantsSignUp: boolean;
  setWantsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn = ({ wantsSignUp, setWantsSignUp }: SignInProps): JSX.Element => {
  let [email, handleEmailChange] = useInput('');
  let [password, handlePasswordChange] = useInput('');

  const switchToSignUp = (): void => {
    setWantsSignUp(true);
  };

  const signIn = async () => {
    let response = await (
      await fetch('/auth/weblogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
    ).json();

    if (response.isAuth) {
      window.location.reload();
    }
  };

  document.title = 'Aira Studio - Sign in';

  return (
    <form
      className="login"
      onSubmit={(event) => {
        event.preventDefault();
        signIn();
      }}
    >
      <h1>Aira Studio - Sign in</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input type="submit" value="Sign in" />
      <button onClick={switchToSignUp}>
        Don't have an account yet? Join today.
      </button>
    </form>
  );
};

export default SignIn;
