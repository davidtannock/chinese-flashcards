#!/bin/bash

mlr --csv cut -x -f english1,english2 cards.csv | mlr --c2j --jlistwrap cat > cards.json
