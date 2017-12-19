# Mass Effect 5e
A homebrew conversion of Dungeons & Dragons 5th Edition into the Mass Effect Universe.

 [View the Site](https://queryluke.github.io/masseffect-5e)
 
 ## How it's made
 
 1. Site is generated via Github Pages
 2. Multiple Google sheetss are converted via the ruby script **generate.rb**
 
 ## Contributing
 
 ### Making suggestions
 
 If you'd like to make suggestions for the system itself, check out the [contributing guide](http://queryluke.github.io/masseffect-5e/about) 
 in the about section.
 
 If you want to contribute code, see below.
 
 ### Working on the site
 * You need to have Bundler installed `gem install bundler`
 * Clone the repo
 * Within the site dir: `bundle install`
 
 To run locally:
 
 * `jekyll serve`
 * Site is available at localhost:4000
 
 ### Working on the phb
  * Do everything in the working on the site section (including running `jekyll serve`)
  * Install [node.js](https://nodejs.org/en/)
  * execute the following commands
  * cd into the **phb-app** directory
  * `npm install`
  
To run locally:
 * `gulp serve`
 * Site will be available at localhost:3000

To build a distribution:
* in **phb-app**, run `gulp`, and commit the compiled code
