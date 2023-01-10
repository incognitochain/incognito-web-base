import SearchSVG from 'assets/svg/search-icon.svg';
import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  top: -86px;
  height: 50px;
  border-radius: 8px;
  border-width: 1px;
  padding-left: 16px;
  padding-right: 50px;
  background-color: ${({ theme }) => theme.bg3};
  caret-color: ${({ theme }) => theme.primary5};

  :hover {
    border: 1px solid ${({ theme }) => theme.border5};
  }

  :focus {
    border: 1px solid ${({ theme }) => theme.border5};
    color: ${({ theme }) => theme.primary5};
  }

  ::placeholder {
    flex: none;
    order: 0;
    flex-grow: 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: ${({ theme }) => theme.primary7};
  }

  .search-ic {
    width: 16px;
    height: 16px;
    margin-right: 16px;
    margin-top: 17px;
  }
`;

export const TextInput = styled.input`
  display: flex;
  flex: 1;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: white;
`;

const SearchInput = ({
  value,
  onChange,
}: {
  value: string | ReadonlyArray<string> | number | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <Container>
      <img className="search-ic" src={SearchSVG} alt="search" />
      <TextInput placeholder={'Search collections'} type={'text'} onChange={onChange} value={value} autoFocus={false} />
    </Container>
  );
};

export default SearchInput;
