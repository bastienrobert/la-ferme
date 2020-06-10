import React from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

import Header from '@/components/app/Header'
import Footer from '@/components/app/Header'
import BackgroundColor from '@/components/shared/BackgroundColor'

import TeaserSlice from '@/components/slices/TeaserSlice'
import DetailsSlice from '@/components/slices/DetailsSlice'
import BoardSlice from '@/components/slices/BoardSlice'
import AppSlice from '@/components/slices/AppSlice'
import PlaySlice from '@/components/slices/PlaySlice'
import GoalSlice from '@/components/slices/GoalSlice'
import PosterSlice from '@/components/slices/PosterSlice'

function HomePage() {
  return (
    <BackgroundColor color="beige">
      <Header />
      <Component>
        <TeaserSlice />
        <DetailsSlice />
        <BoardSlice />
        <AppSlice />
        <PlaySlice />
        <GoalSlice />
        <PosterSlice />
      </Component>
    </BackgroundColor>
  )
}

const Component = styled.main`
  padding-top: 170px;
`

export default HomePage
