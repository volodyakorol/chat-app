import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown, faHelicopter, faPersonDotsFromLine, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from 'antd';

import { Conversation, Input, UserMessage } from '@/components';

import s from './styles.module.scss';

const chats = [
  {
    id: 1,
    title: 'RIcardo Lopez',
    avatar: 'sdsfsdf',
    time: '11:23pm',
    description: 'There some was, I dont know who are you',
  },
  {
    id: 2,
    title: 'RIcardo Lopez',
    avatar: 'sdsfsdf',
    time: '11:23pm',
    description: 'There some was, I dont know who are you',
  },
  {
    id: 3,
    title: 'RIcardo Lopez',
    avatar: 'sdsfsdf',
    time: '11:23pm',
    description: 'There some was, I dont know who are you',
  },
];

export default function Chat() {
  return (
    <div className={s.content}>
      <div className={s.chats}>
        <div className={s.search}>
          <Input
            size='large'
            placeholder='Search messages'
            prefix={<FontAwesomeIcon color='#C5C7D2' icon={faSearch} />}
          />
        </div>
        <div>
          {chats.map(({ id, title, time, description, avatar }, i) => (
            <Conversation key={id} time={time} title={title} isActive={i === 2} description={description} avatar={avatar} />
          ))}
        </div>
      </div>
      <div className={s.chat}>
        <div className={s.chatHeader}>
          <Avatar size={35} />
          <p>Tobias Williams</p>
          <div className={s.chatActions}>
            <FontAwesomeIcon fixedWidth={true} icon={faHelicopter} />
            <FontAwesomeIcon fixedWidth={true} icon={faHelicopter} />
          </div>
        </div>
        <div className={s.chatBody}>
          <div className={s.messages}>
            <UserMessage message='OK hello its my message' time='08: 45 am' />
            <UserMessage message='OK hello its my message' time='08: 45 am' isMyMessage />
          </div>
          <div className={s.inputContainer}>
            <Input
              size='large'
              placeholder='Type something'
              prefix={<FontAwesomeIcon color='#C5C7D2' icon={faSearch} />}
            />
          </div>
        </div>
      </div>
      <div className={s.aside}>
        <div className={s.asideHeader}>
          <Avatar size={140} />
          <h3>Tobias Williams</h3>
          <div>
            <a className={s.socialIcon}>
              <FontAwesomeIcon fixedWidth={true} icon={faHelicopter} />
            </a>
            <a className={s.socialIcon}>
              <FontAwesomeIcon fixedWidth={true} icon={faArrowCircleDown} />
            </a>
            <a className={s.socialIcon}>
              <FontAwesomeIcon fixedWidth={true} icon={faPersonDotsFromLine} />
            </a>
          </div>
        </div>
        <div className={s.divider} />
        <div className={s.userInfo}>
          <div>
            <FontAwesomeIcon icon={faHelicopter} />
            <p className={s.info}>dsfsdfsfsdfsdf</p>
          </div>
        </div>
        <div className={s.divider} />
      </div>
    </div>
  );
}
