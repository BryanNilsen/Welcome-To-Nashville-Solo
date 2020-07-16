# Welcome To Nashville

This Project was built as a test of how my skills progressed from being a student in the full-stack web developer bootcamp to now working as a Junior Instructor at Nashville Software School.

As a student, myself and three other teammates were able to put together the app located [here](https://github.com/BryanNilsen/WELCOME-TO-NASHVILLE). I will admit, I was able to follow the patterns that others had put in place, but it took every bit of those five days to complete just my section (Ticketmaster).

I challenged myself, solo, to complete the same project in the same five-day time frame, while simultaneously coaching students and troubleshooting their own code.

## Technologies Used

Welcome to Nashville was written in Javascript and makes use of the following APIs:
- [Data.Nashville.Gov](https://data.nashville.gov/)
- [Ticketmaster](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/)
- [Zomato Developers](https://developers.zomato.com/)
- [Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial) **



# Instructions for Installing This App

1. Navigate to the directory in which you want this app to live
1. run: `git clone https://github.com/BryanNilsen/WELCOME-TO-NASHVILLE.git`
1. run: `cd WELCOME-TO-NASHVILLE`
1. in `/scripts` you will find the apiKeys_template.js file that looks like this:

```
export const apiKeys = {
  "ticketmasterKey": "YOUR KEY HERE",
  "zomatoKey": "YOUR KEY HERE",
  "googleKey": "YOUR KEY HERE"
}
```
5. You will need to acquire your own keys and replace YOUR KEY HERE with your personal
6. Save and rename this file to apiKeys.js

## Launch Servers and Run the App
This app uses [json-server](https://github.com/typicode/json-server)

If you don't have it installed already, run the following in your terminal: `npm install -g json-server`

navigate to `/api` directory and launch json-server: `json-server -p 3000 -w db.json`

navigate to the `/src` directory, where `index.html` lives, and launch your http server.


## NOTE:
Overall, I'm pleased with what I was able to put together in such a short time while also helping others with their apps. Ideally, this app could benefit from some major refactoring, but as it stands, it was a great exercise to measure how far I've come since I last attempted this project.

_** I was also close to fully integrating the Google Maps API, which wasn't included in the original challenge._