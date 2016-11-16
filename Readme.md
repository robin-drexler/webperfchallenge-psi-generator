# Readme

Generates page speed score of most popular websites.
Data will be used to have an updated data set for [https://webperfchallenge.com/](https://webperfchallenge.com/)

## Prerequisites
This was tested with node 6.9.0 only.

## Usage

Run main.js and optionally provide the number of top websites to consider (default 3).

```bash
node main.js 2 > pagespeed.json
```

## Test

```bash
npm run test
```