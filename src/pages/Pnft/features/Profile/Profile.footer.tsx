import { Row } from 'antd';
import React, { memo } from 'react';

import { ButtonCancel, ButtonList, Container } from './Profile.footer.styled';

const ProfileStickyFooter = () => {
  return (
    <Container hidden={false}>
      <Row className="default-max-width">
        <div className="content">
          <div>
            {/* <p className="text-listed">Listed</p>
            <p className="text-items">0 items</p> */}
          </div>
          <Row>
            <ButtonList type="submit">
              <p className="text">List 0 items</p>
            </ButtonList>

            <ButtonCancel type="submit">
              <p className="text">Cancel 0 items</p>
            </ButtonCancel>
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default memo(ProfileStickyFooter);
