import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import { EventCard, CardEventData } from '../EventCard'

export type Props = {
  items: (CardPostData | CardEventData)[]
  relationTo: 'events' | 'posts'
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { items, relationTo } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {items?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  {relationTo === 'events' ? (
                    <EventCard className="h-full" doc={result} relationTo="events" />
                  ) : (
                    <Card className="h-full" doc={result} relationTo="posts" showCategories />
                  )}
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
