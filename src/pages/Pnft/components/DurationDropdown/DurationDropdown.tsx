/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dropdown, Menu } from 'antd';
import React, { memo } from 'react';
import { ChevronDown } from 'react-feather';
import styled from 'styled-components/macro';

export interface Duration {
  title: string;
  value?: number;
}

export const Durations: Duration[] = [
  { title: '12 hours', value: 12 },
  { title: '1 day', value: 24 },
  { title: '3 days', value: 24 * 3 },
  { title: '7 days', value: 24 * 7 },
  { title: '14 days', value: 24 * 14 },
  { title: '1 month', value: 24 * 30 },
];

const Styled = styled.div`
  background: #252525;
  border-radius: 8px;
  min-width: 150px;

  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.border1};

  :hover {
    border: 1px solid ${({ theme }) => theme.border5};
  }

  :focus {
    border: 1px solid ${({ theme }) => theme.border5};
    color: ${({ theme }) => theme.primary5};
  }
  .select-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;

    padding-left: 28px;
    padding-right: 28px;

    .title {
      font-weight: 400;
      font-size: 16px;
    }
  }
`;

const SortDropdown = styled(Dropdown)`
  cursor: pointer;
`;

const SortMenu = styled(Menu)`
  cursor: pointer;
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 8px;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  background: #252525;

  .menu-item-container {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    height: 48px;
    :hover {
      border-radius: 8px;
      box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
      background-color: ${({ theme }) => theme.bg4};
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

interface DurationDropDownProps {
  selectedDuration?: number;
  onSelectDuration: (duration?: number) => void;
}

const DurationDropDown = (props: DurationDropDownProps) => {
  const { selectedDuration, onSelectDuration } = props;

  const duration = Durations.find((duration) => duration.value === selectedDuration);

  const renderItem = (duration: Duration) => {
    return (
      <div className="menu-item-container" onClick={() => onSelectDuration(duration.value)}>
        <p>{duration.title}</p>
      </div>
    );
  };

  return (
    <Styled>
      <SortDropdown
        // placement="bottomRight"
        overlay={
          <SortMenu
            items={Durations.map((item, index) => ({
              key: index.toString(),
              label: renderItem(item),
            }))}
          />
        }
      >
        <div className="select-list">
          <p className="title">{duration?.title}</p>
          <ArrowDown />
        </div>
      </SortDropdown>
    </Styled>
  );
};

export default memo(DurationDropDown);
