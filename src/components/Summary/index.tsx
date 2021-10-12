import { useContext } from 'react'

import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionContext } from '../../TransactionContext'
import { Container } from './style'

export function Summary() {
  const { transactions, formatCurrent } = useContext(TransactionContext)

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposit += transaction.amount
        acc.total += transaction.amount
      } else {
        acc.withdraw += transaction.amount
        acc.total -= transaction.amount
      }

      return acc
    },
    {
      deposit: 0,
      withdraw: 0,
      total: 0
    }
  )

  const { deposit, withdraw, total } = summary

  const backgroundVariation = total < 0 ? '#E52E4D' : '#33cc95'

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{formatCurrent(deposit)}</strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeImg} alt="Saidas" />
        </header>
        <strong>{formatCurrent(withdraw)}</strong>
      </div>

      <div
        style={{ backgroundColor: backgroundVariation }}
        className="highlight-background"
      >
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{formatCurrent(total)}</strong>
      </div>
    </Container>
  )
}
