import SearchSVG from 'assets/svg/search-icon.svg';
import React, { InputHTMLAttributes, useCallback } from 'react';
import { XCircle } from 'react-feather';

import { Column, Container, ErrorMessage, TextInputStyled } from './styles';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChangeCallback?: (keySearch: string) => void;
  onClearCallback?: () => void;
  errorMessage?: string;
  searchIcon?: boolean;
}

const SearchBar = (props: SearchBarProps) => {
  const {
    value = '',
    searchIcon = true,
    errorMessage = undefined,
    onChangeCallback = () => {},
    onClearCallback = () => {},
    ...rest
  } = props;

  const onChange = useCallback((e: any) => {
    onChangeCallback && onChangeCallback(e.target.value || '');
  }, []);

  const onClear = useCallback(() => {
    onClearCallback && onClearCallback();
  }, []);

  return (
    <Column>
      <Container>
        {searchIcon && <img className="search-ic" src={SearchSVG} alt="search-ic-alt" key="search-ic-alt" />}
        <TextInputStyled
          {...rest}
          type={rest.type || 'text'}
          onChange={onChange}
          value={value}
          autoFocus={false}
          checked={false}
        />
        {value && value.length > 0 && <XCircle color="white" className="clearSearch" onClick={onClear}></XCircle>}
      </Container>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Column>
  );
};

export default React.memo(SearchBar);
