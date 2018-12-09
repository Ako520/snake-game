// @flow
import React from 'react'

const Score = (props: { score: number }) => {
  const { score } = props
  return (
    <div className="score">
      {score}
    </div>
  )
}

export default Score