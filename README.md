# Fast Food Portal for Fitts' Law Training
### Darryn, David, Guanyan, Jane, Kevin, Namodh - Group 2
[![Generic badge](https://img.shields.io/badge/build-passing-<COLOR>.svg)](https://shields.io/)
## Project Introduction
This project designed a web application to help undergraduate students understand the design considerations for better user interaction based on Fitts' Law. The students are asked to design 3 interfaces for a Fast Food Ordering Portal that enhances usability and efficiency. Firstly, the users have to design the interface for ordering numerous burgers. Next, they design a portal to add sides for specific burgers. The final task creates an interface to select Combos consisting of Burgers, Sides and Drinks. After the design phases, the students will carry out specific tasks in the 3 interfaces, for which the speed and accuracy will be observed for evaluation. This is done by timing each task, and observing the ammount of misclicks for each task, respectively. 
### Research Question
How effectively and efficiently did the realistic fast food application enhance the knowledge transfer(acquisition) of Fitts' Law concepts for university students?
## Deployed Site
https://vela.rs/ 

## Setting Up
### Requirements
[![Generic badge](https://img.shields.io/badge/interact.js-1.10.17-<COLOR>.svg)](https://shields.io/)
```bash
npm install --save interactjs
```
The setting up is quite straightforward as it is using base javascript, CSS and HTML on the frontend. The server connections (for result collection) are setup through the backend, by default. Simply clone/download the repository and open `index.html`. 

## Page Layout
  - Task 1 (with Tutorial) <br />
  
  ![](https://i.postimg.cc/MHm2gSc4/Task-1.png)
  
  - Task 2 (with Tutorial) <br />
  
  ![](https://i.postimg.cc/gJTHdM5K/Final-Task3.png)
  - Task 3 (with Tutorial) <br />
  
  ![](https://i.postimg.cc/sX1kfNn6/Task-3.png)
  
  ## Server Data Storage
  ![](https://i.postimg.cc/Vv4rm5dP/Server-Data.png)
  As seen in the database log above, the Time Taken for each task and the number of misclicks will be calculated for the Users, which is used for evaluation. 
  All Users are able to collect their Results at the end of the Three Tasks using the "Results" Button. 
