import { transparentize } from 'polished';
import { X } from 'react-feather';
import styled, { keyframes } from 'styled-components/macro';

export const Styled = styled.div`
  .loading-container {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 2;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.modalBG};

    .loading-content {
      background-color: ${({ theme }) => theme.bg3};
      border: 1px solid ${({ theme }) => theme.border1};
      box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, theme.shadow1)};
      max-width: 50vw;
      border-radius: 16px;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 24px;
      align-self: center;
    }
  }

  .collection-container {
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .collection-img {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    margin-right: 16px;
  }

  .collection-nft-name {
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
  }

  .collection-name-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 4px;
  }

  .collection-name {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: ${({ theme }) => theme.color_grey};
    margin-right: 4px;
    cursor: pointer;
  }

  .floor-price-container {
    border: 1px solid ${({ theme }) => theme.bg4};
    border-radius: 12px;
    padding: 16px;
    margin-top: 24px;
  }

  .floor-price-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .floor-price-title {
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: ${({ theme }) => theme.color_grey};
  }

  .floor-price-unit {
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    text-align: right;
  }

  .margin-top-8 {
    margin-top: 8px;
  }

  .select-tokens-list {
    height: 56px;
    background: #252525;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    padding-left: 28px;
    padding-right: 28px;
    margin-left: 16px;
    margin-top: 2px;

    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.border1};

    :hover {
      border: 1px solid ${({ theme }) => theme.border5};
    }

    :focus {
      border: 1px solid ${({ theme }) => theme.border5};
      color: ${({ theme }) => theme.primary5};
    }
  }

  .selected-token-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  .balance-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
  }

  .current-balance {
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: ${({ theme }) => theme.color_grey};
  }

  .duration-container {
    margin-top: 20px;

    .duration-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 140%;
    }

    .duration-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 8px;

      .duration-calendar {
        display: flex;
        flex-direction: row;
        flex: 1;
        height: 56px;
        margin-left: 8px;
        background: ${({ theme }) => theme.primary14};
        border-radius: 8px;
        cursor: pointer;
        border: 1px solid ${({ theme }) => theme.border1};

        :hover {
          border: 1px solid ${({ theme }) => theme.border5};
        }

        :focus {
          border: 1px solid ${({ theme }) => theme.border5};
          color: ${({ theme }) => theme.primary5};
        }

        .react-datetime-picker__calendar {
          margin-bottom: 6px;
          .react-calendar {
            cursor: pointer;
            background-color: #252525;
            border-radius: 8px;
            border: none;
            padding: 8px 16px;

            box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);

            .react-calendar__navigation {
              .react-calendar__navigation__arrow {
                color: white;
                :hover {
                  background-color: transparent;
                }
              }
              .react-calendar__navigation button {
                color: white;
              }

              .react-calendar__navigation__prev2-button {
                width: 0px !important;
                min-width: 0px;
                display: none;
              }

              .react-calendar__navigation__prev-button {
                background-color: transparent !important;
                font-size: 20px;
                font-weight: 500;
                :disabled {
                  opacity: 0;
                }
              }

              .react-calendar__navigation__next-button {
                background-color: transparent !important;
                font-size: 20px;
                font-weight: 500;
              }

              .react-calendar__navigation__next2-button {
                width: 0px !important;
                min-width: 0px;
                display: none;
              }

              .react-calendar__navigation__label {
                pointer-events: none;
                :hover {
                  background-color: transparent;
                }
              }

              .react-calendar__navigation__label__labelText {
                color: white;
                font-weight: 700;
                font-size: 16px;
              }
            }

            .react-calendar__viewContainer {
              .react-calendar__month-view {
                .react-calendar__month-view__weekdays {
                  margin-top: 8px;
                  margin-bottom: 16px;

                  .react-calendar__month-view__weekdays__weekday abbr {
                    text-decoration: none !important;
                    font-weight: 600;
                    font-size: 14px;
                    color: ${({ theme }) => theme.primary11};
                    cursor: pointer;
                    text-transform: capitalize;
                  }
                }
              }
            }

            .react-calendar__tile {
              /* color: ${({ theme }) => theme.primary10}; */
              color: white;
              font-weight: 400;
              font-size: 14px;
              height: 44px;
              margin-bottom: 8px;

              :hover {
                border-radius: 8px;
                /* background-color: ${({ theme }) => theme.white};
                box-shadow: 0 3px 10px rgb(0 0 0 / 0.2); */
                box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
                background-color: ${({ theme }) => theme.bg4};
              }
            }

            .react-calendar__tile:disabled {
              color: ${({ theme }) => theme.color_grey4} !important;
              background-color: transparent;
              font-weight: 400;
              font-size: 13px;
              font-family: 'Inter';
              font-style: normal;
              cursor: not-allowed;

              :hover {
                background-color: transparent;
                box-shadow: none;
              }
            }

            .react-calendar__tile--now {
              background-color: transparent;
            }

            .react-calendar__tile--active {
              background-color: ${({ theme }) => theme.primary10};
              border-radius: 8px;
              font-weight: 700;
              color: ${({ theme }) => theme.black};

              :hover {
                background-color: ${({ theme }) => theme.primary10};
                box-shadow: none;
              }
            }
          }
        }

        .react-datetime-picker__wrapper {
          box-sizing: none;
          border: none;
          width: 100%;
          padding-left: 16px;
          padding-right: 16px;
          .react-datetime-picker__inputGroup {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;

            .react-datetime-picker__inputGroup__input {
              color: white;
              font-weight: 400;
              font-size: 16px;

              ::selection {
                background-color: ${({ theme }) => theme.bg4};
              }
            }

            .react-datetime-picker__inputGroup__leadingZero {
              color: white;
              font-weight: 400;
              font-size: 16px;
            }

            .react-datetime-picker__inputGroup__divider {
              color: white;
              font-weight: 400;
              font-size: 16px;
            }

            .react-datetime-picker__inputGroup__day {
              width: 19px !important;
            }

            .react-datetime-picker__inputGroup__hour {
              width: 20px !important;
              margin-left: 16px;
              text-align: right;
            }

            .react-datetime-picker__inputGroup__minute {
              width: 20px !important;
              margin-right: -4px;
            }
          }
        }
      }
    }
  }

  .btn-offer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 54px;
    margin-top: 24px;
    margin-bottom: 8px;

    background-color: ${({ theme }) => theme.color_blue};
    border-radius: 8px;
    cursor: pointer;

    :hover {
      background-color: ${({ theme }) => theme.primary1};
    }

    :focus {
      background-color: ${({ theme }) => theme.primary1};
    }

    :disabled {
      background-color: ${({ theme }) => theme.color_grey};
    }
  }

  .container-price {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: 4px;
  }

  .spinner {
    margin-right: 16px;
    align-self: flex-end;
    margin-bottom: 2px;
  }

  .current-fee {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    text-align: right;
    color: ${({ theme }) => theme.color_grey};
  }

  .total-offer {
    margin-top: 2px;
    text-align: right;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: ${({ theme }) => theme.color_grey};
  }

  .text-offer {
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
  }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  transform: translateZ(0);
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-left: 2px solid ${({ theme }) => theme.text1};
  background: transparent;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  position: relative;
  transition: 250ms ease border-color;
  left: 3px;
  top: 3px;
  bottom: 3px;
`;

export const CloseIcon = styled(X)<{ onClick: () => void }>`
  cursor: pointer;
  color: white;
  margin-top: -20px;
  margin-right: -16px;
`;

export const ViewHistory = styled.div`
  cursor: pointer;
`;
