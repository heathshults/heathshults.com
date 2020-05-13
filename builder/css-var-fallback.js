import {src, dest} from 'gulp'
import postcss from 'gulp-postcss';
import postcssCustomProperties from 'postcss-custom-properties';

// create css variable fallback properties 

function css_variable_fallbacks() {
  src(`${p.www_css}/*.css`).pipe(
  postcss([
    postcssCustomProperties(/* pluginOptions */)
  ])
).pipe(
  dest('.')
);
}
exports.defaults = css_variable_fallbacks;
