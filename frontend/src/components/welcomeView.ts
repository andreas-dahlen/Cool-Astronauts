


export function welcomeView() {
  const welcomeContainer = document.querySelector('#content')

  if (!welcomeContainer) {
    throw new Error("missing content container")
  }

  const welcome = document.createElement('h1')
  welcome.textContent = "welcome!"
  welcomeContainer.append(welcome)

}