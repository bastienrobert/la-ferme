import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import Header from '@/components/app/Header'
import Footer from '@/components/app/Footer'
import BackgroundColor from '@/components/shared/BackgroundColor'

import TeaserSlice from '@/components/slices/TeaserSlice'
import DetailsSlice from '@/components/slices/DetailsSlice'
import BoardSlice from '@/components/slices/BoardSlice'
import AppSlice from '@/components/slices/AppSlice'
import PlaySlice from '@/components/slices/PlaySlice'
import GoalSlice from '@/components/slices/GoalSlice'
import PosterSlice from '@/components/slices/PosterSlice'

import content from '@/content'
const t = content.global

function HomePage() {
  return (
    <>
      <Head>
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.description} />
      </Head>
      <BackgroundColor color="beige">
        <Header />
        <main>
          <TeaserSlice />
          <DetailsSlice />
          <BoardSlice />
          <AppSlice />
          <PlaySlice />
          <GoalSlice />
          <PosterSlice />
        </main>
        <Footer />
      </BackgroundColor>
    </>
  )
}

export default HomePage
