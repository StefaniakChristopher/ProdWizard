# ProdWizard
-------------------------------------------

This is a web application designed to provide employers in the manufacturing industry with a means to record their employees' efficiency concerning common quantitative tasks one may see in a manufacturing environment, such as sorting and stamping automotive parts


![prodwizardScreenshot](https://github.com/StefaniakChristopher/EmployeeManagementSystem/assets/123501656/f984de41-7d29-43b9-93a7-af9b32804e0c)


-------------------------------------------
MAIN FUNCTIONALITY

Consumers of the application can log in through a pre-defined admin account. This account has the following unique abilities:

Admin:
- Create Users
- Create Task Categories

The Admin user can create other employee users that can create and complete their own tasks. 

The Admin user can also create task categories, which will populate the "Task Name" dropdown option with choices when creating tasks

Employee Users can also log in and they have the following abilities:

Employee User (Non-admin user):
- Create Tasks
- View everyone's current tasks --- This is the default view for the tasks. It displays all the current tasks among all users
- View their own current tasks --- Views only the tasks of the user currently logged in
- View their own completed tasks --- View only the completed tasks of the user currently logged in 
- View the leaderboard --- Compares employees based on speed for different tasks. For example, there could a leaderboard for sorting automotive part A and a leaderboard for sorting automotive part B and employees will be ranked based on their averages for that task

When a user creates a task, they can assign a pre-determined name (by the admin user) and description. These tasks are meant to reflect the tasks they are working on in their facility (ex. sorting parts). Creating the task will create a task "card" in the main content section of the page. 

These task cards have the following information:
- Task Name
- Avg Rate --- how fast they can sort the part, make the part, etc (NOTE: this will be N/A if it is their first time completing the task)
- Team
- Task Owner  --- is always set to the person who creates the task

Once the employee completes the task in the real world, they are to complete the task on ProdWizard and answer the volume of parts input prompt.
This will send the volume number to the backend and the backend will also record the time it took for the operation to complete.

The backend tracks time for a particular task using two points in time to create an interval:
- The time the task was created
- The time the task was completed

This interval is then the time it took to complete the task. This time is stored and saved in an ArrayList to later calculate the employee's average time for that particular task. The employee's average time is also put against other employees' average time to create the leaderboard.

-------------------------------------------
TECH STACK

The tech stack used to create this is as follows:

- JavaScript/HTML/CSS for Frontend
- Spring Framework Java with REST API endpoints for Backend
- Kubernetes, Docker, and Helm for deployment

-------------------------------------------
TO RUN APPLICATION:

    Ensure the installation of the following:
      Minikube
      Docker
      Helm
      WINDOWS

  1. Start docker daemon

  2. Open powershell and enter "minikube start"

  3. Enter "minikube addons enable ingress"

  4. Navigate to the "Helm Chart" folder in the project folder and enter "helm install prodwizard ."

  4. Enter "kubectl get pod --watch" (watch them grow up)

  5. Open another powershell terminal and enter "minikube tunnel"

  6. Ensure that "127.0.0.1 prodwizard.com" is in the hosts file by entering "notepad C:\Windows\System32\drivers\etc\hosts" in an administrator command line. This should be on its own seperate line standalone without a "#" in front of them (windows is the reason why the IP is 127.0.0.1)

  7. Navigate to "prodwizard.com/LoginPage/index.html" on the web browser and have fun
