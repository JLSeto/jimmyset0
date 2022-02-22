#!/bin/bash
# ng build --configuration production --output-path docs --base-href https://jlseto.github.io
ng build --configuration production --output-path docs --base-href https://jimmyseto.com
cp docs/index.html docs/404.html
touch docs/.nojekyll
echo "jimmyseto.com" >> docs/CNAME
git add docs/*
git commit -am "updates"
git push