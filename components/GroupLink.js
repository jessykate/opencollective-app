import React, { Component } from 'react';
import { Link } from 'react-router';
import Currency from './Currency';

class GroupTitle extends Component {
  render() {
    const {id, name, budget} = this.props;
    const url = `/groups/${id}/transactions/`;

    return (
      <div className='border-bottom px2 py2 bold bg-silver'>
        <Link to={url}>
          {name}
          <span className='right'>
            Balance: <Currency value={budget} /> &#8250;
          </span>
        </Link>
      </div>
    );
  }
}

export default GroupTitle;