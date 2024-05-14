import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'VNF Instance',
    path: '/vnf',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'VNFD',
    path: '/vnfd',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
  },
  {
    title: 'LCM OPOCC',
    path: '/lcmopocc',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
  },
  {
    title: 'PERFORMANCE',
    path: 'http://127.0.0.1:57357',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
  },
  {
    title: 'ALARM',
    path: '/alarm',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text',
  },
];
