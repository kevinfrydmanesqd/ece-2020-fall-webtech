
# Lab

I have provided a basic React application such as the one we did toguether
during our last session. We will make a few improvements to it.

## 1 - Architecture - Level easy

It is now the right time to re-organize/refactor our code. Split this monolithic
react Component into multiple section. In the end, we should end up with the
following components: 'Header', 'Footer', 'Main', 'Channels', 'Channel',
'Messages', 'MessageSend':

- 'App.js' file uses 'Header.js', 'Main.js', 'Footer.js'
- 'Main.js' file uses 'Channels.js', 'Channel.js'
- 'Channels.js' prints the list of channels
- 'Channel.js' prints the messages, uses 'Messages.js' and 'MessageSend.js'
- 'Messages.js' prints the list of messages inside the current channel
- 'MessageForm.js' send a new message

```

+--------------------------------------------+
|                  Header                    |
+--------------------------------------------+
|   Channels    |          Channel           |
|               | +------------------------+ |
|               | |        Messages        | |
|               | +------------------------+ |
|               | |      MessageSend       | |
|               | +------------------------+ |
+--------------------------------------------+
|                  Footer                    |
+--------------------------------------------+

```

## 2 - Styles - Level easy

Give it some styles, use CSS to make it looks good. Possible source of
improvements include changing the colors, replacing the HTML "send" button with
an icon, working on the header, providing day/night themes ... be creative

## 3 - Use an external library - Level medium

Format the date in a human readable format. While the date is generated on the
server side to ensure its relevance and prevent from forgery, it must be
displayed according to the user browser local. The
[Moment.js](https://momentjs.com/) library has been the library of choice for
many years to accomplish date formatting. Read what is displayed on the top
right corner of their homepage, it is now depreciated. Read the reasons and act
accordingly.

## 4 - Support message contents in Markdown - Level hard

Markdown is the most popular syntax to format text into HTML. It is used by the
majority of the project Readme files, to write documentation and to generate
websites.

I recommand you to use the [unified](https://unifiedjs.com/) which is very
powerful and comes with a lot of plugins. You can read the Markdown to HTML
guide in the learn section and enrich it with your selection of relevant
plugins.

Consider adding syntax highlight support with a library like
[Prism](https://prismjs.com/).
