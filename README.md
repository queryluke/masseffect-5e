# Mass Effect 5e
A homebrew conversion of Dungeons & Dragons 5th Edition into the Mass Effect Universe.

[View the Site](http://n7.world/)
 
## How it's made
1. Majority of info is stored on a variety of Google Sheets, converted to json with ruby
2. Web App created with [Vue.js](http://vuejs.org/), [Vuetify.js](https://vuetifyjs.com), and [Nuxt.js](https://nuxtjs.org/)
3. [Hosted by Github Pages](https://pages.github.com/)

### Working on the site
Requirements: [Node.js](https://nodejs.org/)

``` bash
# clone the repo
$ git clone https://github.com/queryluke/masseffect-5e.git

# cd to code
$ cd masseffect-5e

# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev


For detailed explanation on how things work, check out the [Nuxt.js](https://github.com/nuxt/nuxt.js) and [Vuetify.js](https://vuetifyjs.com/) documentation.

### Mass Effect 5e Data
The data api is located at https://data.n7.world/[VERSION] (starting from v130)

If you want to edit and work on the data locally and see how it renders in the site, you can clone that repo: https://github.com/queryluke/masseffect-5e-data

To see your changes locally, you'll want to symlink the data repo into this repo __IN THE `static` dir!!!__.

Then you can load the site with `npm run local`

__Windows__ (note: you'll probably need to run the cmd as an administrator)
```bash
mklink /D $PATH_TO_THIS_REPO\static\.data $PATH_TO_DATA_REPO\docs\$VERISON

## e.g.
mklink /D E:\Sites\masseffect-5e\static\.data E:\Sites\masseffect-5e-data\docs\v130
```

__Linux/Mac__
```bash
ln -s $PATH_TO_DATA_REPO/docs/$VERISON $PATH_TO_THIS_REPO/static/.data

## e.g.
ln -s ~/Sites/masseffect-5e-data/docs/v130 ~/Sites/masseffect-5e/static/.data
```

__NOTE!__ You will need to remove the symlink before running `nuxt generate`, Windows `rmdir static/.data` or Linux/Mac `unlink static/.data`
