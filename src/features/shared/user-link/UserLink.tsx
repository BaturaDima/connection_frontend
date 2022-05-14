import { User } from '../../users/models/user.interface';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type UserLinkProps = {
  user: User;
};

const UserLink = ({ user }: UserLinkProps) => {
  const navigate = useNavigate();

  const onLinkClicked = () => {
    navigate(`/user/${user.id}`);
  };

  return <a onClick={onLinkClicked}>{`${user.firstName} ${user.lastName}`}</a>;
};

export default UserLink;
