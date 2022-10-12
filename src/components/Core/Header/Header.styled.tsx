import { Drawer, Menu, Row } from 'antd';
import linkBlueImg from 'assets/images/link-blue-icon.png';
import linkImg from 'assets/images/link-white-icon.png';
import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled(Row)`
  height: 76px;
  width: 100%;
  background-color: ${({ theme }) => theme.bg2};
  border-bottom: 1px solid ${({ theme }) => theme.border1};
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
  justify-content: space-between;
  .app-logo {
    width: 162px;
    height: 32px;
  }

  .wrap-menu-desktop {
    margin: auto;
    flex: 1;
    flex-direction: row;
    display: flex;
    .menuItem {
      margin-right: 40px;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
    }
  }

  .ant-menu-dark.ant-menu-horizontal {
    flex: 1;
    background: transparent;
    padding: 0 4px;
    height: 40px;
  }

  .ant-menu.ant-menu-dark .ant-menu-item-selected > a {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text1};
  }

  .ant-menu-dark.ant-menu-horizontal > .ant-menu-item {
    background: transparent;
    padding: 0 16px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0;
    text-align: center;
    font-size: 18px;

    :hover {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.text1};
    }
  }

  .sub-menu-text {
    font-size: 18px;
    font-weight: 500;
    text-align: right;
    cursor: pointer;
  }

  .ant-menu-submenu-title {
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
  }
  .ant-menu-submenu-selected .ant-menu-title-content {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text2};
  }

  .ant-menu-dark .ant-menu-item-selected > span > a {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text3};
  }

  .ant-menu-submenu-title {
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
  }

  .ant-menu-dark > .ant-menu-item {
    background: ${({ theme }: { theme: DefaultTheme }) => theme.red1};
    padding: 0 16px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0px;
    text-align: center;

    :hover {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.red1};
    }
  }
  .menu-mobile {
    display: none;
  }
  .btn-round {
    background: none;
  }
  .mobile-link {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text1};
    margin-top: 32px;
    font-size: 16px;
  }

  .ant-menu-dark > .ant-menu-item {
    background: transparent;
    padding: 0 16px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0;
    text-align: center;
    font-size: 18px;
    :hover {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.text1};
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
    .wrap-menu-desktop {
      display: flex;
    }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
    justify-content: space-between;
    .more-dropdown {
      display: flex;
    }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    justify-content: space-between;
      .wrap-menu-desktop {
        display: none;
        flex: 1;
      }
      .menu-mobile {
         display: initial;
      }
      .more-dropdown {
        display: none;
      }
    `}
`;

export const MenuDropdown = styled(Menu)`
  border-radius: 16px;
  background: #1a1a1a !important;
  .logo {
    margin-right: 16px;
    width: 14px;
    height: 14px;
    justify-content: center;
  }
  .logo {
    width: 14px;
    height: 14px;
    margin-left: 6px;
    background: url(${linkImg}) no-repeat;
    display: inline-block;
  }
  .dropdown-menu-item:hover {
    p:first-child {
      color: #1a73e8;
    }
    .logo {
      background: url(${linkBlueImg}) no-repeat;
    }
  }
`;

export const DrawerStyled = styled(Drawer)`
  overflow-y: auto;
  .wrap-drawer-sub-item {
    padding-top: 8px;
    padding-bottom: 8px;
    border-top: 1px solid ${({ theme }) => theme.border1};
  }
  .logo {
    margin-right: 16px;
    width: 14px;
    height: 14px;
    justify-content: center;
  }
  .dropdown-icon {
    width: 24px;
    height: 24px;
  }
  .logo {
    width: 14px;
    height: 14px;
    margin-left: 6px;
    background: url(${linkImg}) no-repeat;
    display: inline-block;
  }
  .drawer-sub-item-label {
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: 0.005em;
  }
  .drawer-sub-item-desc-label {
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.01em;
    color: #9c9c9c;
  }
  .wrap-drawer-sub-item:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.border1};
  }
  .ant-drawer-body {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .padding-horizontal {
    padding-left: 16px;
    padding-right: 16px;
    width: 100%;
  }
  .ant-drawer-close {
    visibility: hidden;
  }
`;
