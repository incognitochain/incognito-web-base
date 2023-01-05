/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dropdown, Menu } from 'antd';
import PToken from 'models/model/pTokenModel';
import React, { memo } from 'react';
import { ChevronDown } from 'react-feather';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import Column from '../../../../components/Core/Column';
import { Image } from '../../../../components/Core/Image';

const Styled = styled.div`
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
`;

const SortDropdown = styled(Dropdown)`
  cursor: pointer;
`;

const SortMenu = styled(Menu)<{ backgroundColor?: string }>`
  cursor: pointer;
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 8px;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  background-color: ${({ backgroundColor }) => backgroundColor};

  .menu-item-container {
    display: flex;
    padding: 8px 16px;

    :hover {
      border-radius: 8px;
      background-color: ${({ theme }) => theme.bg4};
      box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

      .network {
        background-color: ${({ theme }) => theme.bg1};
      }
    }

    .network {
      color: ${({ theme }) => theme.bg4};
      padding-left: 4px;
      padding-right: 4px;
      margin-left: 6px;
      background-color: ${({ theme }) => theme.bg4};
      border-radius: 4px;
    }
    .extra-info {
      margin-top: 2px;
      display: flex;
      align-items: center;
    }
  }

  .ant-dropdown-menu-item.ant-dropdown-menu-item-only-child {
    padding: 0px;
    :hover {
      background-color: transparent;
    }
  }
`;

const ArrowDown = styled(ChevronDown)<{ open?: boolean }>`
  color: ${({ theme }) => theme.white};
  width: 16px;
  height: 20px;
  margin-left: 4px;
`;

interface POpenseaSelectTokenDropDownProps {
  backgroundColor?: string;
  selectedToken?: PToken;
  tokens: PToken[];
  onSelectToken: (token: PToken) => void;
}

const POpenseaSelectTokenDropDown = (props: POpenseaSelectTokenDropDownProps) => {
  const { selectedToken, tokens } = props;

  const renderItem = (token: PToken) => {
    return (
      <div className="menu-item-container" key={token.identify} onClick={() => props.onSelectToken(token)}>
        <Image iconUrl={token.iconUrl} size={32} />
        <Column>
          <ThemedText.RegularLabel color="primary5" style={{ marginLeft: 12 }}>
            {token.symbol}
          </ThemedText.RegularLabel>
          <div className="extra-info">
            <ThemedText.SmallLabel color="primary8" style={{ marginLeft: 12 }}>
              {token.shortName}
            </ThemedText.SmallLabel>
            <div className="network">
              <ThemedText.SmallLabel color="primary8" style={{ padding: 2 }}>
                {token.network}
              </ThemedText.SmallLabel>
            </div>
          </div>
        </Column>
      </div>
    );
  };

  return (
    <Styled>
      <SortDropdown
        // placement="bottomRight"
        overlay={
          <SortMenu
            backgroundColor={props.backgroundColor}
            items={tokens.map((item) => ({
              key: item.identify,
              label: renderItem(item),
            }))}
          />
        }
      >
        <div className="select-tokens-list">
          {selectedToken && <img className="selected-token-icon" src={selectedToken.iconUrl} />}
          {selectedToken && <p>{selectedToken.symbol}</p>}
          <ArrowDown />
        </div>
      </SortDropdown>
    </Styled>
  );
};

export default memo(POpenseaSelectTokenDropDown);
