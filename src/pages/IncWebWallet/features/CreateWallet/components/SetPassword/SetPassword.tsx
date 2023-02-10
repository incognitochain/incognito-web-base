import { ButtonPrimary } from 'components/Core/Button';
import { Input } from 'components/Inputs';
import AlertMessage, { AlertMessageType } from 'pages/IncWebWallet/components/AlertMessage/AlertMessage';
import PasswordStatus from 'pages/IncWebWallet/components/PasswordStatus';
import { MOCKUP_PASSWORD } from 'pages/IncWebWallet/mockup/password';
import React from 'react';

import { Container, Spinner } from './SetPassword.styled';

interface SetPasswordProps {
  loading: boolean;
  errorMess?: string;
  onConfirmPassword: (password: string) => void;
}

const SetPassword = (props: SetPasswordProps) => {
  const [password, setPassword] = React.useState(MOCKUP_PASSWORD);
  const [confirmPassword, setConfirmPassword] = React.useState(MOCKUP_PASSWORD);

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
        {'When performing operations that need to be signed with your secret key, this password will be required'}
      </p>
      {/* Password field */}
      <div className="input-container">
        <Input type="password" placeholder="Password" value={password} onChange={onChangePassword} />
      </div>
      {/* Password Status */}
      <PasswordStatus value={password} onPasswordStrong={onPasswordStrong} />
      {/* Confirm Password field */}
      <div className="input-container">
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
        />
      </div>
      {'thank manage kick mimic miss wall youth sing napkin nerve recall memory'}
      {((isStrongPassRef.current === true &&
        password.length === confirmPassword.length &&
        password !== confirmPassword) ||
        props.errorMess) && (
        <AlertMessage
          type={AlertMessageType.error}
          message={props.errorMess || 'Password and Confirm Password does not match!'}
        />
      )}
      <ButtonPrimary className="btn" disabled={!isAbleContinue} onClick={() => props.onConfirmPassword(password)}>
        {props.loading ? <Spinner /> : <p className="text-btn">Continue</p>}
      </ButtonPrimary>
    </Container>
  );
};

export default React.memo(SetPassword);
