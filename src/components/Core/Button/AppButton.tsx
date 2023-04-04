import { Button as RebassButton, ButtonProps as RebassButtonProps } from 'rebass';
import styled from 'styled-components/macro';
declare const ButtonTypes: ['default', 'primary', 'secondary', 'third'];
export declare type ButtonType = typeof ButtonTypes[number];

declare const ButtonVariants: ['text', 'contained', 'outlined'];
export declare type ButtonVariant = typeof ButtonVariants[number];

const RawButtonStyled = styled.button``;
const RebassButtonStyled = styled(RebassButton)``;

type RebassButtonType = Omit<RebassButtonProps, 'css'>;

// interface BaseButtonProps extends ButtonProps {
//   buttonType?: ButtonType;
//   variant?: ButtonVariant;
// }

type BaseButtonProps = {
  buttonType?: ButtonType;
  variant?: ButtonVariant;
} & RebassButtonType;

//Custom Button base Detail Project

const BaseButton = styled(RebassButtonStyled)<BaseButtonProps>`
  /* Override CSS  */
  &&& {
    /* Font */
    height: 50px;

    /* Font */
    font-size: 16px;
    font-weight: 500;
    line-height: 140%;
    font-style: normal;
    text-align: center;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;

    /* Border  */
    border-radius: 8px;

    outline: 0px;

    margin: 0px;
    /* Padding  */
    padding: 8px 16px 8px 16px;

    /* Gap  */
    gap: 10px;

    /* Mouse Hover  */
    :hover {
      cursor: pointer;
      opacity: 0.9;
    }

    :disabled {
      opacity: 0.4;
      :hover {
        cursor: auto;
        transform: scale(1);
      }
    }

    &.maxSize {
      max-width: 85px;
      max-height: 35px;
    }
  }
`;

const TextButton = styled(BaseButton)<BaseButtonProps>`
  border-radius: 0px;
  border: 0px;
  background-color: 'transparent';
  color: ${({ buttonType, theme }) => {
    switch (buttonType) {
      case 'primary':
        return theme.primary;
      case 'secondary':
        return theme.secondary1;
      case 'third':
        return theme.background1;
      default:
        return 'white';
    }
  }};
`;

const ContainedButton = styled(BaseButton)<BaseButtonProps>`
  border: 0px;

  background-color: ${({ buttonType, theme }) => {
    switch (buttonType) {
      case 'primary':
        return theme.primary;
      case 'secondary':
        return theme.secondary1;
      case 'third':
        return theme.bg4;
      default:
        return 'white';
    }
  }};

  color: ${({ buttonType, theme }) => {
    switch (buttonType) {
      case 'primary':
        return 'white';
      case 'secondary':
        return theme.primary;
      case 'third':
        return 'white';
      default:
        return 'white';
    }
  }};
`;

const OutlinedButton = styled(BaseButton)<BaseButtonProps>`
  background-color: 'transparent';
  border: 1px solid
    ${({ buttonType, theme }) => {
      switch (buttonType) {
        case 'primary':
          return theme.primary;
        case 'secondary':
          return theme.secondary1;
        case 'third':
          return theme.white;
        default:
          return 'white';
      }
    }};
`;

export const AppButton = (props: BaseButtonProps) => {
  const { variant = 'contained', buttonType = 'default' } = props;

  const newProps = {
    ...props,
    buttonType,
  };
  switch (variant) {
    case 'text':
      return <TextButton {...newProps} />;
    case 'contained':
      return <ContainedButton {...newProps} />;
    case 'outlined':
      return <OutlinedButton {...newProps} />;
    default:
      return null;
  }
};
