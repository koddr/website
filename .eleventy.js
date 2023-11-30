const esbuild = require('esbuild');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const htmlmin = require('html-minifier');
const cssnano = require('cssnano');
const { EleventyI18nPlugin } = require('@11ty/eleventy');
const i18nPlugin = require('eleventy-i18n');

// Load translations.
const en = require('./src/en/en.json');
const ru = require('./src/ru/ru.json');

module.exports = (eleventyConfig) => {
  // Watch CSS files for changes.
  eleventyConfig.addWatchTarget('src/styles/*.css');

  // Watch JS files for changes.
  eleventyConfig.addWatchTarget('src/scripts/*.js');

  // Copy common files to dist.
  eleventyConfig.addPassthroughCopy({ 'src/common': '/' });

  // Build JavaScript bundle.
  eleventyConfig.on('eleventy.before', async () => {
    await esbuild.build({
      entryPoints: ['./src/scripts/bundle.js',],
      bundle: true,
      outfile: './src/scripts/minified/bundle.min.js',
      sourcemap: false,
      target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
      minify: true,
    });
  });

  // PostCSS filter.
  eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
    postcss([tailwindcss(require('./tailwind.config.js')), autoprefixer(), cssnano()])
      .process(cssCode, { from: undefined })
      .then(
        (r) => done(null, r.css),
        (e) => done(e, null)
      );
  });

  // Minify HTML.
  eleventyConfig.addTransform('htmlmin', function (content) {
    if (this.outputPath && this.outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
    }

    return content;
  });

  // I18n plugin.
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
    filters: {
      url: 'locale_url',
      links: 'locale_links'
    },
    errorMode: 'strict'
  });

  // I18n translations.
  eleventyConfig.addPlugin(i18nPlugin, {
    translations: { en, ru },
    fallbackLanguageTag: 'en',
    keySeparator: '.'
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    markdownTemplateEngine: 'njk'
  };
};
