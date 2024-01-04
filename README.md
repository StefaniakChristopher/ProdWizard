# ProdWizard
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
