import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import formatCurrency from '../lib/format_currency';

import { getPaypalCard } from '../reducers/users';

import Content from './Content';

import TopBar from '../components/TopBar';
import Notification from '../components/Notification';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import PaypalReminder from '../components/PaypalReminder';

import validateTransaction from '../actions/form/validate_transaction';
import createTransaction from '../actions/transactions/create';
import resetNotifications from '../actions/notification/reset';
import fetchGroup from '../actions/groups/fetch_by_id';
import fetchCards from '../actions/users/fetch_cards';
import notify from '../actions/notification/notify';
import getPreapprovalKeyForUser from '../actions/users/get_preapproval_key';

export class AddFund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      description: ''
    };
  }

  render() {
    const { group, hasPaypalCard } = this.props;

    return (
      <div className='AddFund'>
        <TopBar
          title='Add funds'
          backLink={`/app/groups/${this.props.groupid}/transactions/`} />
        <Content>
          <Notification {...this.props} />
          <div className='padded'>
            <div className='AddFund-header'>
              <div className='AddFund-name'>{group.name}</div>
              <div className='AddFund-description'>{group.description}</div>
            </div>
            {hasPaypalCard ? this.form() : this.paypalReminder()}
          </div>
        </Content>
      </div>
    );
  }

  componentWillMount() {
    const {
      fetchGroup,
      fetchCards,
      notify,
      userid,
      groupid
    } = this.props;

    Promise.all([
      fetchGroup(groupid),
      fetchCards(userid, { service: 'paypal'})
    ])
    .catch(({message}) => notify('error', message));
  }

  form() {
    return (
      <div>
        <form onSubmit={event => {
          event.preventDefault();
          donate.call(this);
        }}>
          <span className='Label'>Amount:</span>
          <Input
            value={this.state.amount}
            placeholder={formatCurrency(0, this.props.group.currency)}
            handleChange={amount => this.setState({amount})} />

          <span className='Label'>Description:</span>
          <Input
            value={this.state.description}
            placeholder='Description'
            handleChange={description => this.setState({description})} />

          <div className='AddFund-buttonContainer'>
            <SubmitButton />
          </div>
          <p>
            Don't worry, no money will be moved when you add funds. We only transfer money when you explicitly approve an expense.
          </p>
        </form>
      </div>
    );
  }

  paypalReminder() {
    const { getPreapprovalKeyForUser, userid, preapprovalInProgress } = this.props;

    return (
      <PaypalReminder
        getPreapprovalKey={() => getPreapprovalKeyForUser(userid)}
        inProgress={preapprovalInProgress} />
    );

  }

}

export function donate() {

  const {
    validateTransaction,
    createTransaction,
    groupid,
    notify,
    pushState,
  } = this.props;

  const transaction = {
    amount: this.state.amount,
    description: this.state.description,
    tags: ['Fund'],
    approvedAt: Date.now(),
    approved: true,
    createdAt: Date.now(),
  };

  return validateTransaction(transaction)
  .then(() => createTransaction(groupid, transaction))
  .then(() => pushState(null, `/app/groups/${groupid}/transactions`))
  .then(() => notify('success', 'Funds added'))
  .catch(({message}) => notify('error', message));
}

export default connect(mapStateToProps, {
  resetNotifications,
  fetchGroup,
  fetchCards,
  createTransaction,
  validateTransaction,
  getPreapprovalKeyForUser,
  notify,
  pushState,
})(AddFund);

function mapStateToProps({router, groups, session, users, notification}) {
  const groupid = router.params.groupid;
  const userid = session.user.id;
  const paypalCard = getPaypalCard(users, userid);

  return {
    groupid,
    group: groups[groupid] || {},
    userid,
    preapprovalInProgress: users.inProgress,
    user: users[userid] || {},
    notification,
    hasPaypalCard: paypalCard && paypalCard.id
  };
}
