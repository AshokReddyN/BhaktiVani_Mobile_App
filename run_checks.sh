#!/bin/bash
set -e
cd BhaktiVani
npm install
npm run lint
npm run type-check
