https://ws2026-s17-r1-199.netlify.app
199
Vincze Roland


# Notes about phase-2
I'd like to explain why I used form `<form>` for storing and managing all the data, and not in a useState() everywhere.

As I noticed every time I modified the Floorplan, every time I begin using the form validation/checkboxes, the application did a rerender. Rerenders in React are between the main problems in larger applications, and knowing this (even if this project is not that large in size) I decided to stick with form, and use the least amount of storage (as you can see in sessionStorage), memory, and CPU consumed by the application. This code could've been done 'better', but with a larger application, this would cost a lot of resources, which is not too optimal. This way I wanted to show you my knowledge which is getting slowly deeper and deeper about React and its' philosophy.

Tools I would've used for the application if rerenders wouldn't exist (or if we'd assume everyone has a supercomputer) would've been Context mostly for the consistency between components.