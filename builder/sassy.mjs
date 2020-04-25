let path = require('path')
import {src, dest} from 'gulp'
let fs = require('fs-extra')
import sass from 'gulp-sass'
import p from './gpaths'
import * as pkg from '../package.json'
import header from 'gulp-header'
import changed from 'gulp-changed'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import browserSync from 'browser-sync'
import banner from './header-banner'

// Compiles sassy files from /sassy into /css
// NOTE: This theme uses sass by default. To swtich to sassy you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
let sassy = ()=>{}


sassy=(cb)=> (src([`${p.src_scss}/heathshults.scss`,`${p.src_scss}/theme-dark-mode.scss`],{sourcemaps: true})
  .pipe(changed(`${p.www_css}`))
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(header(banner,{pkg: pkg}))
  .pipe(dest(`${p.www_css}`),{sourcemap: '.',overwrite: true})
  .pipe(cleanCSS({compatibility: 'ie11'},(details) => {
    console.log(`${details.name}: ${details.stats.originalSize}`)
    console.log(`${details.name}: ${details.stats.minifiedSize}`)
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(dest(`${p.www_css}`),{sourcemap: '.',overwrite: true})
  .pipe(browserSync.reload({
    stream: true
  })),cb);
exports.default = sassy;
