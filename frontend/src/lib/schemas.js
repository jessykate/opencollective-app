import { Schema, arrayOf } from 'normalizr';

/**
 * Schemas
 */

const GroupSchema = new Schema('groups');
const TransactionSchema = new Schema('transactions');
const ExpenseSchema = new Schema('expenses');
const UserSchema = new Schema('users');
const CardSchema = new Schema('cards');

/**
 * Export all the schemas to normalize them later
 */

export default {
  GROUP: GroupSchema,
  GROUP_ARRAY: arrayOf(GroupSchema),
  TRANSACTION: TransactionSchema,
  TRANSACTION_ARRAY: arrayOf(TransactionSchema),
  EXPENSE: ExpenseSchema,
  EXPENSE_ARRAY: arrayOf(ExpenseSchema),
  USER: UserSchema,
  USER_ARRAY: arrayOf(UserSchema),
  CARD: CardSchema,
  CARD_ARRAY: arrayOf(CardSchema)
};
