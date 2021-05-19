import article from 'store/reducers/article';
import articleList from 'store/reducers/articleList';
import auth from 'store/reducers/auth';
import common from 'store/reducers/common';
import editor from 'store/reducers/editor';
import home from 'store/reducers/home';
import profile from 'store/reducers/profile';
import settings from 'store/reducers/settings';

const rootReducer = {
  article,
  articleList,
  auth,
  common,
  editor,
  home,
  profile,
  settings,
}

export default rootReducer
