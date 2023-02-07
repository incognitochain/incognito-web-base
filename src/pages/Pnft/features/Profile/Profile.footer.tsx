import { Row } from 'antd';
import { selectedCancelListNfsAccountSelector, selectedListNfsAccountSelector } from 'pages/Pnft';
import DurationDropdown from 'pages/Pnft/components/DurationDropdown';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { ButtonCancel, ButtonList, Container } from './Profile.footer.styled';

interface ProfileStickyFooterProps {
  isHidden: boolean;
  selectedDuration?: number;
  onSelectDuration: (duration?: number) => void;
}

const ProfileStickyFooter = (props: ProfileStickyFooterProps) => {
  const selectedListNfs = useSelector(selectedListNfsAccountSelector);
  const selectedCancelListNfs = useSelector(selectedCancelListNfsAccountSelector);

  return (
    <Container hidden={props.isHidden}>
      <Row className="default-max-width">
        <div className="content">
          <div>
            {/* <p className="text-listed">Listed</p>
            <p className="text-items">0 items</p> */}
          </div>
          <div className="buttons-container">
            <div className="duration">
              <p className="duration-label">Duration</p>
              <DurationDropdown selectedDuration={props.selectedDuration} onSelectDuration={props.onSelectDuration} />
            </div>

            <ButtonList type="submit" disabled={selectedListNfs.length <= 0}>
              <p className="text">{`List ${selectedListNfs.length} items`}</p>
            </ButtonList>

            <ButtonCancel type="submit" disabled={selectedCancelListNfs.length <= 0}>
              <p className="text">{`Cancel ${selectedCancelListNfs.length} items`}</p>
            </ButtonCancel>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default memo(ProfileStickyFooter);
