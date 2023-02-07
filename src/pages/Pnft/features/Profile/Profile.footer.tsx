import { Row } from 'antd';
import DurationDropdown from 'pages/Pnft/components/DurationDropdown';
import React, { memo } from 'react';

import { ButtonCancel, ButtonList, Container } from './Profile.footer.styled';

interface ProfileStickyFooterProps {
  isHidden: boolean;
  selectedDuration?: number;
  onSelectDuration: (duration?: number) => void;
}

const ProfileStickyFooter = (props: ProfileStickyFooterProps) => {
  return (
    <Container hidden={props.isHidden}>
      <Row className="default-max-width">
        <div className="content">
          <div>
            {/* <p className="text-listed">Listed</p>
            <p className="text-items">0 items</p> */}
          </div>
          <Row>
            <div className="duration">
              <p className="duration-label">Duration</p>
              <DurationDropdown selectedDuration={props.selectedDuration} onSelectDuration={props.onSelectDuration} />
            </div>

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
