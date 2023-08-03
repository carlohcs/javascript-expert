export class Marketing {
  // update's method should handle errors/exceptions
  // shouldn't have await on notify
  // notify should only notify for observers
  update({ id, userName }) {
    console.log(`[${id}]: [marketing] will send a welcome e-mail to [${userName}]`)
  }
}