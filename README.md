# Syllabus

## Introduction

We will cover best practices when developing Node.js programs including API design, package definition, NPM interaction, test coverages and CoffeeScript. Each unit of the course are design to complement each other in the building of a real-life application. We propose to build a time-serie database which collect data from multiple agents, store the data and provide access throuh a web application and a REST api. For example, the result could be used to collect system metrics from a cluster.

## Requirements

This course is requiring familiarity with the JavaScript language and general knowledges in Web technologies. Prior experience with server side environment such as Lamp is a plus.

## Outline

1.  Node.js and NPM
2.  Packages best practices
3.  Transpilers everywhere
4.  Embeded LevelDB datastore and unit testing   
5.  Advanced web application and REST service   
6.  Data Streaming with HTTP push   

## Bibliography/webography

No book is used nor required. Reliable information is gathered from wikis, GitHub, source codes and various blogs.

## About those presentations

Every presentation uses [reveal.js](https://github.com/hakimel/reveal.js/)

To export to pdf, use [decktape](https://github.com/astefanutti/decktape) (requires at least node v7.10.0) :

```
npm i -g decktape http-server

# In first terminal, use http-server to expose presentation
cd /path/to/presentation
http-server -p [port]

# In second terminal, use decktape to export
decktape reveal http://127.0.0.1:[port] /path/to/my/presentation.pdf
```

NB: you might have to use decktape's `--no-sandbox` flag for the export to work, be sure of what you do !
