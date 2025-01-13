function addZero(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

export function getCurrentDateTimeString() {
  const d = new Date()
  const dateString =
    d.getFullYear() +
    '-' +
    d.getMonth() +
    1 +
    '-' +
    addZero(d.getDate()) +
    'T' +
    addZero(d.getHours()) +
    ':' +
    addZero(d.getMinutes()) +
    ':' +
    addZero(d.getSeconds())

  return dateString
}

export function getFormattedDate(dateString, withTime = false) {
  if (dateString === null) {
    return 'Nu'
  }

  const date = new Date(dateString)
  const newDate = date.toLocaleDateString('nl-NL')
  if (!withTime) {
    return newDate
  }

  const h = addZero(date.getHours())
  const m = addZero(date.getMinutes())
  return newDate + ' ' + h + ':' + m
}

export function required(v) {
  return !!v || 'Veld is verplicht'
}

export function getSensorTypeInfo(type) {
  switch (type) {
    case 'temperatuur':
      return {
        icon: 'device_thermostat',
        displayName: 'Temperatuur',
      }
    case 'zuurstof':
      return {
        icon: 'bubble_chart',
        displayName: 'Zuurstof',
      }
    case 'troebelheid':
      return {
        icon: 'opacity',
        displayName: 'Troebelheid',
      }
    case 'elektrische_geleiding':
      return {
        icon: 'electric_bolt',
        displayName: 'Elektrische geleiding',
      }
    case 'pH':
      return {
        icon: 'science',
        displayName: 'pH',
      }
    default:
      return {
        icon: 'device_thermostat',
        displayName: 'Temperatuur',
      }
  }
}
