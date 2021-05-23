import { useAppDispatch, useAppSelector } from 'app/hooks'
import { articlesByPage, selectArticleList } from 'features/articleList/articleListSlice'
import React, { MouseEventHandler } from 'react'

const ListPagination: React.FC<{}> = () => {
  const dispatch = useAppDispatch()
  const { articlesCount, currentPage, pager } = useAppSelector(selectArticleList)

  if (articlesCount <= 10) {
    return null
  }

  const range: number[] = []
  for (let i = 0; i < Math.ceil(articlesCount / 10); ++i) {
    range.push(i)
  }

  const setPage = (page: number) => {
    dispatch(articlesByPage({ pager, page }))
  }

  return (
    <nav>
      <ul className="pagination">
        {range.map((page) => {
          const isCurrent = page === currentPage

          const onClick: MouseEventHandler = (event) => {
            event.preventDefault()
            setPage(page)
          }

          return (
            <li
              className={isCurrent ? 'page-item active' : 'page-item'}
              onClick={onClick}
              key={page.toString()}
            >
              <button type="button" className="page-link">
                {page + 1}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default React.memo(ListPagination)
