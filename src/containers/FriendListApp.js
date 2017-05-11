import React, { Component, PropTypes } from 'react';
import styles from './FriendListApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {chunk} from 'lodash';

import * as FriendsActions from '../actions/FriendsActions';
import { FriendList, AddFriendInput, Pagination } from '../components';

@connect(state => ({
  friendlist: state.friendlist
}))
export default class FriendListApp extends Component {

  static propTypes = {
    friendsById: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  numberOfItemsInPage = 2;

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      chunkedFriends: chunk(this.props.friendlist.friends, this.numberOfItemsInPage)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {activePage} = this.state;
    const chunkedFriends = chunk(nextProps.friendlist.friends, this.numberOfItemsInPage);
    console.log(chunkedFriends, activePage);
    if (activePage !== 1 && !chunkedFriends[activePage-1]) {
      this.setState({activePage: activePage-1});
    }
    this.setState({chunkedFriends})
  }

  getChunkedFriends = () => {
    const {activePage, chunkedFriends} = this.state;
    const {friendlist: {friendsById}} = this.props;
    return chunkedFriends[activePage-1] && chunkedFriends[activePage-1].reduce((acc, next) => {
      return {
        ...acc,
        [next]: {
          ...friendsById[next]
        }
      }
    }, {});
  }

  onChangePage = (activePage) => {
    this.setState({activePage});
  };

  render () {
    const { activePage, chunkedFriends } = this.state
    const { friendlist: { friends }, dispatch } = this.props;
    const actions = bindActionCreators(FriendsActions, dispatch);

    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendInput addFriend={actions.addFriend} />
        <FriendList friends={this.getChunkedFriends()} actions={actions} activePage={activePage} />
        <Pagination activePage={activePage} items={chunkedFriends} onChangePage={this.onChangePage} />
      </div>
    );
  }
}
