import React from 'react'
import { Typo } from '@la-ferme/components/native'

export default function Users({ data }) {
  return (
    <>
      {data.users.map(({ uuid }, i) => (
        <Typo key={`user-${i}`}>{uuid}</Typo>
      ))}
    </>
  )
}
