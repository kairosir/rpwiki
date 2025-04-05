"use client"

import { useEffect, useState } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toasts = []

const observers = []

function subscribe(observer) {
  observers.push(observer)
  return () => {
    const index = observers.indexOf(observer)
    if (index > -1) {
      observers.splice(index, 1)
    }
  }
}

function notify(observers) {
  observers.forEach((observer) => observer(toasts))
}

function addToast(toast) {
  const id = genId()

  const newToast = {
    ...toast,
    id,
    open: true,
    onOpenChange: (open) => {
      if (!open) {
        dismissToast(id)
      }
    },
  }

  toasts.push(newToast)
  notify(observers)

  return id
}

function dismissToast(id) {
  const index = toasts.findIndex((toast) => toast.id === id)
  if (index > -1) {
    const toast = toasts[index]
    toasts.splice(index, 1)
    notify(observers)
    return toast
  }
  return null
}

export function useToast() {
  const [state, setState] = useState(toasts)

  useEffect(() => {
    const unsubscribe = subscribe(setState)
    return unsubscribe
  }, [])

  return {
    toasts: state,
    toast: (props) => addToast(props),
    dismiss: (id) => dismissToast(id),
  }
}

export function toast(props) {
  return addToast(props)
}

