import { SELECTION_NETWORKS } from 'pages/Swap/features/FormUnshield/FormUnshield.constants';
import React from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 40px;
`;

const Item = styled.div<{ isSelected: boolean }>`
  margin-top: 10px;
  padding: 9px 16px;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.bg4};
  border-radius: 100px;
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
  background: ${({ theme, isSelected }) => (isSelected ? theme.bg4 : 'transparent')};
  p {
    color: ${({ theme, isSelected }) => (isSelected ? theme.text1 : theme.text2)};
    font-weight: 500;
  }
  :hover {
    opacity: 0.8;
  }
`;

interface IProps {
  selected: string;
  onSelect: (label: string) => void;
}

const AppSelections = React.memo(({ selected, onSelect }: IProps) => {
  return (
    <Wrapper>
      {SELECTION_NETWORKS.map((item: any) => (
        <Item
          className="selection-item"
          key={item.label}
          isSelected={item.label === selected}
          onClick={() => onSelect(item.label)}
        >
          <p className="h8">{item.label}</p>
        </Item>
      ))}
    </Wrapper>
  );
});

export default AppSelections;
