import React from 'react'
import { Typo } from '@la-ferme/components/native'

export default function Users({ data }) {
  return (
    <>
      {data.connectedUsers.map(({ user_uuid }, i) => (
        <Typo key={`user-${i}`}>{user_uuid}</Typo>
      ))}
    </>
  )
}
