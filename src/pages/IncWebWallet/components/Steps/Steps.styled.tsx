import styled, { DefaultTheme } from 'styled-components/macro';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const StepItem = styled.div<{
  isSelected: boolean;
  isVerify: boolean;
  hideIndicatorLeft: boolean;
  hideIndicatorRight: boolean;
}>`
  .content {
    display: flex;
    flex-direction: column;
    .indicator-container {
      display: flex;
      flex: 1;
      flex-direction: row;
      align-items: center;
      .indicator-left {
        height: 1px;
        flex: 1;
        background-color: ${({ theme, hideIndicatorLeft, isVerify, isSelected }) =>
          hideIndicatorLeft ? 'transparent' : isVerify || isSelected ? theme.white : theme.border1};
      }
      .indicator-right {
        height: 1px;
        flex: 1;
        background-color: ${({ theme, hideIndicatorRight, isVerify }) =>
          isVerify ? theme.white : hideIndicatorRight ? 'transparent' : theme.border1};
      }
      .number-container {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: ${({ theme, isSelected, isVerify }) =>
          isSelected || isVerify ? theme.white : theme.color_grey1};
        display: flex;
        align-items: center;
        justify-content: center;
        .number {
          font-weight: 600;
          font-size: 16px;
          line-height: 140%;
          text-align: center;
          color: ${({ theme, isSelected, isVerify }) =>
            isSelected || isVerify ? theme.color_blue : theme.color_grey4};
        }
      }
    }

    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 140%;
      text-align: center;
      padding-left: 16px;
      padding-right: 16px;
      margin-top: 16px;
      color: ${({ theme, isSelected, isVerify }) => (isSelected || isVerify ? theme.white : theme.color_grey4)};
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    .content {
      .title {
        padding-left: 4px;
        padding-right: 4px;
      }
    }
  `}
`;
