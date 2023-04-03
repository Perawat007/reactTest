import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarDataAdmin = [
  {
    title: 'Dashboard',
    path: '/profile/dataAdmin',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'AdminTool',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Admin',
        path: '/profile/dataAdmin',
        icon: <IoIcons.IoMdPeople />,
        cName: 'sub-nav'
      },
      {
        title: 'Agent',
        path: '/profile/dataAgent',
        icon: <IoIcons.IoMdPeople />,
        cName: 'sub-nav'
      },
      {
        title: 'Users',
        path: '/profile/dataUsers',
        icon: <IoIcons.IoMdPeople />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Game',
    path: '/products',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Message 1',
        path: '/messages/message1',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Message 2',
        path: '/messages/message2',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];