#!/bin/sh

echo "Building all"

lerna run build
lerna run post-build

echo "Done"
