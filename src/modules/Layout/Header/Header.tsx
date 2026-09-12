import './header.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout as AntdLayout, MenuProps, Typography, Tag } from 'antd';
import { ROUTES } from '@/constants';
import { useStores } from '@/stores';
import { LogOut } from '../LogOut/LogOut';
import { CloseDay } from '../CloseDay';
import { useQuery } from '@tanstack/react-query';
import { priceFormat } from '@/utils/priceFormat';

type Props = {
  collapsed: boolean;
  onCollapsedClick: () => void;
  isMobile?: boolean;
};

export const Header = observer(({ collapsed, onCollapsedClick, isMobile }: Props) => {
  const { authStore } = useStores();

  const { data: currencyMany, isLoading: loadingClients } = useQuery({
    queryKey: ['getCurrencyMany'],
    queryFn: () =>
      authStore.getCurrencyMany(),
  });

  const items: MenuProps['items'] = [
    ...(isMobile
      ? [{
        key: '2',
        label: (
          <>
            <Typography.Title level={5} style={{ margin: '0' }}>
              {authStore.staffInfo?.fullname}
            </Typography.Title>
            <Typography.Title level={5} style={{ margin: '0' }}>
              +{authStore.staffInfo?.phone}
            </Typography.Title>
          </>
        ),
      }] : []),
    {
      key: '1',
      label: <LogOut />,
    },
    {
      key: '2',
      label: <CloseDay />,
    },
  ];

  const currencyUsd = currencyMany?.data?.find(currency => currency?.symbol === 'USD');

  return (
    <AntdLayout.Header className={`header header__isclose-${authStore?.isCloseDay}`}>
      <div className="header__left">
        <Button type="text" onClick={onCollapsedClick}>
          {collapsed
            ? <MenuUnfoldOutlined className="header__icon" />
            : <MenuFoldOutlined className="header__icon" />}
        </Button>
        {!isMobile && authStore.isCloseDay && <span className="layout__logo-text">RAMZ GROUP || Kassa yopilgan</span>}
        {isMobile &&
          <span className="layout__logo-text">
            {authStore.isCloseDay ? 'Kun yopilgan' : 'RAMZ GROUP'}
          </span>
        }

        <div className="header__profile">
          <Tag color="#0000FF">{priceFormat(currencyUsd?.exchangeRate)}</Tag>
          {!isMobile && (
            <>
              <Typography.Title level={5} style={{ color: 'white', margin: '0' }}>
                {authStore.staffInfo?.fullname}
              </Typography.Title>
              <Typography.Title level={5} style={{ color: 'white', margin: '0' }}>
                +{authStore.staffInfo?.phone}
              </Typography.Title>
            </>
          )}
          <Dropdown menu={{ items }} placement="bottomRight">
            <Avatar style={{ backgroundColor: '#1677FF' }} icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </AntdLayout.Header>
  );
});
