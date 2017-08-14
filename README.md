Realm Open Source
=========================

A simple, static portal which outlines our open source offerings. Intentionally
themed to look like a merchant page on the directory.


Development
-----------

In an attempt to prevent unnessicary file duplication, the easiest way to develop is by build the static site and replace the index page for the site with the one from `open-source`. By default on realm.io repo the `open-source` page is ignored. Update this page on that repo to keep the footer, header, and site styles consolidated. 

## how to update

    1) make updates to the page running the realm.io repo locally
    2) build the site locally by running `bundle exec middleman build --verbose`
    3) copy the contents of the `/open-source` folder into the root of this repo as well as any page specific style changes
    4) replace the index in `/open-source` with the index of the repo
    5) rename asset paths and URLs to reflect the new page location at the root. 
    6) Push to master