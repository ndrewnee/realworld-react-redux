import { ArticleEdit } from 'api/article'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import ListErrors from 'components/ListErrors'
import { pageLoad, pageUnload, selectEditor, submitArticle, updateField } from './editorSlice'
import React, {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {
  slug: string
}

const Editor: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const dispatch = useAppDispatch()
  const [tagInput, setTagInput] = useState('')
  const { article, inProgress, errors } = useAppSelector(selectEditor)
  const { slug, title, description, body, tagList } = article

  const updateFieldEvent: (
    key: string,
  ) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (key) => (event) =>
    dispatch(updateField({ [key]: event.target.value }))

  const changeTitle = updateFieldEvent('title')

  const changeDescription = updateFieldEvent('description')

  const changeBody = updateFieldEvent('body')

  const changeTagList = (value: string[]) => dispatch(updateField({ tagList: value }))

  const changeTagInput: ChangeEventHandler<HTMLInputElement> = (event) =>
    setTagInput(event.target.value)

  const watchForEnter: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onAddTag()
    }
  }

  const onAddTag = () => {
    changeTagList([...tagList, tagInput])
    setTagInput('')
  }

  const removeTagHandler = (tag: string) => () => {
    changeTagList(tagList.filter((t) => t !== tag))
  }

  const submitForm: FormEventHandler = (event) => {
    event.preventDefault()

    const article: ArticleEdit = {
      slug: slug,
      title: title,
      description: description,
      body: body,
      tagList: tagList,
    }

    dispatch(submitArticle(article))
  }

  useEffect(() => {
    const unmount = () => {
      dispatch(pageUnload())
    }

    if (match.params.slug) {
      dispatch(pageUnload())
      dispatch(pageLoad(match.params.slug))
      return unmount
    }

    dispatch(pageLoad(null))

    return unmount
  }, [dispatch, match.params.slug])

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ListErrors errors={errors} />

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Article Title"
                    value={title}
                    onChange={changeTitle}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="What's this article about?"
                    value={description}
                    onChange={changeDescription}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={changeBody}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter tags"
                    value={tagInput}
                    onChange={changeTagInput}
                    onKeyUp={watchForEnter}
                  />

                  <div className="tag-list">
                    {tagList.map((tag) => {
                      return (
                        <span className="tag-default tag-pill" key={tag}>
                          <i className="ion-close-round" onClick={removeTagHandler(tag)} />
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </fieldset>

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={inProgress}
                  onClick={submitForm}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
