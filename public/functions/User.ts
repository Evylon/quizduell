import * as uuid from 'uuid/v4'

class User {
  
  public id: string

  constructor() {
    this.id = this.getId()
  }

  private getId(): string {
    const previousId = window.localStorage.getItem('userId')
    if (previousId !== null && previousId !== undefined) {
      return previousId
    }
    const newId = uuid()
    window.localStorage.setItem('userId', newId)
    return newId
  }
}

export { User }
