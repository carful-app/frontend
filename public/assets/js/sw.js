const defaultNotificationOptions = {
  icon: '/assets/icons/logo.svg',
  badge: '/assets/icons/logo.svg',
}

self.addEventListener('push', function (e) {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    //notifications aren't supported or permission not granted!
    return
  }

  if (e.data) {
    const msg = e.data.json()

    e.waitUntil(
      self.registration.showNotification(msg.title, {
        ...msg,
        ...defaultNotificationOptions,
      })
    )
  }
})
