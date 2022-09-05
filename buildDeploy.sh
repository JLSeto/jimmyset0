#!/bin/bash
# ng build --configuration production --output-path docs --base-href https://jlseto.github.io
sudo ng build --configuration production --output-path docs --base-href https://jimmyseto.com
sudo cp docs/index.html docs/404.html
sudo touch docs/.nojekyll
sudo touch docs/CNAME
echo "jimmyseto.com" >> docs/CNAME
git add docs/*
git commit -am "updates"
git push