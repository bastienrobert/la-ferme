import React, { FC } from 'react'
import styled from 'styled-components'

import Image from '@/components/shared/Image'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

interface ColumnProps {
  index: number
  title: string
  sections: any
}

const FooterColumn: FC<ColumnProps> = ({ index, title, sections }) => {
  return (
    <Component>
      <ColumnTop>
        {index === 0 && (
          <Icon src="/images/global/heart.png" alt="heart icon" />
        )}
        <ColumnTitle color="beige" size="28px">
          <h3>{title}</h3>
        </ColumnTitle>
      </ColumnTop>

      <ColumnContent>
        {sections.map((section, i) => (
          <div key={i}>
            <StyledText color="beige" textAlign="left">
              <h4>{section.title}</h4>
            </StyledText>
            {section.links.map(({ label, href }, j) => (
              <A color="beige" key={j}>
                <a href={href}>{label}</a>
              </A>
            ))}
          </div>
        ))}
      </ColumnContent>
    </Component>
  )
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 350px;
  margin-right: 50px;
`

const ColumnTop = styled.div`
  position: relative;
`

const Icon = styled(Image)`
  position: absolute;
  width: 30px;
  left: 150px;
  top: -30px;
`

const ColumnTitle = styled(Title)`
  line-height: 1.2;
  letter-spacing: 1px;
  font-weight: bold;
  margin-bottom: 15px;
`

const ColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`

const StyledText = styled(Text)`
  margin: 25px 0;
  font-size: 18px;
`

const A = styled(Text)`
  margin-bottom: 5px;
  font-size: 16px;
`

export default FooterColumn
