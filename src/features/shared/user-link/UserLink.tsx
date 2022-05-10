import { User } from '../../../pages/users/managemnt/models/user.interface';
import React, { VFC } from 'react';
import { useNavigate } from 'react-router-dom';

type UserLinkProps = {
  user: User;
};

const UserLink: VFC<UserLinkProps> = ({ user }) => {
  const navigate = useNavigate();

  const onLinkClicked = () => {
    navigate(`/user/${user.id}`);
  };

  return <a onClick={onLinkClicked}>{`${user.firstName} ${user.lastName}`}</a>;
};

export default UserLink;