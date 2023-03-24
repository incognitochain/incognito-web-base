import { AppButton, Space, Typography } from 'components/Core';
import { Input } from 'components/Inputs';
import AlertMessage, { AlertMessageType } from 'pages/IncWebWallet/components/AlertMessage/AlertMessage';
import PasswordStatus from 'pages/IncWebWallet/components/PasswordStatus';
import { MOCKUP_PASSWORD } from 'pages/IncWebWallet/mockup/password';
import React from 'react';

import { Container } from './SetPassword.styled';

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
      <Space.Vertical size={50} />
      <Typography.Text type="h4" fontWeight={700}>
        {'Set a password'}
      </Typography.Text>
      <Space.Vertical size={16} />
      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'}>
        {'When performing operations that need to be signed with your secret key, this password will be required'}
      </Typography.Text>

      <Space.Vertical size={40} />

      {/* Password field */}
      <Input type="password" placeholder="Password" value={password} onChange={onChangePassword} />

      <Space.Vertical size={20} />

      {/* Password Status */}
      <PasswordStatus value={password} onPasswordStrong={onPasswordStrong} />

      <Space.Vertical size={40} />

      {/* Confirm Password field */}
      <Input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={onChangeConfirmPassword}
      />
      {((isStrongPassRef.current === true &&
        password.length === confirmPassword.length &&
        password !== confirmPassword) ||
        props.errorMess) && (
        <AlertMessage
          type={AlertMessageType.error}
          message={props.errorMess || 'Password and Confirm Password does not match!'}
        />
      )}
      <Space.Vertical size={40} />
      <AppButton
        variant="contained"
        buttonType="primary"
        width={'100%'}
        disabled={!isAbleContinue}
        onClick={() => props.onConfirmPassword(password)}
      >
        {'Continue'}
      </AppButton>
    </Container>
  );
};

export default React.memo(SetPassword);
