# Mass Effect 5e
A homebrew conversion of Dungeons & Dragons 5th Edition into the Mass Effect Universe.

[View the Site](http://n7.world/)
 
## Working on the site
Requirements: [Node.js](https://nodejs.org/)

``` bash
# clone the repo
$ git clone https://github.com/queryluke/masseffect-5e.git

# cd to code
$ cd masseffect-5e

# make .env file
$ touch .env

# add the following to the .env file
you can change the version to any of the versions available in the data repo
```env
VERSION=v1.3.0
API_BASE_URL=https://data.n7.world
```

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev


For detailed explanation on how things work, check out the [Nuxt.js](https://github.com/nuxt/nuxt.js) and [Vuetify.js](https://vuetifyjs.com/) documentation.

## Mass Effect 5e Data
The data api is located at https://data.n7.world/[VERSION] (starting from v130)

If you want to edit and work on the data locally and see how it renders in the site, you can clone that repo: https://github.com/queryluke/masseffect-5e-data

To see your changes locally, you'll want to symlink the data repo into this repo __IN THE `static` dir!!!__.

Then you can load the site with `yarn run local`

__Windows__ (note: you'll probably need to run the cmd as an administrator)
```bash
mklink /D $PATH_TO_THIS_REPO\static\.data $PATH_TO_DATA_REPO\docs\$VERISON

## e.g.
mklink /D E:\Sites\mass-effect\masseffect-5e\static\.data E:\Sites\mass-effect\masseffect-5e-data\docs\v130
```

__Linux/Mac__
```bash
ln -s $PATH_TO_DATA_REPO/docs/$VERISON $PATH_TO_THIS_REPO/static/.data

## e.g.
ln -s ~/Sites/masseffect-5e-data/docs/v130 ~/Sites/masseffect-5e/static/.data
```

__NOTE!__ You will need to remove the symlink before running `nuxt generate`, Windows `rmdir static/.data` or Linux/Mac `unlink static/.data`

## Amplify (AWS Hosting)

This is only required if you plan on working on aspects of the site that utilize the MassEffect5e AWS hosted components.

1. Install the [Amplify CLI](https://docs.amplify.aws/cli/)
2. [Configure your account](https://docs.amplify.aws/cli/start/install/#option-2-follow-the-instructions) (will need to contact the ME5e developers for an AWS account)
  - Note, if you already have an amplify profile configured, [see this guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)
3. In the root of this repo: `amplify pull --appId dqx4jr4x8mav --envName dev` 

## Translations

Starting with v131, we now support translations. Translations are handled in two ways.

### Rule translations
"Rule" translations mark up the bulk of the translation files. The [`text` directory](https://github.com/queryluke/masseffect-5e-data/tree/master/text) in the data repo
has a language directory for each translation. These are copies of everything in the `en` directory, but translated into
the corresponding language. For the most part, you'll never have to worry about these translations, because the data fetchers
look at the current locale and grab the corresponding language file.

### Messages
There is one special directory, called [`messages`](https://github.com/queryluke/masseffect-5e-data/tree/master/text/en/messages).
Messages are reusable labels and text for things like buttons, list headers, and labels. These messages are incorporated into
the site using [`nuxt-i18n`](https://i18n.nuxtjs.org/).

#### Conventions

All of these conventions are rules of thumb, so take this documentation with a grain of salt.

|Type|Description|Key|Examples|
|---|---|---|---|
|Titles|Title case messages|`*_title`|`ability_score_increase_title: 'Ability Score Increase'`|
|Text|messages that generally have additional interpolation|`*_text`|`concentration_text: 'Concentration, up to {time}'`|
|Types|Type qualifiers for a model, an object of key=>value pairs for each type|`*_types`|`armor_types: {light: 'light', medium:'medium' ...}`|
|-|Additionally, root level 'types' like `sizes` or `tags`, don't have `_type` appended to the key|-|-|


#### Usage

##### Basic
Use for key=>value pairs with a single entry (i.e. no vertical pipe)

`$t('key')`
e.g. `$t('ability_score_increase_title')`

##### Plurals
Use when the value has a vertical pipe, like `Weapon | Weapons`

e.g.

`$tc('key', count)`

```javascript
$tc('weapon_title', 1)
// = Weapon

$tc('weapon_title', 2)
// = Weapons
```

If the value supports plural with a counter, pass an object with the count as `n`

e.g.

```javascript
$tc('credits', 10, {n: 10})
// = 10 credits
```

##### Lists
Occasionally, we use lists are used to make it easier to pick the correct translation

e.g.

`$t('key[index]')`

```javascript
$t('ordinal_numbers[2]')
// = 2nd
```

##### Objects
Key can also be a dot-notation path, generally used for types

e.g.

`$t('key.nextKey')`

```javascript
$t('gear_types.ammo')
// = Ammo

// Note, this can be combined with anything above
$tc('weapon_types.assault_rifle', 2)
// = Assault Rifles
```

##### Message Interpolation
When a message value has `{...}` within the string, you can pass the value as a key

e.g.

```javascript
// If the key value pair is: `concentration_text: 'Concentration, up to {time}'`

$t('concentration_text', {time: '10 minutes'})
// = Concentration, up to 10 minute
  
// However, in the above example, you'll also probably want to translate `time`. Time is a plural, thus:

$t('concentration_text', {time: $tc('times.minute', 10, {n: 10})})
// = Concentration, up to 10 minute
```

##### Interpolation in the code
Finally, you can interpolate dot-notation paths, array index, pluralities, etc. within your javascript

```javascript
let timeType = 'minute'
let numMinutes = 5

$tc(`times.${timeType}`, numMinutes, {n: numMinutes})
// = 5 minutes
```

## `asyncData` vs `fetch`

First read nuxt's [official documentation](https://nuxtjs.org/docs/2.x/features/data-fetching/).

The conventions of this site are designed for SEO. For example, using `fetch` on a `_id` results in the page not being
fully rendered when a bot/crawler hits it (Bots and crawlers don't wait for the fetch to complete). Thus, `asyncData`
is more appropriate because it prevents the route from loading until the data is fetched.

So, the general rule of thumb is:

Can/should ___parts___ of the page load before all of the data is fetched? Then use `fetch` and a skeleton loader.
Else, use `asyncData`
