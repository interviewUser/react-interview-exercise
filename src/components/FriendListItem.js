import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './FriendListItem.css';

export default class FriendListItem extends Component {
  static propTypes = {
    friend: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      starred: PropTypes.boolean
    }).isRequired,
    starFriend: PropTypes.func.isRequired,
    selectSex: PropTypes.func.isRequired,
    onTrashClick: PropTypes.func.isRequired
  }

  render () {
    const {friend} = this.props;
    return (
      <li className={styles.friendListItem}>
        <div className={styles.friendInfos}>
          <div><span>{friend.name}</span></div>
          <div><small>xx friends in common</small></div>
        </div>
        <div className={styles.friendActions}>
          <button className={`btn btn-default ${styles.btnAction}`} onClick={() => this.props.starFriend(friend.id)}>
            <i className={classnames('fa', { 'fa-star': this.props.starred }, { 'fa-star-o': !friend.starred })} />
          </button>
          <button className={`btn btn-default ${styles.btnAction}`} onClick={() => this.props.deleteFriend(friend.id)}>
            <i className="fa fa-trash" />
          </button>
          <select value={friend.sex} onChange={(event) => this.props.selectSex({id: friend.id, value: event.target.value})} className={`form-control ${styles.formControl}`}>
            <option value="">Select sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </li>
    );
  }

}
