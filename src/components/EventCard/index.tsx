'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import type { FC } from 'react'

import type { Event } from '@/payload-types'

export type CardEventData = Pick<Event, 'slug' | 'title'>

export const EventCard: FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardEventData
  relationTo?: 'events'
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, title: titleFromProps } = props

  const { slug, title } = doc || {}

  const titleToUse = titleFromProps || title

  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="p-4">
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
      </div>
    </article>
  )
}
