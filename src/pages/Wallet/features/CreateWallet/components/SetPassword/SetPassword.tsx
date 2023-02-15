import { ButtonPrimary } from 'components/Core/Button';
import AlertMessage, { AlertMessageType } from 'pages/Wallet/components/AlertMessage/AlertMessage';
import PasswordStatus from 'pages/Wallet/components/PasswordStatus';
import React from 'react';

import { Container, Spinner } from './SetPassword.styled';

interface SetPasswordProps {
  loading: boolean;
  onConfirmPassword: (password: string) => void;
}

const SetPassword = (props: SetPasswordProps) => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const isStrongPassRef = React.useRef(false);

  const [isAbleContinue, setIsAbleContinue] = React.useState(false);

  React.useEffect(() => {
    setIsAbleContinue(false);
    if (isStrongPassRef.current && password === confirmPassword) {
      setIsAbleContinue(true);
    }
  }, [password, confirmPassword]);

  const onChangePassword = (event: any) => {
    const input = event.target.value;
    setPassword(input);
    isStrongPassRef.current = false;
  };

  const onChangeConfirmPassword = (event: any) => {
    const input = event.target.value;
    setConfirmPassword(input);
  };

  const onPasswordStrong = () => {
    isStrongPassRef.current = true;
  };

  return (
    <Container>
      <p className="title">Set a password</p>
      <p className="desc">
        When performing operations that need to be signed with your secret key, this password will be required
      </p>
      <input
        className="input-container"
        type="password"
        placeholder="Password"
        value={password}
        onChange={onChangePassword}
      />
      <PasswordStatus value={password} onPasswordStrong={onPasswordStrong} />

      <input
        className="input-container"
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={onChangeConfirmPassword}
      />

      {isStrongPassRef.current === true &&
        password.length === confirmPassword.length &&
        password !== confirmPassword && (
          <AlertMessage type={AlertMessageType.error} message={'Password and Confirm password does not match!'} />
        )}

      <ButtonPrimary className="btn" disabled={!isAbleContinue} onClick={() => props.onConfirmPassword(password)}>
        {props.loading ? <Spinner /> : <p className="text-btn">Continue</p>}
      </ButtonPrimary>
    </Container>
  );
};

export default React.memo(SetPassword);
