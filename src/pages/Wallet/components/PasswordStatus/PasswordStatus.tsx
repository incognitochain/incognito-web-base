import React from 'react';

import { Container } from './PasswordStatus.styled';

export enum PasswordStatusType {
  veryWeak,
  weak,
  strong,
}

interface PasswordStatusProps {
  value: string;
  onPasswordStrong?: () => void;
}

const PasswordStatus = (props: PasswordStatusProps) => {
  let type: PasswordStatusType | undefined = undefined;
  let message = '';

  const passwordValue = props.value;
  const passwordLength = passwordValue.length;

  const poorRegExp = /[a-z]/;
  const weakRegExp = /(?=.*?[0-9])/;
  const strongRegExp = /(?=.*?[#?!@$%^&*-])/;
  const whitespaceRegExp = /^$|\s+/;

  const poorPassword = poorRegExp.test(passwordValue);
  const weakPassword = weakRegExp.test(passwordValue);
  const strongPassword = strongRegExp.test(passwordValue);
  const whiteSpace = whitespaceRegExp.test(passwordValue);

  if (passwordValue === '') {
    type = PasswordStatusType.veryWeak;
  } else {
    if (whiteSpace) {
      type = PasswordStatusType.veryWeak;
      message = 'Whitespaces are not allowed!';
    }

    if (poorPassword || weakPassword || strongPassword) {
      type = PasswordStatusType.veryWeak;
      message = 'Poor!';
    }

    if (passwordLength >= 6 && poorPassword && (weakPassword || strongPassword)) {
      type = PasswordStatusType.weak;
      message = 'Weak!';
    }

    if (passwordLength >= 8 && poorPassword && weakPassword && strongPassword) {
      type = PasswordStatusType.strong;
      message = 'Strong!';
      props.onPasswordStrong && props.onPasswordStrong();
    }
  }

  return (
    <Container type={type}>
      <p className="text" style={{ marginRight: 6 }}>
        Password strength -
      </p>
      <p className="text text-status">{`${message}`}</p>
    </Container>
  );
};

export default React.memo(PasswordStatus);
