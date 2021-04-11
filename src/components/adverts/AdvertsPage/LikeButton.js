import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';

import { ReactComponent as IconUnliked } from '../../../assets/like.svg';
import { ReactComponent as IconLiked } from '../../../assets/like_filled.svg';
import './LikeButton.css';

const LikeButton = ({ children, isLike, onLike }) => {
  const Icon = isLike ? IconLiked : IconUnliked;

  return (
    <div
      className={classNames('likeButton', {
        'likeButton--active': isLike,
      })}
      onClick={onLike}
    >
      <span className="likeButton-icon">
        <Icon width="20" height="20" />
      </span>
      <span className="likeButton-label">{children}</span>
    </div>
  );
};

LikeButton.propTypes = {
  children: T.node,
  isLike: T.bool,
  onLike: T.func.isRequired,
};

LikeButton.defaultProps = {
  children: null,
  isLike: false,
};

export default LikeButton;
