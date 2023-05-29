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

    if (msg.data.shouldClose) {
      self.registration.getNotifications({ tag: msg.tag }).then((notifications) => {
        notifications.forEach((notification) => notification.close())
      })
    }
  }
})

self.addEventListener('notificationclick', function (e) {
  const notification = e.notification
  const action = e.action

  switch (action) {
    case 'close':
      notification.close()
      break
    case 'park-car-add-time':
      e.waitUntil(
        self.clients.matchAll({ type: 'window' }).then((clientList) => {
          for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i]

            if (isSameOrigin(client.url) && 'focus' in client) {
              client.postMessage({
                type: 'park-car-add-time',
              })
              client.focus()

              return
            }
          }
        })
      )
      break
  }
})

function isSameOrigin(urlString) {
  const urlOrigin = new URL(urlString).origin
  return urlOrigin === self.location.origin
}
