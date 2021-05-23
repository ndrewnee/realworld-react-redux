import { useAppDispatch, useAppSelector } from 'app/hooks'
import { pageUnload, selectArticleList } from 'features/articleList/articleListSlice'
import ArticlePreview from 'features/articleList/ArticlePreview'
import ListPagination from 'features/articleList/ListPagination'
import React, { useEffect } from 'react'

interface Props {
  currentPage: number
  pager?: (page: number) => void
}

const ArticleList: React.FC<Props> = ({ currentPage, pager }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(pageUnload())
    }
  }, [dispatch])

  const { articles, articlesCount } = useAppSelector(selectArticleList)

  if (!articles) {
    return <div className="article-preview">Loading...</div>
  }

  if (articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>
  }

  return (
    <div>
      {articles.map((article) => {
        return <ArticlePreview article={article} key={article.slug} />
      })}

      <ListPagination pager={pager} articlesCount={articlesCount} currentPage={currentPage} />
    </div>
  )
}

export default React.memo(ArticleList)
