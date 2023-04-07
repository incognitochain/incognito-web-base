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
  const [isMissMatch, setMisMatch] = React.useState(false);
  const isStrongPassRef = React.useRef(false);

  const onChangePassword = (event: any) => {
    const input = event.target.value;
    setPassword(input);
    setMisMatch(false);
    isStrongPassRef.current = false;
  };

  const onChangeConfirmPassword = (event: any) => {
    const input = event.target.value;
    setMisMatch(false);
    setConfirmPassword(input);
  };

  const onPasswordStrong = () => {
    isStrongPassRef.current = true;
  };

  const continueOnClick = () => {
    if (password.length !== confirmPassword.length || password !== confirmPassword) {
      setMisMatch(true);
    } else {
      props.onConfirmPassword(password);
    }
  };

  return (
    <Container>
      <Space.Vertical size={50} />
      <Typography.Text type="h4" fontWeight={700}>
        {'Set a password'}
      </Typography.Text>
      <Space.Vertical size={16} />

      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'} textAlign={'left'} width={'100%'}>
        {'When performing operations that need to be signed with your secret key, this password will be required'}
      </Typography.Text>

      <Space.Vertical size={20} />

      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'} textAlign={'left'} width={'100%'}>
        {'Passwords must contain:'}
      </Typography.Text>
      <Space.Vertical size={10} />
      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'} textAlign={'left'} width={'100%'}>
        &emsp;{'• A minimum of 1 upper case letter [A-Z]'}
      </Typography.Text>
      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'} textAlign={'left'} width={'100%'}>
        &emsp;{'• A minimum of 1 lower case letter [a-z]'}
      </Typography.Text>
      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'} textAlign={'left'} width={'100%'}>
        &emsp;{'• A minimum of 1 numeric character [0-9]'}
      </Typography.Text>
      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'} textAlign={'left'} width={'100%'}>
        &emsp;{'• A minimum of 1 special character [!@#$%^&*]'}
      </Typography.Text>
      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'} textAlign={'left'} width={'100%'}>
        &emsp;{'• Must be at least 10 characters'}
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
      {isStrongPassRef.current === true && (isMissMatch || props.errorMess) && (
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
        disabled={!isStrongPassRef.current}
        onClick={continueOnClick}
      >
        {'Continue'}
      </AppButton>
    </Container>
  );
};

export default React.memo(SetPassword);
