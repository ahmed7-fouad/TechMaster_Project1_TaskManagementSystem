
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"

function useLocalStorge<T>(
	key: string,
	initialValue: T,
): [T, Dispatch<SetStateAction<T>>, () => void] {
	const [value, setValue] = useState<T>(() => {
		const storedValue = localStorage.getItem(key)

		if (storedValue === null) {
			return initialValue
		}

		try {
			return JSON.parse(storedValue) as T
		} catch {
			return initialValue
		}
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	const removeValue = () => {
		localStorage.removeItem(key)
		setValue(initialValue)
	}

	return [value, setValue, removeValue]
}

export default useLocalStorge