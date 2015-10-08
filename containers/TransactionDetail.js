import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTransaction, approveTransaction, rejectTransaction } from '../actions/transactions';
import { fetchGroup } from '../actions/groups';
import Header from '../components/Header';
import Currency from '../components/Currency';
import ApproveButton from '../components/ApproveButton';
import RejectButton from '../components/RejectButton';
import Well from '../components/Well';
import Content from './Content';

class TransactionDetail extends Component {
  render() {
    const { groups, transactions, routeParams } = this.props;
    const { groupid, transactionid } = routeParams;

    const transaction = transactions[transactionid] || {};
    const group = groups[groupid] || {};

    return (
      <div>
        <Header title={group.description} hasBackButton={true} />

        <Content>
          <Well leftText={transaction.description} rightText='3 days ago' />
          <div className='TransactionDetail'>

            <div className='TransactionDetail-image'>
              <img src={transaction.link} />
            </div>

            <div className='TransactionDetail-info'>
              <div className='TransactionDetail-price'>
                <Currency value={transaction.amount} />
              </div>

              <div className='TransactionDetail-category'>
                Category
                (TO IMPLEMENT)
              </div>
            </div>


            <div className='TransactionDetail-controls'>
              <ApproveButton groupid={groupid} transactionid={transactionid} {...this.props}/>
              <RejectButton groupid={groupid} transactionid={transactionid} {...this.props}/>
            </div>
          </div>
        </Content>
      </div>
    );
  }

  componentDidMount() {
    const { fetchTransaction, fetchGroup, routeParams } = this.props;
    const { groupid, transactionid } = routeParams;

    fetchTransaction(groupid, transactionid);
    fetchGroup(groupid);
  }
}

export default connect(mapStateToProps, {
  fetchTransaction,
  approveTransaction,
  rejectTransaction,
  fetchGroup,
})(TransactionDetail);

function mapStateToProps (state) {
  return {
    groups: state.groups,
    transactions: state.transactions,
  };
}