import { useState } from 'react'

const categories = ['Food', 'Travel', 'Bills', 'Other']

/**
 * Controlled form for collecting a new expense.
 *
 * @param {{onAddExpense: (expense: {title: string, amount: number, category: string}) => void}} props
 * The callback is called only when the submitted values pass validation.
 */
function ExpenseForm({ onAddExpense }) {
  // Controlled state keeps each form input synchronized with React state.
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const numericAmount = Number(amount)

    if (!trimmedTitle) {
      setError('Title is required.')
      return
    }

    if (amount.trim() === '' || !Number.isFinite(numericAmount)) {
      setError('Amount must be a numeric value.')
      return
    }

    if (numericAmount <= 0) {
      setError('Amount must be greater than zero.')
      return
    }

    if (numericAmount > 100000) {
      setError('Amount must not exceed 100,000.')
      return
    }

    const expense = {
      title: trimmedTitle,
      amount: numericAmount,
      category,
    }

    onAddExpense(expense)

    // Clear the form after the parent receives the new expense.
    setTitle('')
    setAmount('')
    setCategory('Food')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="expense-title">Title</label>
        <input
          id="expense-title"
          data-cy="title"
          data-testid="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="expense-amount">Amount</label>
        <input
          id="expense-amount"
          data-cy="amount"
          data-testid="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="expense-category">Category</label>
        <select
          id="expense-category"
          data-cy="category"
          data-testid="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {error && <p role="alert">{error}</p>}

      <button type="submit" data-cy="add-expense">
        Add Expense
      </button>
    </form>
  )
}

export default ExpenseForm
