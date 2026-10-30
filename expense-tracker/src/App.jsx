import { useState } from 'react'
import CategoryFilter from './components/CategoryFilter'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  function handleAddExpense(expense) {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { id: crypto.randomUUID(), ...expense },
    ])
  }

  const filteredExpenses =
    selectedCategory === 'All'
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory)

  return (
    <main>
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ExpenseList expenses={filteredExpenses} />
    </main>
  )
}

export default App
