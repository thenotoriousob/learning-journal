### Project Enhancements

I updated the journal to make it about my experience of the bootcamp:

- Added a blog for each of the modules on the course
  - I listed the topics covered
  - I also listed clickable thumbnails of the solo projects I have worked on as part of each module that take you to the netlify version of the app
- Menu displayed as a hamburger icon for smaller screens
- If first displayed on the smaller screen only 3 blogs are displayed, if on bigger screen 6 are displayed
- Clicking on the main article take you to the page for that, clicking on each blog takes you to the details for those


### Code  Structure
- I saw that there were a lot of repeating elements and I didn't want to replicate all of the html over 3 pages so I decided to have 1 page and change the content with javascript
- Originally I had did it with Template Literals, but I thought it made the Javascript really messy, so I looked at implementing html <template>s. That has tidied up the Javascript but I'm not sure if it has now made the html a bit messy, haha. And I don't know if I have implemented them as they are intended.
- Tried to make the code as dry as possible in the Javascript by having appendToMainElement and using for the elements that were repeating code
- I have made use of the same code for the list of blogs and hide/view the recent posts label depending on what page you are on, as per the design
- The css possibly got away from me a bit and now its hard to see what I can do to improve it :)
- I picked 500px for the media query just because it seemed right

Thank you for your time.