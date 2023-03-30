import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { switchKeychainType } from 'state/masterKey';
import { groupMasterless, keychainTypeSelector } from 'state/masterKey/masterKey.selectors';
import styled from 'styled-components/macro';

import ListMasterKey from './ListMasterKey';
import ListMasterLess from './ListMasterLess';

const ListContainer = styled.div`
  margin-top: 16px;
`;

const Styled = styled.div`
  .select {
    width: 100%;
  }
  .ant-select-borderless .ant-select-selector {
    background-color: ${({ theme }) => theme.bg4} !important;
    border-color: ${({ theme }) => theme.bg4} !important;
    box-shadow: none !important;
    border-radius: 8px;
    height: 40px;
    align-items: center;
    color: ${({ theme }) => theme.white};
    :hover {
      opacity: 0.7;
    }
  }
  .ant-select-arrow {
    color: ${({ theme }) => theme.white};
  }
`;

const KeyChain = () => {
  const dispatch = useDispatch();
  const keychainType = useSelector(keychainTypeSelector);

  const listMasterLess = useSelector(groupMasterless);

  const handleChangeKeychainType = async (value: any) => {
    if (value === keychainType) {
      return;
    }
    await dispatch(switchKeychainType(value));
  };

  let options = [
    {
      label: 'Masterkey',
      value: 'Masterkey',
    },
  ];

  if (listMasterLess?.length) {
    options.push({
      label: 'Masterless',
      value: 'Masterless',
    });
  }

  return (
    <Styled className="default-max-width" style={{ width: '100%', paddingBottom: 40 }}>
      <Select
        defaultValue={keychainType}
        options={options}
        onChange={(value) => handleChangeKeychainType(value)}
        className="select"
        bordered={false}
        dropdownStyle={{
          borderRadius: 8,
        }}
      />
      <ListContainer>
        {keychainType === 'Masterkey' && <ListMasterKey />}
        {keychainType === 'Masterless' && <ListMasterLess />}
      </ListContainer>
    </Styled>
  );
};
export default KeyChain;
