import SearchSVG from 'assets/svg/search-icon.svg';
import React, { useCallback } from 'react';
import { XCircle } from 'react-feather';

import { Container, TextInputStyled } from './styles';

type Props = {
  value?: string;
  placeHolderText?: string;
  onChangeCallback?: (keySearch?: string) => void;
  onClearCallback?: () => void;
};

const SearchBar = (props: Props) => {
  const {
    value = '',
    placeHolderText = 'Place holder text',
    onChangeCallback = () => {},
    onClearCallback = () => {},
  } = props;

  const onChange = useCallback((e: any) => {
    const keySearch: string | undefined = e.target.value;
    onChangeCallback && onChangeCallback(keySearch);
  }, []);

  const onClear = useCallback(() => {
    onClearCallback && onClearCallback();
  }, []);

  return (
    <Container>
      <img className="search-ic" src={SearchSVG} alt="searchInscriptions" key="searchInscriptions" />
      <TextInputStyled
        placeholder={placeHolderText}
        type={'text'}
        onChange={onChange}
        value={value}
        autoFocus={false}
        checked={false}
      />
      {value && value.length > 0 && <XCircle color="white" className="clearSearch" onClick={onClear}></XCircle>}
    </Container>
  );
};

export default React.memo(SearchBar);
