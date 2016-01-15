import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import isDonation from '../lib/is_donation';

import Currency from './Currency';
import TransactionStatus from './TransactionStatus';
import ProfilePhoto from './ProfilePhoto';


class Transaction extends Component {
  render() {
    const {
      amount,
      currency,
      description,
      id,
      GroupId,
      createdAt,
      user,
      isPublic
    } = this.props;
    const hideStatus = isDonation(this.props);
    const prefix = isPublic ? '/public' : '/app';

    return (
      <div className='Transaction'>
        <Link to={`${prefix}/groups/${GroupId}/transactions/${id}`}>
          <ProfilePhoto url={user && user.avatar} />
          <div className='Transaction-info'>
            <div className='Transaction-created'>
              {createdAt ? moment(createdAt).fromNow() : ''}
            </div>
            <div className='Transaction-description'>{description}</div>
            <div className='Transaction-status'>
              <div className='Transaction-amount'><Currency value={amount} currency={currency} /></div>
              <div className='Transaction-approved'>
                {hideStatus ? null : <TransactionStatus {...this.props} />}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

Transaction.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
};

export default Transaction;
