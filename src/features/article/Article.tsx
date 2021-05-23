import { useAppDispatch, useAppSelector } from 'app/hooks'
import marked from 'marked'
import DOMPurify from 'dompurify'
import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ArticleMeta from './ArticleMeta'
import { pageLoad, pageUnload, selectArticle } from './articleSlice'
import CommentContainer from './CommentContainer'

interface MatchParams {
  id: string
}

const Article: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(pageLoad(match.params.id))

    return () => {
      dispatch(pageUnload())
    }
  }, [dispatch, match.params.id])

  const { article } = useAppSelector(selectArticle)

  if (!article) {
    return null
  }

  const markup = {
    __html: DOMPurify.sanitize(marked(article.body), { USE_PROFILES: { html: true } }),
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            <div dangerouslySetInnerHTML={markup}></div>

            <ul className="tag-list">
              {article.tagList.map((tag) => {
                return (
                  <li className="tag-default tag-pill tag-outline" key={tag}>
                    {tag}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions"></div>

        <div className="row">
          <CommentContainer />
        </div>
      </div>
    </div>
  )
}

export default Article
