import React from 'react'

import Title from '@/components/typo/Title'

export default function Users({ data }) {
  return (
    <>
      <Title preset="H2" color="yellow">
        {data.length}{' '}
        <Title preset="H2" color="beige">
          / 4
        </Title>
      </Title>
    </>
  )
}
