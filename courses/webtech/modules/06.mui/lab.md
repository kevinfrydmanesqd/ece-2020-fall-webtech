
# Lab

We have seen Material Desgin and Material-UI to build rich UI (User Interface) with React. For next week, we will practice with the integration of components into our chat application.

## Learn with Video (easy)

I propose to start by watching a few videos. The playlist [Google Design Tutorials](https://material.io/blog/google-design-tutorial-video) (available inside the first video) proposes short videos of 3 to 5 minutes each. Pickup the one you wish. Then, watch the [introduction to Material-UI](https://www.youtube.com/watch?v=pHclLuRolzE&list=PLQg6GaokU5CwiVmsZ0d_9Zsg_DnIP_xwr) which is 16 minutes long.

## React form components (medium)

The new version of the chat application comes with a login screen. Customize it to use nice form inputs and a buttom from the Material-UI components list.

Note, to switch from the login to the channel view, simply click on the login button.

## React layout/navigation components (hard)

Once the user has logged in, it would be nice to adjust the UI according to the screen size. While it makes sens to always display the list of channels on the right side on a desktop screen, it is unworkable on a small screen size such as the one of a phone. For small screen, the channel list shall be hidden until a menu icon is clicked. It must then appear in the form of a drawer. The Material-UI library provides a drawer component which comes in multiple flavors. The responsible drawer seems to correpond to our need, integrate it between the Channel, Channels and Main components of our application.
