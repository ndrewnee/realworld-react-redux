import api from 'api'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { MouseEventHandler } from 'react'
import { articlesByTag, changeTag, selectHome } from './homeSlice'

const Tags: React.FC<{}> = () => {
  const dispatch = useAppDispatch()
  const { tags } = useAppSelector(selectHome)

  if (!tags) {
    return <div>Loading Tags...</div>
  }

  return (
    <div className="tag-list">
      {tags.map((tag) => {
        const handleClick: MouseEventHandler = (event) => {
          event.preventDefault()
          dispatch(changeTag({ tag, pager: (page) => api.Articles.byTag(tag, page) }))
          dispatch(articlesByTag(tag))
        }

        return (
          <button type="button" className="tag-default tag-pill" key={tag} onClick={handleClick}>
            {tag}
          </button>
        )
      })}
    </div>
  )
}

export default React.memo(Tags)
