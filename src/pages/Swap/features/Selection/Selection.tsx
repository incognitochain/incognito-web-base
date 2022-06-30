import Row from 'components/Core/Row';
import React from 'react';
import { ThemedText } from 'theme';

interface ISelection {
  title: string;
}

const Selection = React.memo((props: ISelection) => {
  const { title } = props;
  return (
    <>
      <Row>
        <ThemedText.SmallLabel fontWeight={400} color="primary8">
          {title}
        </ThemedText.SmallLabel>
      </Row>
    </>
  );
});

Selection.displayName = 'Selection';

export default Selection;
