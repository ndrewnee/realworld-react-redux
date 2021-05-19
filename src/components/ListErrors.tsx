import React, { FC } from 'react'

type Props = {
  errors: {
    [k: string]: string
  }
}

const ListErrors: FC<Props> = ({ errors }) => {
  if (!errors) {
    return null
  }

  return (
    <ul className="error-messages">
      {Object.keys(errors).map((key) => {
        return (
          <li key={key}>
            {key} {errors[key]}
          </li>
        )
      })}
    </ul>
  )
}

export default ListErrors
