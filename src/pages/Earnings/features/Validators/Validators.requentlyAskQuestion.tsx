import { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';

import AskQuestionItem from './components/AskQuestionItem';
import AskQuestionItem1 from './components/AskQuestionItem.Item1';
import AskQuestionItem2 from './components/AskQuestionItem.Item2';
import AskQuestionItem3 from './components/AskQuestionItem.Item3';
import AskQuestionItem4 from './components/AskQuestionItem.Item4';
import AskQuestionItem5 from './components/AskQuestionItem.Item5';
import AskQuestionItem6 from './components/AskQuestionItem.Item6';
import AskQuestionItem7 from './components/AskQuestionItem.Item7';

const TITLE_LIST = [
  'What does it mean for Nodes to power privacy?',
  'How do Nodes make money?',
  'In which currency do Nodes earn?',
  'Is overstaking permitted?',
  'What does the lifecycle of a Node look like?',
  'Is there slashing on the network?',
  `What's the maximum number of validators needed?`,
];
const Styled = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: row;
  .leftView {
    display: flex;
    flex: 1;
    margin-right: 20px;
    flex-direction: column;
    .title-container {
      text-align: left;
      .title-custom {
        width: 100%;
      }
    }
  }

  .rightView {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
    margin-top: 100px;
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    margin-top: 80px;
    flex-direction: column;
      .leftView .title-container {
        text-align: center;
        .title-custom {
          width: 100%;
        }
      }
      .rightView {
        margin-top: 40px;
      }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    margin-top: 50px;
  `}
`;

const ValidatorAskedQuestion = () => {
  const history = useHistory();
  const [activeList, setActiveList] = useState<any>({});

  const itemOnClick = (key: string) => {
    const newActiveList = { ...activeList };
    if (!newActiveList[key]) {
      newActiveList[key] = true;
    } else {
      delete newActiveList[key];
    }
    setActiveList(newActiveList);
  };

  return (
    <Styled>
      <div className="leftView">
        <div className="title-container center">
          <h1 className="title-custom">Frequently Asked Questions</h1>
        </div>

        <button
          onClick={() => {
            const newActiveList = { ...activeList };
            TITLE_LIST.map((item) => {
              newActiveList[item] = true;
            });
            setActiveList(newActiveList);
          }}
        ></button>
      </div>
      <div className="rightView">
        <AskQuestionItem
          itemOnClick={itemOnClick}
          title={TITLE_LIST[0]}
          isActive={!!activeList[TITLE_LIST[0]]}
          subItem={<AskQuestionItem1 />}
        />
        <AskQuestionItem
          itemOnClick={itemOnClick}
          title={TITLE_LIST[1]}
          isActive={!!activeList[TITLE_LIST[1]]}
          subItem={<AskQuestionItem2 />}
        />
        <AskQuestionItem
          itemOnClick={itemOnClick}
          title={TITLE_LIST[2]}
          isActive={!!activeList[TITLE_LIST[2]]}
          subItem={<AskQuestionItem3 />}
        />

        <AskQuestionItem
          itemOnClick={itemOnClick}
          title={TITLE_LIST[3]}
          isActive={!!activeList[TITLE_LIST[3]]}
          subItem={<AskQuestionItem4 />}
        />

        <AskQuestionItem
          itemOnClick={itemOnClick}
          title={TITLE_LIST[4]}
          isActive={!!activeList[TITLE_LIST[4]]}
          subItem={<AskQuestionItem5 />}
        />
        <AskQuestionItem
          itemOnClick={itemOnClick}
          title={TITLE_LIST[5]}
          isActive={!!activeList[TITLE_LIST[5]]}
          subItem={<AskQuestionItem6 />}
        />
        <AskQuestionItem
          itemOnClick={itemOnClick}
          title={TITLE_LIST[6]}
          isActive={!!activeList[TITLE_LIST[6]]}
          subItem={<AskQuestionItem7 />}
        />
      </div>
    </Styled>
  );
};

export default memo(ValidatorAskedQuestion);
